export type PdfSplitMode = "extract" | "ranges" | "all";

export type PdfPageRange = {
  start: number;
  end: number;
  pages: number[];
};

export type PdfPageRangeErrorCode =
  | "empty"
  | "syntax"
  | "zero"
  | "reversed"
  | "out-of-bounds"
  | "overlap";

export class PdfPageRangeError extends Error {
  constructor(public readonly code: PdfPageRangeErrorCode) {
    super(code);
  }
}

const toRange = (token: string, pageCount: number): PdfPageRange => {
  if (!/^\d+(?:\s*-\s*\d+)?$/.test(token)) throw new PdfPageRangeError("syntax");

  const [startValue, endValue] = token.split("-").map((part) => Number(part.trim()));
  const start = startValue;
  const end = endValue ?? start;

  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < 1) {
    throw new PdfPageRangeError("zero");
  }
  if (start > end) throw new PdfPageRangeError("reversed");
  if (end > pageCount) throw new PdfPageRangeError("out-of-bounds");

  return { start, end, pages: Array.from({ length: end - start + 1 }, (_, index) => start + index) };
};

/** Parses 1-based user page ranges. */
export const parsePdfPageRanges = (
  value: string,
  pageCount: number,
  mode: Exclude<PdfSplitMode, "all">,
): PdfPageRange[] => {
  const normalized = value.trim();
  if (!normalized) throw new PdfPageRangeError("empty");

  const tokens = normalized.split(",").map((token) => token.trim());
  if (tokens.some((token) => !token)) throw new PdfPageRangeError("syntax");

  const ranges = tokens.map((token) => toRange(token, pageCount));
  if (mode === "ranges") {
    const seen = new Set<number>();
    for (const range of ranges) for (const page of range.pages) {
      if (seen.has(page)) throw new PdfPageRangeError("overlap");
      seen.add(page);
    }
    return ranges;
  }

  const pages = [...new Set(ranges.flatMap((range) => range.pages))].sort((a, b) => a - b);
  return [{ start: pages[0]!, end: pages.at(-1)!, pages }];
};

export const getIndividualPdfPageRanges = (pageCount: number): PdfPageRange[] =>
  Array.from({ length: pageCount }, (_, index) => {
    const page = index + 1;
    return { start: page, end: page, pages: [page] };
  });
