import {
  type ImageDimensions,
  type ImageOutputFormat,
  getOutputMimeType,
  getResizedFileName,
  isSupportedImageFile,
  resizeByPercentage,
  resizeFromHeight,
  resizeFromWidth,
  validateDimensions,
} from "./image-resizer";

type ElementLookup = Pick<Document, "getElementById">;

export type ImageResizerCopy = {
  noImage: string;
  unsupportedFile: string;
  invalidDimensions: string;
  dimensionsTooLarge: string;
  readError: string;
  processingError: string;
  processing: string;
  ready: string;
  outputReady: string;
  originalDimensions: string;
  finalDimensions: string;
  originalFormat: string;
};

type LoadedImage = {
  source: CanvasImageSource;
  dimensions: ImageDimensions;
  dispose: () => void;
};

const getElement = <T extends HTMLElement>(documentRef: ElementLookup, id: string) => {
  const element = documentRef.getElementById(id);
  if (!element) throw new Error(`Missing image resizer element: ${id}`);
  return element as T;
};

const formatFileSize = (bytes: number) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** unit).toFixed(unit === 0 ? 0 : 2)} ${units[unit]}`;
};

const loadImage = async (file: File): Promise<LoadedImage> => {
  if ("createImageBitmap" in globalThis) {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return {
        source: bitmap,
        dimensions: { width: bitmap.width, height: bitmap.height },
        dispose: () => bitmap.close(),
      };
    } catch {
      // Older Safari versions and some encoded images require the Image fallback below.
    }
  }

  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Image decoding failed"));
      image.src = objectUrl;
    });
    return {
      source: image,
      dimensions: { width: image.naturalWidth, height: image.naturalHeight },
      dispose: () => URL.revokeObjectURL(objectUrl),
    };
  } catch (error) {
    URL.revokeObjectURL(objectUrl);
    throw error;
  }
};

const canvasToBlob = (canvas: HTMLCanvasElement, mimeType: string, quality: number) => new Promise<Blob>((resolve, reject) => {
  canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Canvas export failed")), mimeType, quality);
});

export const initializeImageResizer = (documentRef: ElementLookup, copy: ImageResizerCopy) => {
  const form = getElement<HTMLFormElement>(documentRef, "imageResizerForm");
  if (form.dataset.imageResizerBound === "true") return;
  form.dataset.imageResizerBound = "true";

  const dropArea = getElement<HTMLLabelElement>(documentRef, "resizerDropArea");
  const fileInput = getElement<HTMLInputElement>(documentRef, "resizerFileInput");
  const imageInfo = getElement<HTMLElement>(documentRef, "resizerImageInfo");
  const fileName = getElement<HTMLElement>(documentRef, "resizerFileName");
  const fileSize = getElement<HTMLElement>(documentRef, "resizerFileSize");
  const originalDimensions = getElement<HTMLElement>(documentRef, "resizerOriginalDimensions");
  const preview = getElement<HTMLImageElement>(documentRef, "resizerPreview");
  const controls = getElement<HTMLElement>(documentRef, "resizerControls");
  const widthInput = getElement<HTMLInputElement>(documentRef, "resizerWidth");
  const heightInput = getElement<HTMLInputElement>(documentRef, "resizerHeight");
  const keepRatio = getElement<HTMLInputElement>(documentRef, "resizerKeepRatio");
  const formatInput = getElement<HTMLSelectElement>(documentRef, "resizerFormat");
  const qualityRow = getElement<HTMLElement>(documentRef, "resizerQualityRow");
  const qualityInput = getElement<HTMLInputElement>(documentRef, "resizerQuality");
  const processButton = getElement<HTMLButtonElement>(documentRef, "resizerProcess");
  const clearButton = getElement<HTMLButtonElement>(documentRef, "resizerClear");
  const error = getElement<HTMLElement>(documentRef, "resizerError");
  const status = getElement<HTMLElement>(documentRef, "resizerStatus");
  const result = getElement<HTMLElement>(documentRef, "resizerResult");
  const finalDimensions = getElement<HTMLElement>(documentRef, "resizerFinalDimensions");
  const finalSize = getElement<HTMLElement>(documentRef, "resizerFinalSize");
  const download = getElement<HTMLAnchorElement>(documentRef, "resizerDownload");
  const outputPreview = getElement<HTMLImageElement>(documentRef, "resizerOutputPreview");
  const presets = Array.from({ length: 4 }, (_, index) => getElement<HTMLButtonElement>(documentRef, `resizerPreset${[25, 50, 75, 100][index]}`));

  let currentFile: File | undefined;
  let sourceDimensions: ImageDimensions | undefined;
  let previewUrl: string | undefined;
  let outputUrl: string | undefined;
  let loadingVersion = 0;

  const revokePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = undefined;
    preview.removeAttribute("src");
  };
  const revokeOutput = () => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    outputUrl = undefined;
    outputPreview.removeAttribute("src");
    download.removeAttribute("href");
  };
  const clearError = () => { error.textContent = ""; error.hidden = true; };
  const showError = (message: string) => { error.textContent = message; error.hidden = false; status.textContent = ""; };
  const clearResult = () => { revokeOutput(); result.hidden = true; };
  const outputMimeType = () => getOutputMimeType(formatInput.value as ImageOutputFormat, currentFile?.type ?? "image/png");
  const setQualityVisibility = () => { qualityRow.hidden = outputMimeType() === "image/png"; };
  const invalidateOutput = () => { clearResult(); status.textContent = ""; };

  const setDimensions = (dimensions: ImageDimensions) => {
    widthInput.value = String(dimensions.width);
    heightInput.value = String(dimensions.height);
    invalidateOutput();
  };

  const handleDimensionChange = (changed: "width" | "height") => {
    if (!sourceDimensions || !keepRatio.checked) return invalidateOutput();
    const value = Number(changed === "width" ? widthInput.value : heightInput.value);
    if (!Number.isInteger(value) || value < 1) return invalidateOutput();
    const dimensions = changed === "width" ? resizeFromWidth(sourceDimensions, value) : resizeFromHeight(sourceDimensions, value);
    if (changed === "width") heightInput.value = String(dimensions.height);
    else widthInput.value = String(dimensions.width);
    invalidateOutput();
  };

  const acceptFile = async (file?: File) => {
    const version = ++loadingVersion;
    clearError();
    invalidateOutput();
    if (!file) return;
    if (!isSupportedImageFile(file)) {
      showError(copy.unsupportedFile);
      return;
    }
    currentFile = file;
    revokePreview();
    previewUrl = URL.createObjectURL(file);
    preview.src = previewUrl;
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    imageInfo.hidden = false;
    controls.hidden = true;
    status.textContent = copy.processing;

    try {
      const loaded = await loadImage(file);
      if (version !== loadingVersion) {
        loaded.dispose();
        return;
      }
      sourceDimensions = loaded.dimensions;
      originalDimensions.textContent = `${loaded.dimensions.width} × ${loaded.dimensions.height} px`;
      setDimensions(loaded.dimensions);
      setQualityVisibility();
      controls.hidden = false;
      status.textContent = copy.ready;
      loaded.dispose();
    } catch {
      if (version !== loadingVersion) return;
      currentFile = undefined;
      sourceDimensions = undefined;
      controls.hidden = true;
      revokePreview();
      showError(copy.readError);
    }
  };

  const clearAll = () => {
    loadingVersion += 1;
    currentFile = undefined;
    sourceDimensions = undefined;
    revokePreview();
    clearResult();
    form.reset();
    widthInput.value = "";
    heightInput.value = "";
    keepRatio.checked = true;
    formatInput.value = "original";
    qualityInput.value = "0.92";
    imageInfo.hidden = true;
    controls.hidden = true;
    clearError();
    status.textContent = "";
    setQualityVisibility();
  };

  const processImage = async () => {
    if (!currentFile || !sourceDimensions) return showError(copy.noImage);
    const dimensions = { width: Number(widthInput.value), height: Number(heightInput.value) };
    const validation = validateDimensions(dimensions);
    if (validation === "invalid") return showError(copy.invalidDimensions);
    if (validation === "too-large") return showError(copy.dimensionsTooLarge);

    clearError();
    clearResult();
    processButton.disabled = true;
    status.textContent = copy.processing;
    let loaded: LoadedImage | undefined;
    try {
      loaded = await loadImage(currentFile);
      const canvas = document.createElement("canvas");
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      const mimeType = outputMimeType();
      if (mimeType === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, dimensions.width, dimensions.height);
      }
      context.drawImage(loaded.source, 0, 0, dimensions.width, dimensions.height);
      const blob = await canvasToBlob(canvas, mimeType, Number(qualityInput.value));
      const exportedMimeType = blob.type || mimeType;
      outputUrl = URL.createObjectURL(blob);
      outputPreview.src = outputUrl;
      download.href = outputUrl;
      download.download = getResizedFileName(currentFile.name, exportedMimeType);
      finalDimensions.textContent = `${dimensions.width} × ${dimensions.height} px`;
      finalSize.textContent = formatFileSize(blob.size);
      result.hidden = false;
      status.textContent = copy.outputReady;
    } catch {
      showError(copy.processingError);
    } finally {
      loaded?.dispose();
      processButton.disabled = false;
    }
  };

  dropArea.addEventListener("dragover", (event) => { event.preventDefault(); dropArea.dataset.dragging = "true"; });
  dropArea.addEventListener("dragleave", () => { delete dropArea.dataset.dragging; });
  dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    delete dropArea.dataset.dragging;
    void acceptFile(event.dataTransfer?.files?.[0]);
  });
  fileInput.addEventListener("change", () => { void acceptFile(fileInput.files?.[0]); });
  widthInput.addEventListener("input", () => handleDimensionChange("width"));
  heightInput.addEventListener("input", () => handleDimensionChange("height"));
  keepRatio.addEventListener("change", invalidateOutput);
  formatInput.addEventListener("change", () => { setQualityVisibility(); invalidateOutput(); });
  qualityInput.addEventListener("input", invalidateOutput);
  presets.forEach((preset) => preset.addEventListener("click", () => {
    if (!sourceDimensions) return showError(copy.noImage);
    setDimensions(resizeByPercentage(sourceDimensions, Number(preset.dataset.percent)));
  }));
  form.addEventListener("submit", (event) => { event.preventDefault(); void processImage(); });
  processButton.addEventListener("click", () => { void processImage(); });
  clearButton.addEventListener("click", clearAll);
  globalThis.addEventListener?.("pagehide", () => { revokePreview(); revokeOutput(); }, { once: true });
};
