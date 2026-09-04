import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getFerramentaByPath, getFerramentaTranslation } from "../data/ferramentas";
import { getSiteAlternates } from "../data/locale-routes";
import { getEditorialRelatedTools, getToolEditorialContent } from "../data/tool-editorial-content";

const page = readFileSync(new URL("../pages/ferramentas/conversor-maiusculas-minusculas.astro", import.meta.url), "utf8");

describe("case converter DOM and localized SEO contract", () => {
  it("keeps the original and result separate with accessible controls", () => {
    expect(page).toContain('label for="caseOriginal"');
    expect(page).toContain('label for="caseResult"');
    expect(page).toContain('id="caseResult" readonly');
    expect(page).toContain('aria-pressed="false"');
    expect(page).toContain('id="caseCopy" class="primary" type="button" disabled');
    expect(page).toContain('id="caseStatus" class="sr-only" aria-live="polite"');
    expect(page).toContain('original.addEventListener("input"');
    expect(page).toContain('copyButton.disabled = !result.value');
    expect(page).toContain('navigator.clipboard?.writeText');
    expect(page).toContain('document.execCommand("copy")');
    expect(page).toContain('original.focus()');
  });

  it("uses the shared Word Counter metrics and safe mobile layout", () => {
    expect(page).toContain('import { getWordCounterMetrics } from "../../lib/word-counter"');
    expect(page).toContain('metrics.charactersWithSpaces');
    expect(page).toContain('grid-template-columns: repeat(2, minmax(0, 1fr))');
    expect(page).toContain('@media (max-width: 360px)');
    expect(page).toContain('grid-template-columns: 1fr;');
    expect(page).toContain('min-height: 46px');
    expect(page).toContain('overflow-wrap: anywhere');
  });

  it("registers localized routes, metadata, alternates, and related tools", () => {
    const tool = getFerramentaByPath("/ferramentas/conversor-maiusculas-minusculas")!;
    expect(tool.categoryKey).toBe("texto");
    expect(getFerramentaTranslation(tool, "pt-BR").seoTitle).toBe("Conversor de Maiúsculas e Minúsculas Online | USEVO");
    expect(getFerramentaTranslation(tool, "en").seoTitle).toBe("Free Case Converter – Uppercase & Lowercase | USEVO");
    expect(getFerramentaTranslation(tool, "es").seoTitle).toBe("Convertidor de Mayúsculas y Minúsculas Online | USEVO");

    for (const [locale, route] of [["pt-BR", "/ferramentas/conversor-maiusculas-minusculas"], ["en", "/en/tools/case-converter"], ["es", "/es/herramientas/convertidor-mayusculas-minusculas"]] as const) {
      expect(getSiteAlternates(route)).toMatchObject({
        "pt-BR": expect.stringContaining("conversor-maiusculas-minusculas"),
        en: expect.stringContaining("case-converter"),
        es: expect.stringContaining("convertidor-mayusculas-minusculas"),
      });
      expect(getEditorialRelatedTools(getToolEditorialContent(tool.id, locale), locale).map((item) => item.toolId))
        .toEqual(["contador-de-palavras", "comparador-de-texto"]);
    }
  });
});
