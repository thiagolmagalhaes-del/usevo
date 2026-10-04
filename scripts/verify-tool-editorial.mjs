import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createServer } from "vite";

const strings = (value) => typeof value === "string" ? [value]
  : Array.isArray(value) ? value.flatMap(strings)
  : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
const decode = (text) => text.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, (entity) => ({
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#x27;": "'",
})[entity]);
const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: "custom" });
try {
  const { ferramentas } = await server.ssrLoadModule("/src/data/ferramentas.ts");
  const { getToolEditorialContent, getEditorialRelatedTools } = await server.ssrLoadModule("/src/data/tool-editorial-content.ts");
  const { getToolLocaleRoute, getSiteAlternates, toSiteUrl } = await server.ssrLoadModule("/src/data/locale-routes.ts");
  let count = 0;
  for (const id of ["calculadora", "gerador-de-letras-diferentes", "roleta-de-nomes", "gerador-de-codigo-de-barras"]) {
    const tool = ferramentas.find((tool) => tool.id === id);
    assert(tool, id);
    for (const locale of ["en", "pt-BR", "es"]) {
      const route = getToolLocaleRoute(tool, locale);
      const page = readFileSync(resolve("dist", `${route.slice(1)}.html`), "utf8");
      assert(page.includes(`<html lang="${locale}"`), `${route}: language`);
      const editorial = page.match(/<section\b[^>]*class="tool-editorial"[^>]*>([\s\S]*?)<\/main>/)?.[1];
      assert(editorial, `${route}: editorial block`);
      const text = decode(editorial.replace(/<[^>]*>/g, ""));
      const content = getToolEditorialContent(id, locale);
      // Check every visible field, not just the presence of section headings.
      for (const value of strings({ ...content, relatedTools: { title: content.relatedTools.title, items: content.relatedTools.items.map(({ label, description }) => ({ label, description })) } })) {
        assert(text.includes(value), `${route}: missing editorial text ${value.slice(0, 65)}`);
      }
      for (const other of ["en", "pt-BR", "es"].filter((other) => other !== locale)) {
        const foreign = getToolEditorialContent(id, other);
        for (const sentence of [...foreign.howTo.steps, ...foreign.notes.items, ...foreign.faq.items.map((item) => item.answer)]) {
          assert(!text.includes(sentence), `${route}: foreign-language prose`);
        }
      }
      for (const link of getEditorialRelatedTools(content, locale)) {
        assert(editorial.includes(`href="${link.href}"`), `${route}: related link`);
        assert(existsSync(resolve("dist", `${link.href.slice(1)}.html`)), `${route}: missing related page`);
      }
      assert(page.includes(`rel="canonical" href="${toSiteUrl(route)}"`), `${route}: canonical`);
      for (const [lang, href] of Object.entries(getSiteAlternates(route))) {
        assert(page.includes(`hreflang="${lang}" href="${href}"`), `${route}: alternate`);
      }
      console.log(`PASS ${route}: complete localized editorial, examples, links, metadata`);
      count++;
    }
  }
  assert.equal(count, 12);
  console.log("Verified all 12 deepened tool pages without foreign-language editorial prose.");
} finally {
  await server.close();
}
