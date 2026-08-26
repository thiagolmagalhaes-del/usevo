import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { ferramentas, getFerramentaTranslation } from "../data/ferramentas";
import { getToolLocaleRoute } from "../data/locale-routes";

const componentUrl = new URL("../components/tools/QrCodeScanner.astro", import.meta.url);
const clientUrl = new URL("./qr-scanner-client.ts", import.meta.url);
const generatorUrl = new URL("../pages/ferramentas/gerador-de-qr-code.astro", import.meta.url);

describe("QR scanner DOM integration contract", () => {
  it("uses a native upload label and exposes image, paste, drag, clear, and camera controls", async () => {
    const markup = await readFile(componentUrl, "utf8");
    expect(markup).toContain('<label id="qrScannerDropArea" class="drop-area" for="qrScannerFileInput">');
    expect(markup).toContain('<input id="qrScannerFileInput" class="file-input" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"');
    expect(markup).toContain('id="qrScannerClearImage"');
    expect(markup).toContain('id="qrScannerStartCamera"');
    expect(markup).toContain('autoplay muted playsinline');
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
});

describe("QR scanner routes and translations", () => {
  it("registers localized catalog routes", () => {
    const tool = ferramentas.find((item) => item.id === "leitor-de-qr-code");
    expect(tool).toBeDefined();
    if (!tool) return;
    expect(tool.categoryKey).toBe("utilidades");
    expect(getToolLocaleRoute(tool, "pt-BR")).toBe("/ferramentas/leitor-de-qr-code");
    expect(getToolLocaleRoute(tool, "en")).toBe("/en/tools/qr-code-scanner/");
    expect(getToolLocaleRoute(tool, "es")).toBe("/es/herramientas/escaner-de-codigo-qr/");
    expect(getFerramentaTranslation(tool, "pt-BR").title).toBe("Leitor de QR Code");
    expect(getFerramentaTranslation(tool, "en").title).toBe("QR Code Scanner");
    expect(getFerramentaTranslation(tool, "es").title).toBe("Escáner de código QR");
  });
});
