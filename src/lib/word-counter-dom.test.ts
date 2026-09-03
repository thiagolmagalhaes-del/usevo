import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getFerramentaByPath, getFerramentaTranslation } from "../data/ferramentas";
import { getSiteAlternates } from "../data/locale-routes";
import { getEditorialRelatedTools, getToolEditorialContent } from "../data/tool-editorial-content";

const page = readFileSync(new URL("../pages/ferramentas/contador-de-palavras.astro", import.meta.url), "utf8");

describe("word counter DOM and localized SEO contract", () => {
  it("renders accessible local controls and all seven metrics", () => {
    expect(page).toContain('label class="sr-only" for="texto"');
    expect(page).toContain('id="counterStatus" class="sr-only" aria-live="polite"');
    expect(page).toContain('texto.addEventListener("input", () => atualizarContagem())');
    expect(page).toContain('contar.addEventListener("click", () => atualizarContagem(true))');
    expect(page).toContain('texto.focus()');
    expect(page).toContain('grid-template-columns: repeat(2, 1fr)');
    expect(page).toContain('min-width: 0');
    expect(page).toContain('overflow-wrap: anywhere');
    for (const id of ["palavras", "caracteres", "caracteresSemEspacos", "frases", "linhas", "paragrafos", "tempoLeitura"]) expect(page).toContain(`id="${id}"`);
  });

  it("keeps localized page metadata, alternates, and related tools", () => {
    const tool = getFerramentaByPath("/ferramentas/contador-de-palavras")!;
    expect(getFerramentaTranslation(tool, "en")).toMatchObject({ seoTitle: "Free Online Word Counter – Words & Characters | USEVO" });
    expect(getFerramentaTranslation(tool, "pt-BR").seoDescription).toContain("sem espaços");
    expect(getFerramentaTranslation(tool, "es").seoDescription).toContain("sin espacios");

    for (const [locale, route] of [["en", "/en/tools/word-counter"], ["pt-BR", "/ferramentas/contador-de-palavras"], ["es", "/es/herramientas/contador-de-palabras"]] as const) {
      expect(getSiteAlternates(route)).toMatchObject({ en: expect.stringContaining("word-counter"), "pt-BR": expect.stringContaining("contador-de-palavras"), es: expect.stringContaining("contador-de-palabras") });
      expect(getEditorialRelatedTools(getToolEditorialContent(tool.id, locale), locale)).toHaveLength(2);
    }
  });
});
