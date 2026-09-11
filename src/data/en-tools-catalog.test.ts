import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const page = new URL("../pages/en/tools/index.astro", import.meta.url);

describe("English tools catalog", () => {
  it("provides compact, client-side discovery controls without changing tool routes", async () => {
    const source = await readFile(page, "utf8");

    expect(source).toContain(
      "Browse free tools for files, images, text, calculations, and more.",
    );
    expect(source).toContain('id="toolSearch"');
    expect(source).toContain('aria-label="Filter tools by category"');
    expect(source).toContain("card.textContent");
    expect(source).toContain("card.hidden = !visible");
    expect(source).toContain('<ToolGrid items={ferramentas} locale="en" />');
  });

  it("keeps catalog cards content-sized and uses two columns at 390px", async () => {
    const source = await readFile(page, "utf8");

    expect(source).toContain("min-height: auto");
    expect(source).toContain("@media (min-width: 380px) and (max-width: 650px)");
    expect(source).toContain("grid-template-columns: repeat(2, minmax(0, 1fr))");
    expect(source).toContain(":focus-visible");
  });
});
