import { isSupportedImageFile } from "./image-resizer";
import { classifyQrContent, copyQrContent, decodeQrPixels, getSafeHttpUrl, requestBackCamera, stopMediaTracks } from "./qr-scanner";

type ElementLookup = Pick<Document, "getElementById"> & Pick<Document, "addEventListener">;

export type QrScannerCopy = {
  unsupportedImage: string;
  readingImage: string;
  noQrFound: string;
  imageReadError: string;
  cameraStarting: string;
  cameraUnavailable: string;
  cameraDenied: string;
  insecureContext: string;
  cameraError: string;
  copied: string;
  copyError: string;
  detected: string;
  kindLabels: Record<string, string>;
  openLink: string;
  destination: string;
};

type BarcodeDetectorInstance = { detect: (source: CanvasImageSource) => Promise<Array<{ rawValue?: string }>> };
type BarcodeDetectorConstructor = new (options?: { formats?: string[] }) => BarcodeDetectorInstance;

const getElement = <T extends HTMLElement>(documentRef: ElementLookup, id: string) => {
  const element = documentRef.getElementById(id);
  if (!element) throw new Error(`Missing QR scanner element: ${id}`);
  return element as T;
};

const loadPreview = (image: HTMLImageElement, objectUrl: string) => new Promise<void>((resolve, reject) => {
  const clearHandlers = () => { image.onload = null; image.onerror = null; };
  image.onload = () => { clearHandlers(); resolve(); };
  image.onerror = () => { clearHandlers(); reject(new Error("Image preview failed")); };
  image.src = objectUrl;
  if (image.complete && image.naturalWidth > 0) { clearHandlers(); resolve(); }
});

const getDetector = () => {
  const Detector = (globalThis as unknown as { BarcodeDetector?: BarcodeDetectorConstructor }).BarcodeDetector;
  if (!Detector) return undefined;
  try { return new Detector({ formats: ["qr_code"] }); } catch { return undefined; }
};

const decodeSource = async (source: CanvasImageSource, width: number, height: number, detector?: BarcodeDetectorInstance) => {
  if (detector) {
    try {
      const result = await detector.detect(source);
      if (result[0]?.rawValue) return result[0].rawValue;
    } catch {
      // Fall back to jsqr without exposing decoded content to logs.
    }
  }
  const longestSide = Math.max(width, height);
  const scale = longestSide > 1_800 ? 1_800 / longestSide : 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas unavailable");
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  return decodeQrPixels(imageData.data, canvas.width, canvas.height);
};

export const initializeQrScanner = (documentRef: ElementLookup, copy: QrScannerCopy) => {
  const root = getElement<HTMLElement>(documentRef, "qrScanner");
  if (root.dataset.qrScannerBound === "true") return;
  root.dataset.qrScannerBound = "true";

  const imageModeButton = getElement<HTMLButtonElement>(documentRef, "qrScannerImageMode");
  const cameraModeButton = getElement<HTMLButtonElement>(documentRef, "qrScannerCameraMode");
  const imageMode = getElement<HTMLElement>(documentRef, "qrScannerImageModePanel");
  const cameraMode = getElement<HTMLElement>(documentRef, "qrScannerCameraModePanel");
  const dropArea = getElement<HTMLLabelElement>(documentRef, "qrScannerDropArea");
  const input = getElement<HTMLInputElement>(documentRef, "qrScannerFileInput");
  const imagePreview = getElement<HTMLImageElement>(documentRef, "qrScannerImagePreview");
  const imagePreviewPanel = getElement<HTMLElement>(documentRef, "qrScannerImagePreviewPanel");
  const clearImageButton = getElement<HTMLButtonElement>(documentRef, "qrScannerClearImage");
  const startCameraButton = getElement<HTMLButtonElement>(documentRef, "qrScannerStartCamera");
  const stopCameraButton = getElement<HTMLButtonElement>(documentRef, "qrScannerStopCamera");
  const video = getElement<HTMLVideoElement>(documentRef, "qrScannerVideo");
  const status = getElement<HTMLElement>(documentRef, "qrScannerStatus");
  const error = getElement<HTMLElement>(documentRef, "qrScannerError");
  const result = getElement<HTMLElement>(documentRef, "qrScannerResult");
  const resultKind = getElement<HTMLElement>(documentRef, "qrScannerResultKind");
  const resultContent = getElement<HTMLElement>(documentRef, "qrScannerResultContent");
  const destination = getElement<HTMLElement>(documentRef, "qrScannerDestination");
  const openLink = getElement<HTMLAnchorElement>(documentRef, "qrScannerOpenLink");
  const copyButton = getElement<HTMLButtonElement>(documentRef, "qrScannerCopy");
  const anotherButton = getElement<HTMLButtonElement>(documentRef, "qrScannerAnother");

  let previewUrl: string | undefined;
  let cameraStream: MediaStream | undefined;
  let scanTimeout: ReturnType<typeof setTimeout> | undefined;
  let scanSession = 0;
  let activeMode: "image" | "camera" = "image";
  let lastValue = "";
  const detector = getDetector();

  const clearError = () => { error.hidden = true; error.textContent = ""; };
  const showError = (message: string) => { error.hidden = false; error.textContent = message; status.textContent = ""; };
  const revokePreview = () => { if (previewUrl) URL.revokeObjectURL(previewUrl); previewUrl = undefined; imagePreview.removeAttribute("src"); };
  const clearResult = () => {
    lastValue = "";
    result.hidden = true;
    resultContent.textContent = "";
    resultKind.textContent = "";
    destination.hidden = true;
    destination.textContent = "";
    openLink.hidden = true;
    openLink.removeAttribute("href");
  };
  const stopCamera = () => {
    scanSession += 1;
    if (scanTimeout) clearTimeout(scanTimeout);
    scanTimeout = undefined;
    stopMediaTracks(cameraStream);
    cameraStream = undefined;
    video.pause();
    video.srcObject = null;
    stopCameraButton.hidden = true;
  };
  const clearImage = () => {
    input.value = "";
    revokePreview();
    imagePreviewPanel.hidden = true;
  };
  const setMode = (mode: "image" | "camera") => {
    activeMode = mode;
    imageMode.hidden = mode !== "image";
    cameraMode.hidden = mode !== "camera";
    imageModeButton.setAttribute("aria-pressed", String(mode === "image"));
    cameraModeButton.setAttribute("aria-pressed", String(mode === "camera"));
    if (mode === "image") stopCamera();
    else clearImage();
    clearError();
    clearResult();
    status.textContent = "";
  };
  const showResult = (value: string, source: "image" | "camera") => {
    lastValue = value;
    const kind = classifyQrContent(value);
    resultKind.textContent = copy.kindLabels[kind] ?? copy.kindLabels.text;
    resultContent.textContent = value;
    const safeUrl = getSafeHttpUrl(value);
    if (safeUrl) {
      destination.hidden = false;
      destination.textContent = `${copy.destination}: ${safeUrl.hostname}`;
      openLink.href = safeUrl.href;
      openLink.textContent = copy.openLink;
      openLink.hidden = false;
    }
    result.hidden = false;
    status.textContent = copy.detected;
    if (source === "camera") stopCamera();
  };
  const scanCamera = async (session: number) => {
    if (session !== scanSession || !cameraStream || document.visibilityState === "hidden") return stopCamera();
    try {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        const value = await decodeSource(video, video.videoWidth, video.videoHeight, detector);
        if (value) return showResult(value, "camera");
      }
    } catch {
      // Keep scanning. A single unreadable frame must not stop the camera.
    }
    if (session === scanSession && cameraStream) scanTimeout = setTimeout(() => { void scanCamera(session); }, 250);
  };
  const startCamera = async () => {
    clearError();
    clearResult();
    if (!globalThis.isSecureContext) return showError(copy.insecureContext);
    if (!navigator.mediaDevices?.getUserMedia) return showError(copy.cameraUnavailable);
    stopCamera();
    const session = ++scanSession;
    status.textContent = copy.cameraStarting;
    try {
      const stream = await requestBackCamera(navigator.mediaDevices);
      if (session !== scanSession) return stopMediaTracks(stream);
      cameraStream = stream;
      video.srcObject = stream;
      await video.play();
      stopCameraButton.hidden = false;
      void scanCamera(session);
    } catch (reason) {
      if (session !== scanSession) return;
      const name = reason instanceof DOMException ? reason.name : "";
      showError(name === "NotAllowedError" || name === "SecurityError" ? copy.cameraDenied : name === "NotFoundError" ? copy.cameraUnavailable : copy.cameraError);
      stopCamera();
    }
  };
  const scanImage = async (file?: File) => {
    clearError();
    clearResult();
    if (!file) return;
    if (!isSupportedImageFile(file)) return showError(copy.unsupportedImage);
    revokePreview();
    previewUrl = URL.createObjectURL(file);
    imagePreviewPanel.hidden = true;
    status.textContent = copy.readingImage;
    try {
      await loadPreview(imagePreview, previewUrl);
      imagePreviewPanel.hidden = false;
      const value = await decodeSource(imagePreview, imagePreview.naturalWidth, imagePreview.naturalHeight, detector);
      if (value) showResult(value, "image");
      else status.textContent = copy.noQrFound;
    } catch {
      imagePreviewPanel.hidden = true;
      revokePreview();
      showError(copy.imageReadError);
    }
  };
  const copyResult = async () => {
    if (!lastValue) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await copyQrContent(lastValue, navigator.clipboard);
      status.textContent = copy.copied;
    } catch {
      showError(copy.copyError);
    }
  };

  dropArea.addEventListener("dragover", (event) => { event.preventDefault(); dropArea.dataset.dragging = "true"; });
  dropArea.addEventListener("dragleave", () => { delete dropArea.dataset.dragging; });
  dropArea.addEventListener("drop", (event) => { event.preventDefault(); delete dropArea.dataset.dragging; void scanImage(event.dataTransfer?.files?.[0]); });
  input.addEventListener("change", () => { void scanImage(input.files?.[0]); });
  documentRef.addEventListener("paste", (event) => {
    if (activeMode !== "image") return;
    const file = Array.from(event.clipboardData?.files ?? []).find((item) => isSupportedImageFile(item));
    if (!file) return;
    event.preventDefault();
    void scanImage(file);
  });
  imageModeButton.addEventListener("click", () => setMode("image"));
  cameraModeButton.addEventListener("click", () => setMode("camera"));
  clearImageButton.addEventListener("click", () => { clearImage(); clearResult(); clearError(); status.textContent = ""; });
  startCameraButton.addEventListener("click", () => { void startCamera(); });
  stopCameraButton.addEventListener("click", () => { stopCamera(); status.textContent = ""; });
  copyButton.addEventListener("click", () => { void copyResult(); });
  anotherButton.addEventListener("click", () => {
    clearResult();
    if (activeMode === "camera") void startCamera();
    else { clearImage(); status.textContent = ""; }
  });
  documentRef.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") stopCamera(); });
  globalThis.addEventListener?.("pagehide", () => { stopCamera(); revokePreview(); }, { once: true });
};
