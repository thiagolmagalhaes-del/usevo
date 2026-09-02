import type { PdfJpgQuality } from "./pdf-to-jpg";
import { getBoundedViewport, PDF_JPG_QUALITY, PdfToJpgError } from "./pdf-to-jpg";

type PdfDocument = { numPages: number; getPage: (page: number) => Promise<any>; destroy: () => Promise<void> };
let pdfJsPromise: Promise<any> | undefined;

const getPdfJs = async () => {
  pdfJsPromise ??= import("pdfjs-dist/build/pdf.mjs").then((pdfjs) => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    return pdfjs;
  });
  return pdfJsPromise;
};

export const openPdfForRendering = async (bytes: ArrayBuffer): Promise<PdfDocument> => {
  const pdfjs = await getPdfJs();
  return pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
};

export const renderPdfPageToJpg = async (page: any, quality: PdfJpgQuality): Promise<{ bytes: Uint8Array; wasLimited: boolean }> => {
  const initial = page.getViewport({ scale: 1 });
  const bounded = getBoundedViewport(initial.width, initial.height, PDF_JPG_QUALITY[quality].scale);
  const viewport = page.getViewport({ scale: bounded.scale });
  if (viewport.width * viewport.height > 8_000_000) throw new PdfToJpgError("canvas-too-large");
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new PdfToJpgError("canvas-too-large");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  try {
    await page.render({ canvasContext: context, viewport, background: "#fff" }).promise;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", PDF_JPG_QUALITY[quality].jpegQuality));
    if (!blob) throw new PdfToJpgError("blob-failed");
    return { bytes: new Uint8Array(await blob.arrayBuffer()), wasLimited: bounded.wasLimited };
  } finally {
    canvas.width = 0;
    canvas.height = 0;
    page.cleanup?.();
  }
};
