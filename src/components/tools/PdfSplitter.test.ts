import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync(new URL("./PdfSplitter.astro", import.meta.url), "utf8");

describe("PdfSplitter interface", () => {
  it("keeps the PDF input accessible and exposes all three modes", () => {
    expect(component).toContain('accept="application/pdf"');
    expect(component).toContain('for="pdfSplitInput"');
    expect(component).toContain('value="extract"');
    expect(component).toContain('value="ranges"');
    expect(component).toContain('value="all"');
  });

  it("cleans up object URLs and keeps localized error handling", () => {
    expect(component).toContain("URL.revokeObjectURL(resultUrl)");
    expect(component).toContain('window.addEventListener("pagehide", clearResult)');
    expect(component).toContain("protectedPdf");
    expect(component).toContain("resultTooLarge");
  });
});
