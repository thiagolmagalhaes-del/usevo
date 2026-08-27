import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readTemplate = (relativePath: string) =>
  readFileSync(new URL(relativePath, import.meta.url), "utf8");

const categoryTemplates = [
  "../pages/categorias.astro",
  "../pages/en/categories/index.astro",
  "../pages/es/categorias/index.astro",
];

describe("category page templates", () => {
  it("keeps the Portuguese category page fully localized", () => {
    const page = readTemplate("../pages/categorias.astro");

    expect(page).toContain('locale="pt-BR"');
    expect(page).toContain('title="Categorias | USEVO TOOLS"');
    expect(page).toContain('getCategoryTranslation(categoria, "pt-BR")');
    expect(page).toContain('getFerramentaTranslation(ferramenta, "pt-BR").title');
    expect(page).toContain("'ferramenta' : 'ferramentas'");
    expect(page).not.toContain("Explore our tools organized by topic");
  });

  it.each(categoryTemplates)("uses semantic H1, H2, and H3 hierarchy in %s", (template) => {
    const page = readTemplate(template);

    expect((page.match(/<h1\b/g) ?? [])).toHaveLength(1);
    expect((page.match(/<h2\b/g) ?? [])).toHaveLength(1);
    expect(page).toContain("<h3");
    expect(page).toContain('<article class="category-card">');
  });

  it.each(categoryTemplates)("defines a responsive 3/2/1 column grid in %s", (template) => {
    const page = readTemplate(template);

    expect(page).toContain("grid-template-columns: repeat(3, minmax(0, 1fr))");
    expect(page).toContain("grid-template-columns: repeat(2, minmax(0, 1fr))");
    expect(page).toContain("grid-template-columns: 1fr");
  });

  it("keeps CTA contrast and focus treatment in the shared header", () => {
    const header = readTemplate("../components/SiteHeader.astro");

    expect(header).toContain("nav .nav-button {");
    expect(header).toContain("nav .nav-button:hover");
    expect(header).toContain("nav .nav-button:focus-visible");
    expect(header).toContain("color: #ffffff");
  });
});
