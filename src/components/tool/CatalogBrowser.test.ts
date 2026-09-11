import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("localized catalog pages", () => {
  it("renders every locale through the shared interactive catalog browser", () => {
    expect(source("../../pages/ferramentas.astro")).toContain('<CatalogBrowser locale="pt-BR"');
    expect(source("../../pages/en/tools/index.astro")).toContain('<CatalogBrowser locale="en"');
    expect(source("../../pages/es/herramientas/index.astro")).toContain('<CatalogBrowser locale="es"');
  });

  it("keeps search, category filters, counts, and Enter behavior in the shared browser", () => {
    const browser = source("./CatalogBrowser.astro");

    expect(browser).toContain('data-category-filter');
    expect(browser).toContain('id="toolResults"');
    expect(browser).toContain('search?.addEventListener("keydown"');
  });
});
