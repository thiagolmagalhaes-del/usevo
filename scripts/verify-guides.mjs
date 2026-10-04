import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Inspect the deploy artifact, including the shared footer and language switcher.
const families = [
  ["/guides", "/pt-br/guias", "/es/guias"],
  ["/guides/prepare-images-for-web", "/pt-br/guias/preparar-imagens-para-web", "/es/guias/preparar-imagenes-para-web"],
  ["/guides/work-with-pdfs-online", "/pt-br/guias/trabalhar-com-pdfs-online", "/es/guias/trabajar-con-pdf-online"],
  ["/guides/use-developer-data-tools-safely", "/pt-br/guias/usando-ferramentas-de-dados-com-seguranca", "/es/guias/utilizar-herramientas-de-datos-con-seguridad"],
];
const locales = ["en", "pt-BR", "es"];
const origin = "https://usevo.tools";
const readPage = (route) => readFileSync(resolve("dist", `${route.slice(1) || "index"}.html`), "utf8");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
const decode = (value) => value.replace(/&amp;/g, "&");
const sitemap = readFileSync(resolve("dist", "sitemap-0.xml"), "utf8");
let linkCount = 0;

for (const [familyIndex, family] of families.entries()) {
  for (const [localeIndex, route] of family.entries()) {
    const page = readPage(route);
    assert(page.includes(`<html lang="${locales[localeIndex]}"`), `${route}: language`);
    assert.equal([...page.matchAll(/<h1\b/g)].length, 1, `${route}: one H1`);
    const tags = [...page.matchAll(/<link\b[^>]*>/g)].map((match) => attributes(match[0]));
    assert.equal(tags.find((tag) => tag.rel === "canonical")?.href, origin + route, `${route}: canonical`);
    const alternates = tags.filter((tag) => tag.rel === "alternate" && tag.hreflang);
    assert.equal(alternates.length, 4, `${route}: four alternates`);
    locales.forEach((locale, index) => assert.equal(alternates.find((tag) => tag.hreflang === locale)?.href, origin + family[index]));
    assert.equal(alternates.find((tag) => tag.hreflang === "x-default")?.href, origin + family[0]);
    const schemas = [...page.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
    const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
    assert(breadcrumb, `${route}: breadcrumb schema`);
    assert.equal(breadcrumb.itemListElement.length, familyIndex ? 3 : 2);
    assert.deepEqual(breadcrumb.itemListElement.map((item) => item.position), familyIndex ? [1, 2, 3] : [1, 2]);
    const article = schemas.find((schema) => schema["@type"] === "Article");
    if (familyIndex) {
      assert(article, `${route}: Article schema`);
      assert.equal(article.mainEntityOfPage, origin + route);
      assert.equal(article.inLanguage, locales[localeIndex]);
      assert(page.includes(`>${article.headline}</h1>`), `${route}: visible Article headline`);
      for (const section of ["workflow", "examples", "limitations", "related-tools", "faq", "related-guides"]) assert(page.includes(`id="${section}"`), `${route}: ${section}`);
    } else assert(!article, `${route}: hub is not an Article`);

    const sitemapEntry = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find((match) => match[1].includes(`<loc>${origin + route}</loc>`))?.[1];
    assert(sitemapEntry, `${route}: sitemap entry`);
    locales.forEach((locale, index) => assert(sitemapEntry.includes(`hreflang="${locale}" href="${origin + family[index]}"`), `${route}: sitemap alternate ${locale}`));

    const ids = new Set([...page.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
    for (const match of page.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const href = decode(match[1]);
      const url = new URL(href, origin + route);
      if (url.origin !== origin) continue;
      const path = url.pathname.replace(/\/$/, "") || "/";
      assert(existsSync(resolve("dist", `${path.slice(1) || "index"}.html`)), `${route}: missing internal page ${href}`);
      if (url.hash) {
        const target = path === route ? ids : new Set([...readPage(path).matchAll(/\bid="([^"]+)"/g)].map((item) => item[1]));
        assert(target.has(decodeURIComponent(url.hash.slice(1))), `${route}: missing anchor ${href}`);
      }
      linkCount++;
    }
    if (familyIndex) {
      for (const other of families.slice(1)) if (other !== family) assert(page.includes(`href="${other[localeIndex]}"`), `${route}: related guide`);
      const tools = [...page.matchAll(/href="(\/(?:en\/tools|ferramentas|es\/herramientas)\/[^"#?]+)"/g)];
      assert.equal(tools.length, [0, 4, 5, 6][familyIndex], `${route}: expected tool links`);
    } else families.slice(1).forEach((guides) => assert(page.includes(`href="${guides[localeIndex]}"`), `${route}: guide card`));
    console.log(`PASS ${route}: content, canonical, hreflang, schemas, sitemap, links`);
  }
}

for (const [index, paths] of [[0, ["/", "/en", "/en/tools"]], [1, ["/pt-br", "/ferramentas"]], [2, ["/es", "/es/herramientas"]]]) {
  for (const path of paths) {
    const page = readPage(path);
    assert(page.includes(`href="${families[0][index]}"`), `${path}: hub discovery link`);
    assert(page.includes('class="guide-discovery"'), `${path}: contextual discovery block`);
  }
}
console.log(`Verified 12 guide pages and ${linkCount} internal links, plus home/catalog discovery.`);
