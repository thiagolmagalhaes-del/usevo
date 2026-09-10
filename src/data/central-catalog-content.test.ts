import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const pages = {
  home: new URL("../pages/index.astro", import.meta.url),
  englishTools: new URL("../pages/en/tools/index.astro", import.meta.url),
  spanishTools: new URL("../pages/es/herramientas/index.astro", import.meta.url),
  englishCategories: new URL("../pages/en/categories/index.astro", import.meta.url),
  spanishCategories: new URL("../pages/es/categorias/index.astro", import.meta.url),
};

async function source(page: URL) {
  return readFile(page, "utf8");
}

describe("central catalog editorial context", () => {
  it("keeps concise product context on the homepage without replacing discovery", async () => {
    const page = await source(pages.home);

    expect(page).toContain('class="hero-context"');
    expect(page).toContain("ToolGrid");
    expect(page).toContain('id="searchForm"');
  });

  it("adds localized context to the English and Spanish tool listings", async () => {
    const [english, spanish] = await Promise.all([
      source(pages.englishTools),
      source(pages.spanishTools),
    ]);

    for (const page of [english, spanish]) {
      expect(page).toContain('class="page-intro"');
      expect(page).toContain("ToolGrid");
    }
  });

  it("adds localized descriptions to category cards", async () => {
    const [english, spanish] = await Promise.all([
      source(pages.englishCategories),
      source(pages.spanishCategories),
    ]);

    for (const page of [english, spanish]) {
      expect(page).toContain("categoryDescriptions");
      expect(page).toContain('class="category-description"');
      expect(page).toContain("getCategoryTranslation");
    }
  });
});
