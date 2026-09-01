import type { PdfPageRange, PdfSplitMode } from "./pdf-page-ranges";

export const PDF_SPLIT_LIMITS = {
  sourceBytes: 25 * 1024 * 1024,
  extractPages: 200,
  individualPages: 100,
  customFiles: 50,
  aggregateBytes: 100 * 1024 * 1024,
} as const;

export type PdfSplitFile = { name: string; bytes: Uint8Array };
export type PdfSplitLimitCode = "source-too-large" | "too-many-pages" | "too-many-files" | "result-too-large";

export class PdfSplitLimitError extends Error {
  constructor(public readonly code: PdfSplitLimitCode) {
    super(code);
  }
}

export const getPdfPageCount = async (source: ArrayBuffer): Promise<number> => {
  const { PDFDocument } = await import("pdf-lib");
  const document = await PDFDocument.load(source);
  return document.getPageCount();
};

export const validatePdfSplitLimits = ({
  sourceBytes,
  pageCount,
  mode,
  groups,
}: {
  sourceBytes: number;
  pageCount: number;
  mode: PdfSplitMode;
  groups: PdfPageRange[];
}) => {
  if (sourceBytes > PDF_SPLIT_LIMITS.sourceBytes) throw new PdfSplitLimitError("source-too-large");
  if (mode === "extract" && groups[0]!.pages.length > PDF_SPLIT_LIMITS.extractPages) throw new PdfSplitLimitError("too-many-pages");
  if (mode === "all" && pageCount > PDF_SPLIT_LIMITS.individualPages) throw new PdfSplitLimitError("too-many-pages");
  if (mode === "ranges" && groups.length > PDF_SPLIT_LIMITS.customFiles) throw new PdfSplitLimitError("too-many-files");
};

export const createPdfFiles = async (source: ArrayBuffer, groups: PdfPageRange[], baseName: string): Promise<PdfSplitFile[]> => {
  const { PDFDocument } = await import("pdf-lib");
  const input = await PDFDocument.load(source);
  const files: PdfSplitFile[] = [];
  for (const group of groups) {
    const output = await PDFDocument.create();
    const pages = await output.copyPages(input, group.pages.map((page) => page - 1));
    pages.forEach((page) => output.addPage(page));
    files.push({ name: `${baseName}-${group.start}${group.start === group.end ? "" : `-${group.end}`}.pdf`, bytes: await output.save() });
  }
  return files;
};

export const assertAggregateSize = (files: PdfSplitFile[]) => {
  if (files.reduce((sum, file) => sum + file.bytes.byteLength, 0) > PDF_SPLIT_LIMITS.aggregateBytes) {
    throw new PdfSplitLimitError("result-too-large");
  }
};

export const createPdfZip = async (files: PdfSplitFile[]): Promise<Uint8Array> => {
  assertAggregateSize(files);
  const { zipSync } = await import("fflate");
  const archive = zipSync(Object.fromEntries(files.map((file) => [file.name, file.bytes])), { level: 6 });
  if (archive.byteLength > PDF_SPLIT_LIMITS.aggregateBytes) throw new PdfSplitLimitError("result-too-large");
  return archive;
};
