import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { getIndividualPdfPageRanges, parsePdfPageRanges } from "./pdf-page-ranges";
import { createPdfFiles, createPdfZip, PDF_SPLIT_LIMITS, PdfSplitLimitError, validatePdfSplitLimits } from "./pdf-splitter";

const sourcePdf = async () => { const pdf = await PDFDocument.create(); pdf.addPage(); pdf.addPage(); pdf.addPage(); pdf.addPage(); return (await pdf.save()).buffer; };

describe("PDF splitter", () => {
  it("creates a single extracted PDF with selected pages in order", async () => {
    const files = await createPdfFiles(await sourcePdf(), parsePdfPageRanges("3,1-2", 4, "extract"), "part");
    expect(files).toHaveLength(1);
    expect((await PDFDocument.load(files[0]!.bytes)).getPageCount()).toBe(3);
  });
  it("creates a PDF per range and per page, and zips outputs", async () => {
    const source = await sourcePdf();
    expect(await createPdfFiles(source, parsePdfPageRanges("1-2,3-4", 4, "ranges"), "part")).toHaveLength(2);
    const everyPage = await createPdfFiles(source, getIndividualPdfPageRanges(4), "part");
    expect(everyPage).toHaveLength(4);
    expect((await createPdfZip(everyPage)).byteLength).toBeGreaterThan(0);
  });
  it("enforces source, page, and file limits", () => {
    const group = parsePdfPageRanges("1", 1, "extract");
    expect(() => validatePdfSplitLimits({ sourceBytes: PDF_SPLIT_LIMITS.sourceBytes + 1, pageCount: 1, mode: "extract", groups: group })).toThrow(PdfSplitLimitError);
    expect(() => validatePdfSplitLimits({ sourceBytes: 1, pageCount: 201, mode: "extract", groups: [{ start: 1, end: 201, pages: Array.from({ length: 201 }, (_, i) => i + 1) }] })).toThrow("too-many-pages");
    expect(() => validatePdfSplitLimits({ sourceBytes: 1, pageCount: 51, mode: "ranges", groups: Array.from({ length: 51 }, (_, i) => ({ start: i + 1, end: i + 1, pages: [i + 1] })) })).toThrow("too-many-files");
  });
});
