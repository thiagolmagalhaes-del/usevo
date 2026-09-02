import { describe, expect, it } from "vitest";
import { assertPdfJpgLimits, getBoundedViewport, getPdfJpgFileName, getPdfJpgPages, PDF_JPG_QUALITY, PDF_TO_JPG_LIMITS } from "./pdf-to-jpg";

describe("PDF to JPG helpers", () => {
  it("selects all pages or sorted unique page ranges", () => {
    expect(getPdfJpgPages("", 3, true)).toEqual([1, 2, 3]);
    expect(getPdfJpgPages("3,1-2,2", 3, false)).toEqual([1, 2, 3]);
  });
  it("keeps the approved quality defaults and bounds pixels without distortion", () => {
    expect(PDF_JPG_QUALITY.medium).toEqual({ scale: 1.5, jpegQuality: 0.82 });
    expect(PDF_JPG_QUALITY.low.jpegQuality).toBe(0.72); expect(PDF_JPG_QUALITY.high.scale).toBe(2);
    const viewport=getBoundedViewport(5000,4000,2); expect(viewport.wasLimited).toBe(true); expect(5000*4000*viewport.scale*viewport.scale).toBeLessThanOrEqual(PDF_TO_JPG_LIMITS.maxPixels);
  });
  it("uses localized, ordered names and enforces page limits", () => {
    expect(getPdfJpgFileName("en", 1, 100)).toBe("page-001.jpg"); expect(getPdfJpgFileName("pt-BR", 2, 10)).toBe("pagina-002.jpg");
    expect(()=>assertPdfJpgLimits(1,Array.from({length:16},(_,i)=>i+1),"high")).toThrow("too-many-pages");
  });
});
