import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const header = new URL("./SiteHeader.astro", import.meta.url);

describe("SiteHeader mobile navigation", () => {
  it("keeps primary navigation links visible and touch-friendly on small screens", async () => {
    const source = await readFile(header, "utf8");

    expect(source).toContain("navItems.map");
    expect(source).not.toContain("nav a:not(.nav-button):not(.language-option)");
    expect(source).toContain("nav > a:not(.nav-button):not(.language-option)");
    expect(source).toContain("flex-wrap: wrap");
    expect(source).toContain("min-height: 44px");
    expect(source).toContain("nav a:focus-visible");
  });
});
