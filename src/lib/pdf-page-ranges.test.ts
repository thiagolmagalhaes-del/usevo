import { describe, expect, it } from "vitest";
import { getIndividualPdfPageRanges, parsePdfPageRanges, PdfPageRangeError } from "./pdf-page-ranges";

describe("PDF page ranges", () => {
  it("parses individual pages, ranges, combinations, and spaces", () => {
    expect(parsePdfPageRanges("5", 10, "extract")[0]?.pages).toEqual([5]);
    expect(parsePdfPageRanges("1-3", 10, "extract")[0]?.pages).toEqual([1, 2, 3]);
    expect(parsePdfPageRanges(" 1 - 3 , 5 , 7 - 9 ", 10, "extract")[0]?.pages).toEqual([1, 2, 3, 5, 7, 8, 9]);
  });

  it("deduplicates and orders extraction pages", () => {
    expect(parsePdfPageRanges("5,1-3,2", 10, "extract")[0]?.pages).toEqual([1, 2, 3, 5]);
  });

  it("rejects invalid, inverted, absent, and overlapping ranges", () => {
    for (const input of ["", "1,,2", "1,", "a", "1.5", "0", "-1", "3-1", "11"]) {
      expect(() => parsePdfPageRanges(input, 10, "extract")).toThrow(PdfPageRangeError);
    }
    expect(() => parsePdfPageRanges("1-3,3-5", 10, "ranges")).toThrow("overlap");
  });

  it("creates one group per page", () => {
    expect(getIndividualPdfPageRanges(3).map((range) => range.pages)).toEqual([[1], [2], [3]]);
  });
});
