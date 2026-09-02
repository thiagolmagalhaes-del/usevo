import { parsePdfPageRanges } from "./pdf-page-ranges";

export const PDF_TO_JPG_LIMITS = {
  sourceBytes: 20 * 1024 * 1024,
  lowMediumPages: 30,
  highPages: 15,
  aggregateBytes: 50 * 1024 * 1024,
  maxPixels: 8_000_000,
} as const;

export type PdfJpgQuality = "low" | "medium" | "high";
export type PdfJpgOutput = { name: string; bytes: Uint8Array };

export const PDF_JPG_QUALITY: Record<PdfJpgQuality, { scale: number; jpegQuality: number }> = {
  low: { scale: 1, jpegQuality: 0.72 },
  medium: { scale: 1.5, jpegQuality: 0.82 },
  high: { scale: 2, jpegQuality: 0.9 },
};

export class PdfToJpgError extends Error {
  constructor(public readonly code: "empty" | "too-many-pages" | "result-too-large" | "canvas-too-large" | "blob-failed") { super(code); }
}

export const getPdfJpgPages = (value: string, pageCount: number, allPages: boolean) =>
  allPages ? Array.from({ length: pageCount }, (_, index) => index + 1) : parsePdfPageRanges(value, pageCount, "extract")[0]!.pages;

export const assertPdfJpgLimits = (sourceBytes: number, pages: number[], quality: PdfJpgQuality) => {
  if (sourceBytes > PDF_TO_JPG_LIMITS.sourceBytes) throw new PdfToJpgError("result-too-large");
  const limit = quality === "high" ? PDF_TO_JPG_LIMITS.highPages : PDF_TO_JPG_LIMITS.lowMediumPages;
  if (!pages.length) throw new PdfToJpgError("empty");
  if (pages.length > limit) throw new PdfToJpgError("too-many-pages");
};

export const getBoundedViewport = (width: number, height: number, scale: number) => {
  const requestedPixels = width * height * scale * scale;
  const finalScale = requestedPixels > PDF_TO_JPG_LIMITS.maxPixels
    ? Math.sqrt((PDF_TO_JPG_LIMITS.maxPixels - 1) / (width * height))
    : scale;
  return { scale: finalScale, wasLimited: finalScale !== scale };
};

export const getPdfJpgFileName = (locale: "pt-BR" | "en" | "es", page: number, total: number) => {
  const prefix = locale === "en" ? "page" : "pagina";
  return `${prefix}-${String(page).padStart(Math.max(3, String(total).length), "0")}.jpg`;
};

export const assertPdfJpgAggregateSize = (files: PdfJpgOutput[]) => {
  if (files.reduce((total, file) => total + file.bytes.byteLength, 0) > PDF_TO_JPG_LIMITS.aggregateBytes) {
    throw new PdfToJpgError("result-too-large");
  }
};

export const createPdfJpgZip = async (files: PdfJpgOutput[]) => {
  assertPdfJpgAggregateSize(files);
  const { zipSync } = await import("fflate");
  const zip = zipSync(Object.fromEntries(files.map((file) => [file.name, file.bytes])), { level: 0 });
  if (zip.byteLength > PDF_TO_JPG_LIMITS.aggregateBytes) throw new PdfToJpgError("result-too-large");
  return zip;
};
