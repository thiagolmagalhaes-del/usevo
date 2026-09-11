import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("SiteHeader mobile navigation", () => {
  it("places the tools link on its own row before categories and the explorer", () => {
    const header = readFileSync(new URL("./SiteHeader.astro", import.meta.url), "utf8");

    expect(header).toContain("nav > a:first-child:not(.nav-button):not(.language-option)");
    expect(header).toContain("flex: 0 0 100%");
  });

  it("uses a bounded two-column mobile grid without allowing header controls to overflow", () => {
    const header = readFileSync(new URL("./SiteHeader.astro", import.meta.url), "utf8");

    expect(header).toContain("@media (max-width: 480px)");
    expect(header).toContain("grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)");
    expect(header).toContain("box-sizing: border-box");
    expect(header).toContain("width: 100%");
  });
});
