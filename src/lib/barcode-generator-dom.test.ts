import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync(new URL("../components/tools/BarcodeGenerator.astro", import.meta.url), "utf8");
const page = readFileSync(new URL("../pages/ferramentas/gerador-de-codigo-de-barras.astro", import.meta.url), "utf8");

describe("barcode generator UI contract", () => {
  it("provides localized controls, instant rendering, downloads, and accessible feedback", () => {
    for (const id of ["barcodeInput", "barcodeFormat", "barcodeShowValue", "barcodeWidth", "barcodeHeight", "barcodeBackground", "barcodeClear", "barcodePng", "barcodeSvgDownload"]) {
      expect(component).toContain(`id="${id}"`);
    }
    expect(component).toContain('label for="barcodeInput"');
    expect(component).toContain('role="alert" aria-live="polite"');
    expect(component).toContain('role="status" aria-live="polite"');
    expect(component).toContain('value={initialValue}');
    expect(component).toContain('const initialValue = "USEVO-2026"');
    expect(component).toContain("JsBarcode(svg");
    expect(component).toContain('const exportCanvas = document.createElement("canvas")');
    expect(component).toContain("JsBarcode(exportCanvas");
    expect(component).toContain("exportCanvas.remove()");
    expect(component).not.toContain('id="barcodeCanvas"');
    expect(component).toContain('control.addEventListener("input", updatePreview)');
    expect(component).toContain('URL.createObjectURL(blob)');
    expect(component).toContain('URL.revokeObjectURL(url)');
    expect(component).toContain("const clearPreview = () =>");
    expect(component).toContain("clearBarcodePreview(svg)");
    expect(component).toContain("function showEmptyState()");
    expect(component).toContain("function showInvalidState(message)");
    expect(component).toContain("function renderValidBarcode(value, settings)");
    expect(component).toContain("function updatePreview()");
    expect(component.replace(/\r\n/g, "\n")).toContain("clearPreview();\n    widthValue");
    expect(component).toContain('input.value = ""; updatePreview(); input.focus();');
    expect(component).not.toContain('id="barcodeCanvas"');
    expect(component).not.toMatch(/\bfetch\s*\(/);
    expect(component).not.toContain("localStorage");
  });

  it("renders through the shared layout and editorial component with one H1", () => {
    expect(page).toContain("<Layout");
    expect(page).toContain("<BarcodeGenerator locale={locale} />");
    expect(page).toContain("<ToolEditorialContent");
    expect(page.match(/<h1(?:\s|>)/g) ?? []).toHaveLength(1);
  });
});
