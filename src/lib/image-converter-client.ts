import { ImageConverterError, assertOutputFormat, assertResultSize, formatLabel, formatMimeType, getConvertedFileName, isWebpBytes, type ImageConverterDimensions, type ImageConverterFormat, validateDimensions, validateInputFile } from "./image-converter";

export type ImageConverterCopy = Record<"processing" | "ready" | "noFile" | "tooLarge" | "invalidFile" | "extensionMismatch" | "mimeMismatch" | "dimensionsTooLarge" | "readError" | "processingError" | "resultTooLarge" | "webpUnsupported" | "outputReady" | "file" | "format" | "dimensions" | "size" | "original" | "converted", string>;
type Lookup = Pick<Document, "getElementById">;
type LoadedImage = { source: CanvasImageSource; dimensions: ImageConverterDimensions; dispose: () => void };

const element = <T extends HTMLElement>(documentRef: Lookup, id: string) => {
  const found = documentRef.getElementById(id);
  if (!found) throw new Error(`Missing image converter element: ${id}`);
  return found as T;
};
const fileSize = (bytes: number) => bytes ? `${(bytes / 1024 ** (bytes < 1024 ** 2 ? 1 : 2)).toFixed(bytes < 1024 ** 2 ? 2 : 2)} ${bytes < 1024 ** 2 ? "KB" : "MB"}` : "0 B";
const dimensionsText = ({ width, height }: ImageConverterDimensions) => `${width} × ${height} px`;

const loadImage = async (file: File): Promise<LoadedImage> => {
  if ("createImageBitmap" in globalThis) try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    return { source: bitmap, dimensions: { width: bitmap.width, height: bitmap.height }, dispose: () => bitmap.close() };
  } catch { /* Safari and unsupported encodings use the image fallback. */ }
  const image = new Image();
  try {
    const dataUrl = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("read")); reader.onerror = () => reject(new Error("read")); reader.readAsDataURL(file); });
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error("decode")); image.src = dataUrl; });
    return { source: image, dimensions: { width: image.naturalWidth, height: image.naturalHeight }, dispose: () => {} };
  } catch (error) { throw error; }
};
const canvasBlob = (canvas: HTMLCanvasElement, type: string, quality?: number) => new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("encode")), type, quality));
const isRealWebpBlob = async (blob: Blob) => blob.type === "image/webp" && isWebpBytes(new Uint8Array(await blob.arrayBuffer()));
const encodeWebp = async (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, quality: number) => {
  try {
    const nativeBlob = await canvasBlob(canvas, "image/webp", quality);
    if (await isRealWebpBlob(nativeBlob)) return nativeBlob;
  } catch { /* Safari can reject or silently substitute the requested Canvas format. */ }
  try {
    const { encode } = await import("@jsquash/webp");
    const encoded = await encode(context.getImageData(0, 0, canvas.width, canvas.height), { quality: Math.round(quality * 100) });
    const blob = new Blob([encoded], { type: "image/webp" });
    if (await isRealWebpBlob(blob)) return blob;
  } catch { /* The result below intentionally remains unavailable when the local encoder cannot start. */ }
  throw new ImageConverterError("webp-unsupported");
};
export const supportsWebpExport = async () => {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1;
  try {
    const blob = await canvasBlob(canvas, "image/webp", 0.92);
    if (blob.type !== "image/webp") return false;
    const dataUrl = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(); reader.onerror = () => reject(); reader.readAsDataURL(blob); });
    await new Promise<void>((resolve, reject) => { const image = new Image(); image.onload = () => resolve(); image.onerror = reject; image.src = dataUrl; });
    return true;
  } catch { return false; }
};

export const initializeImageConverter = async (documentRef: Document, copy: ImageConverterCopy) => {
  const form = element<HTMLFormElement>(documentRef, "imageConverterForm"); if (form.dataset.bound === "true") return; form.dataset.bound = "true";
  const drop = element<HTMLLabelElement>(documentRef, "imageConverterDropArea"), input = element<HTMLInputElement>(documentRef, "imageConverterInput"), info = element<HTMLElement>(documentRef, "imageConverterInfo"), preview = element<HTMLImageElement>(documentRef, "imageConverterPreview"), name = element<HTMLElement>(documentRef, "imageConverterName"), sourceFormat = element<HTMLElement>(documentRef, "imageConverterSourceFormat"), sourceDimensions = element<HTMLElement>(documentRef, "imageConverterSourceDimensions"), sourceSize = element<HTMLElement>(documentRef, "imageConverterSourceSize"), controls = element<HTMLElement>(documentRef, "imageConverterControls"), output = element<HTMLSelectElement>(documentRef, "imageConverterOutput"), qualityRow = element<HTMLElement>(documentRef, "imageConverterQualityRow"), pngNote = element<HTMLElement>(documentRef, "imageConverterPngNote"), quality = element<HTMLInputElement>(documentRef, "imageConverterQuality"), backgroundRow = element<HTMLElement>(documentRef, "imageConverterBackgroundRow"), background = element<HTMLInputElement>(documentRef, "imageConverterBackground"), backgroundValue = element<HTMLOutputElement>(documentRef, "imageConverterBackgroundValue"), convert = element<HTMLButtonElement>(documentRef, "imageConverterConvert"), clear = element<HTMLButtonElement>(documentRef, "imageConverterClear"), another = element<HTMLButtonElement>(documentRef, "imageConverterAnother"), status = element<HTMLElement>(documentRef, "imageConverterStatus"), error = element<HTMLElement>(documentRef, "imageConverterError"), result = element<HTMLElement>(documentRef, "imageConverterResult"), resultPreview = element<HTMLImageElement>(documentRef, "imageConverterResultPreview"), resultName = element<HTMLElement>(documentRef, "imageConverterResultName"), resultFormat = element<HTMLElement>(documentRef, "imageConverterResultFormat"), resultDimensions = element<HTMLElement>(documentRef, "imageConverterResultDimensions"), resultSize = element<HTMLElement>(documentRef, "imageConverterResultSize"), download = element<HTMLAnchorElement>(documentRef, "imageConverterDownload");
  let currentFile: File | undefined, currentFormat: ImageConverterFormat | undefined, originalUrl: string | undefined, resultUrl: string | undefined, version = 0;
  const revokeOriginal = () => { if (originalUrl) URL.revokeObjectURL(originalUrl); originalUrl = undefined; preview.removeAttribute("src"); };
  const revokeResult = () => { if (resultUrl) URL.revokeObjectURL(resultUrl); resultUrl = undefined; resultPreview.removeAttribute("src"); download.removeAttribute("href"); result.hidden = true; };
  const showError = (message: string) => { error.textContent = message; error.hidden = false; status.textContent = ""; };
  const clearError = () => { error.hidden = true; error.textContent = ""; };
  const message = (reason: unknown) => reason instanceof ImageConverterError ? ({ "too-large": copy.tooLarge, "invalid-file": copy.invalidFile, "extension-mismatch": copy.extensionMismatch, "mime-mismatch": copy.mimeMismatch, "dimensions-too-large": copy.dimensionsTooLarge, "result-too-large": copy.resultTooLarge, "webp-unsupported": copy.webpUnsupported, "same-format": copy.processingError }[reason.code]) : copy.processingError;
  const refreshControls = () => { const target = output.value as ImageConverterFormat; qualityRow.hidden = target === "png"; pngNote.hidden = target !== "png"; backgroundRow.hidden = !(target === "jpeg" && (currentFormat === "png" || currentFormat === "webp")); revokeResult(); };
  const updateBackgroundValue = () => { backgroundValue.textContent = background.value.toUpperCase(); revokeResult(); };
  const clearRejectedAttempt = () => {
    currentFile = undefined; currentFormat = undefined; input.value = ""; revokeOriginal(); revokeResult(); form.reset();
    [name, sourceFormat, sourceDimensions, sourceSize, resultName, resultFormat, resultDimensions, resultSize].forEach((item) => { item.textContent = ""; });
    output.replaceChildren(); info.hidden = true; controls.hidden = true; another.hidden = true; updateBackgroundValue();
  };
  const reset = () => { version += 1; clearRejectedAttempt(); clearError(); status.textContent = ""; };
  const accept = async (file?: File) => {
    reset(); const currentVersion = ++version; if (!file) return; clearError(); status.textContent = copy.processing;
    try {
      const metadata = await validateInputFile(file); if (currentVersion !== version) return;
      const loaded = await loadImage(file); try { validateDimensions(loaded.dimensions); if (loaded.dimensions.width !== metadata.dimensions.width || loaded.dimensions.height !== metadata.dimensions.height) throw new ImageConverterError("invalid-file"); } finally { loaded.dispose(); }
      currentFile = file; currentFormat = metadata.format; originalUrl = URL.createObjectURL(file); preview.src = originalUrl;
      name.textContent = file.name; sourceFormat.textContent = formatLabel(metadata.format); sourceDimensions.textContent = dimensionsText(metadata.dimensions); sourceSize.textContent = fileSize(file.size);
      output.replaceChildren(); (["jpeg", "png", "webp"] as ImageConverterFormat[]).filter((format) => format !== metadata.format).forEach((format) => output.add(new Option(formatLabel(format), format)));
      info.hidden = controls.hidden = false; refreshControls(); status.textContent = copy.ready;
    } catch (reason) { if (currentVersion === version) { clearRejectedAttempt(); showError(message(reason)); } }
  };
  const convertImage = async () => {
    if (!currentFile || !currentFormat) return showError(copy.noFile); clearError(); revokeResult(); const target = output.value as ImageConverterFormat; convert.disabled = clear.disabled = another.disabled = true; status.textContent = copy.processing; let loaded: LoadedImage | undefined;
    try {
      assertOutputFormat(currentFormat, target); loaded = await loadImage(currentFile); validateDimensions(loaded.dimensions);
      const canvas = document.createElement("canvas"); canvas.width = loaded.dimensions.width; canvas.height = loaded.dimensions.height; const context = canvas.getContext("2d", { alpha: target !== "jpeg" }); if (!context) throw new Error("canvas");
      if (target === "jpeg") { context.fillStyle = background.value || "#ffffff"; context.fillRect(0, 0, canvas.width, canvas.height); }
      context.drawImage(loaded.source, 0, 0); const mime = formatMimeType(target); const blob = target === "webp" ? await encodeWebp(canvas, context, Number(quality.value)) : await canvasBlob(canvas, mime, target === "png" ? undefined : Number(quality.value));
      if (blob.type !== mime || target === "webp" && !(await isRealWebpBlob(blob))) throw new ImageConverterError(target === "webp" ? "webp-unsupported" : "invalid-file"); assertResultSize(blob.size);
      resultUrl = URL.createObjectURL(blob); resultPreview.src = resultUrl; const outputName = getConvertedFileName(currentFile.name, target); download.href = resultUrl; download.download = outputName; resultName.textContent = outputName; resultFormat.textContent = formatLabel(target); resultDimensions.textContent = dimensionsText(loaded.dimensions); resultSize.textContent = fileSize(blob.size); result.hidden = false; another.hidden = false; status.textContent = copy.outputReady;
    } catch (reason) { showError(message(reason)); } finally { loaded?.dispose(); convert.disabled = clear.disabled = another.disabled = false; }
  };
  drop.addEventListener("dragover", (event) => { event.preventDefault(); drop.dataset.dragging = "true"; }); drop.addEventListener("dragleave", () => delete drop.dataset.dragging); drop.addEventListener("drop", (event) => { event.preventDefault(); delete drop.dataset.dragging; void accept(event.dataTransfer?.files?.[0]); }); input.addEventListener("change", () => void accept(input.files?.[0])); output.addEventListener("change", refreshControls); quality.addEventListener("input", revokeResult); background.addEventListener("input", updateBackgroundValue); convert.addEventListener("click", () => void convertImage()); clear.addEventListener("click", reset); another.addEventListener("click", () => input.click()); updateBackgroundValue(); globalThis.addEventListener?.("pagehide", () => { revokeOriginal(); revokeResult(); }, { once: true });
};
