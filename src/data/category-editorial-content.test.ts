import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CATEGORY_KEYS, categoryEditorialContent } from "./category-editorial-content";
import { ferramentas } from "./ferramentas";
import { SUPPORTED_LOCALES } from "./locales";

describe("localized category editorial guides", () => {
  it("covers exactly the eight published categories", () => {
    const published = [...new Set(ferramentas.map((tool) => tool.categoryKey))].sort();
    expect(published).toHaveLength(8);
    expect([...CATEGORY_KEYS].sort()).toEqual(published);
    expect(Object.keys(categoryEditorialContent).sort()).toEqual(published);
  });

  for (const category of CATEGORY_KEYS) {
    it(`${category} has complete, distinct guides in all three languages`, () => {
      const translations = categoryEditorialContent[category];
      expect(Object.keys(translations).sort()).toEqual([...SUPPORTED_LOCALES].sort());
      for (const locale of SUPPORTED_LOCALES) {
        const guide = translations[locale];
        expect(guide.title.trim().length).toBeGreaterThan(20);
        expect(guide.introduction.trim().length).toBeGreaterThan(250);
        expect(guide.tips).toHaveLength(3);
        expect(new Set(guide.tips).size).toBe(3);
        for (const tip of guide.tips) expect(tip.trim().length).toBeGreaterThan(100);
      }
      expect(new Set(SUPPORTED_LOCALES.map((locale) => translations[locale].introduction)).size).toBe(3);
    });
  }

  it.each(SUPPORTED_LOCALES)("does not reuse introductions or guidance between categories in %s", (locale) => {
    expect(new Set(CATEGORY_KEYS.map((key) => categoryEditorialContent[key][locale].introduction)).size).toBe(8);
    const tips = CATEGORY_KEYS.flatMap((key) => categoryEditorialContent[key][locale].tips);
    expect(new Set(tips).size).toBe(24);
  });

  it.each([
    ["../pages/categorias.astro", "pt-BR"],
    ["../pages/en/categories/index.astro", "en"],
    ["../pages/es/categorias/index.astro", "es"],
  ])("renders the shared guides with the correct locale in %s", (path, locale) => {
    const page = readFileSync(new URL(path, import.meta.url), "utf8");
    expect(page).toContain(`CategoryEditorialGuides locale="${locale}"`);
  });
});
