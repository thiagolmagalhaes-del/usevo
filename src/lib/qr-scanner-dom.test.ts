import { readFile } from "node:fs/promises";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ferramentas, getFerramentaTranslation } from "../data/ferramentas";
import { getToolLocaleRoute } from "../data/locale-routes";
import { initializeQrScanner, type QrScannerCopy } from "./qr-scanner-client";

const componentUrl = new URL("../components/tools/QrCodeScanner.astro", import.meta.url);
const clientUrl = new URL("./qr-scanner-client.ts", import.meta.url);
const generatorUrl = new URL("../pages/ferramentas/gerador-de-qr-code.astro", import.meta.url);

class FakeElement {
  attributes = new Map<string, string>();
  dataset: Record<string, string | undefined> = {};
  hidden = false;
  textContent = "";
  value = "";
  files?: FileList;
  srcObject: MediaProvider | null = null;
  readyState = 0;
  videoWidth = 0;
  videoHeight = 0;
  pause = vi.fn();
  play = vi.fn().mockResolvedValue(undefined);
  private listeners = new Map<string, Array<(event: any) => void>>();

  addEventListener(type: string, listener: (event: any) => void) {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
  }

  click() {
    for (const listener of this.listeners.get("click") ?? []) listener({ preventDefault: vi.fn() });
  }

  setAttribute(name: string, value: string) { this.attributes.set(name, value); }
  removeAttribute(name: string) { this.attributes.delete(name); }
  getAttribute(name: string) { return this.attributes.get(name) ?? null; }
}

type MediaProvider = { getTracks: () => Array<{ stop: () => void }> };

const createScannerDocument = () => {
  const ids = [
    "qrScanner", "qrScannerImageMode", "qrScannerCameraMode", "qrScannerImageModePanel", "qrScannerCameraModePanel",
    "qrScannerDropArea", "qrScannerFileInput", "qrScannerImagePreview", "qrScannerImagePreviewPanel", "qrScannerClearImage",
    "qrScannerStartCamera", "qrScannerStopCamera", "qrScannerVideo", "qrScannerStatus", "qrScannerError", "qrScannerResult",
    "qrScannerResultKind", "qrScannerResultContent", "qrScannerDestination", "qrScannerOpenLink", "qrScannerCopy", "qrScannerAnother",
  ];
  const elements = new Map(ids.map((id) => [id, new FakeElement()]));
  elements.get("qrScannerCameraModePanel")!.hidden = true;
  const documentRef = {
    getElementById: (id: string) => elements.get(id) ?? null,
    addEventListener: vi.fn(),
  };
  return { documentRef, elements };
};

const copy: QrScannerCopy = {
  unsupportedImage: "unsupported", readingImage: "reading", noQrFound: "none", imageReadError: "image error",
  cameraStarting: "starting", cameraUnavailable: "unavailable", cameraDenied: "denied", insecureContext: "insecure",
  cameraError: "camera error", copied: "copied", copyError: "copy error", detected: "detected",
  kindLabels: { url: "URL", text: "Text", email: "Email", phone: "Phone", wifi: "Wi-Fi" }, openLink: "Open", destination: "Destination",
};

afterEach(() => vi.unstubAllGlobals());

describe("QR scanner DOM integration contract", () => {
  it("uses a native upload label and exposes image, paste, drag, clear, and camera controls", async () => {
    const markup = await readFile(componentUrl, "utf8");
    expect(markup).toContain('<label id="qrScannerDropArea" class="drop-area" for="qrScannerFileInput">');
    expect(markup).toContain('<input id="qrScannerFileInput" class="file-input" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"');
    expect(markup).toContain('id="qrScannerClearImage"');
    expect(markup).toContain('id="qrScannerStartCamera"');
    expect(markup).toContain('autoplay muted playsinline');
    expect(markup).toContain('id="qrScannerConfig" type="application/json"');
    expect(markup).toContain('document.getElementById("qrScannerConfig")');
    expect(markup).toContain('.qr-scanner [hidden] { display:none !important; }');
    expect(markup).not.toContain("define:vars");
  });

  it("guards initialization and registers cleanup, paste, drag, and result actions", async () => {
    const client = await readFile(clientUrl, "utf8");
    expect(client).toContain('dataset.qrScannerBound === "true"');
    expect(client).toContain('addEventListener("paste"');
    expect(client).toContain('addEventListener("drop"');
    expect(client).toContain('addEventListener("visibilitychange"');
    expect(client).toContain('globalThis.addEventListener?.("pagehide"');
    expect(client).toContain('stopMediaTracks(cameraStream)');
    expect(client).toContain('anotherButton.addEventListener("click"');
    expect(client).toContain('copyButton.addEventListener("click"');
  });

  it("links the existing generator to the scanner", async () => {
    expect(await readFile(generatorUrl, "utf8")).toContain("scannerRoute");
  });

  it("switches panels on real tab clicks and stops camera tracks when returning to image mode", async () => {
    const { documentRef, elements } = createScannerDocument();
    const stopTrack = vi.fn();
    const getUserMedia = vi.fn().mockResolvedValue({ getTracks: () => [{ stop: stopTrack }] } satisfies MediaProvider);
    vi.stubGlobal("isSecureContext", true);
    vi.stubGlobal("navigator", { mediaDevices: { getUserMedia } });
    vi.stubGlobal("document", { visibilityState: "visible" });

    initializeQrScanner(documentRef as never, copy);
    const imageTab = elements.get("qrScannerImageMode")!;
    const cameraTab = elements.get("qrScannerCameraMode")!;
    const imagePanel = elements.get("qrScannerImageModePanel")!;
    const cameraPanel = elements.get("qrScannerCameraModePanel")!;

    cameraTab.click();
    expect(cameraTab.getAttribute("aria-selected")).toBe("true");
    expect(imageTab.getAttribute("aria-selected")).toBe("false");
    expect(cameraPanel.hidden).toBe(false);
    expect(imagePanel.hidden).toBe(true);
    expect(getUserMedia).not.toHaveBeenCalled();

    elements.get("qrScannerStartCamera")!.click();
    await Promise.resolve();
    await Promise.resolve();
    expect(getUserMedia).toHaveBeenCalledOnce();

    imageTab.click();
    expect(imageTab.getAttribute("aria-selected")).toBe("true");
    expect(cameraTab.getAttribute("aria-selected")).toBe("false");
    expect(imagePanel.hidden).toBe(false);
    expect(cameraPanel.hidden).toBe(true);
    expect(stopTrack).toHaveBeenCalledOnce();
  });
});

describe("QR scanner routes and translations", () => {
  it("registers localized catalog routes", () => {
    const tool = ferramentas.find((item) => item.id === "leitor-de-qr-code");
    expect(tool).toBeDefined();
    if (!tool) return;
    expect(tool.categoryKey).toBe("utilidades");
    expect(getToolLocaleRoute(tool, "pt-BR")).toBe("/ferramentas/leitor-de-qr-code");
    expect(getToolLocaleRoute(tool, "en")).toBe("/en/tools/qr-code-scanner");
    expect(getToolLocaleRoute(tool, "es")).toBe("/es/herramientas/escaner-de-codigo-qr");
    expect(getFerramentaTranslation(tool, "pt-BR").title).toBe("Leitor de QR Code");
    expect(getFerramentaTranslation(tool, "en").title).toBe("QR Code Scanner");
    expect(getFerramentaTranslation(tool, "es").title).toBe("Escáner de código QR");
  });
});
