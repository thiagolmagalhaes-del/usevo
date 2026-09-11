import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { ferramentas } from "../data/ferramentas";
import { getCategoryTranslation } from "../data/i18n";
import { matchesCatalogItem } from "./catalog-filter";

const wordCounter = {
  text: "Word Counter Count words, characters, sentences, paragraphs and reading time. Text",
  category: "text",
};

const jsonFormatter = {
  text: "JSON Formatter Format, validate and organize JSON data. Development",
  category: "development",
};

describe("matchesCatalogItem", () => {
  it("finds a tool by its name or description", () => {
    expect(matchesCatalogItem(wordCounter, "word", "all")).toBe(true);
    expect(matchesCatalogItem(jsonFormatter, "validate", "all")).toBe(true);
  });

  it("filters tools by category and combines the selected category with search", () => {
    expect(matchesCatalogItem(wordCounter, "", "text")).toBe(true);
    expect(matchesCatalogItem(wordCounter, "", "development")).toBe(false);
    expect(matchesCatalogItem(jsonFormatter, "json", "development")).toBe(true);
    expect(matchesCatalogItem(jsonFormatter, "json", "text")).toBe(false);
  });

  it("matches every category represented in the English catalog", () => {
    const items = ferramentas.map((ferramenta) => ({
      text: [
        ferramenta.translations.en?.title ?? ferramenta.nome,
        ferramenta.translations.en?.description ?? ferramenta.descricao,
        getCategoryTranslation(ferramenta.categoryKey, "en"),
      ].join(" "),
      category: getCategoryTranslation(ferramenta.categoryKey, "en"),
    }));
    const categories = new Set(items.map((item) => item.category));

    for (const category of categories) {
      expect(items.some((item) => matchesCatalogItem(item, "", category))).toBe(true);
    }
  });

  it("keeps hidden cards out of the rendered catalog and supports Enter results navigation", () => {
    const page = readFileSync(new URL("../pages/en/tools/index.astro", import.meta.url), "utf8");

    expect(page).toContain('.tool-card[hidden]');
    expect(page).toContain('search?.addEventListener("keydown"');
    expect(page).toContain('firstVisibleCard?.focus({ preventScroll: true })');
  });
});
