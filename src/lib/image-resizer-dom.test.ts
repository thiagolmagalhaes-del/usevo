import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { ferramentas, getFerramentaTranslation } from "../data/ferramentas";
import { getToolLocaleRoute } from "../data/locale-routes";

const componentUrl = new URL("../components/tools/ImageResizer.astro", import.meta.url);
const compressorUrl = new URL("../components/tools/ImageCompressor.astro", import.meta.url);
const clientUrl = new URL("./image-resizer-client.ts", import.meta.url);

describe("image resizer UI contract", () => {
  it("uses a native label and input association for the full upload area", async () => {
    const markup = await readFile(componentUrl, "utf8");
    expect(markup).toContain('<label id="resizerDropArea" class="drop-area" for="resizerFileInput">');
    expect(markup).toContain('<input id="resizerFileInput" class="file-input" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"');
    expect(markup).toContain('user-select:none');
  });

  it("provides replace and clear controls without changing the compressor contract", async () => {
    const [resizerMarkup, compressorMarkup] = await Promise.all([
      readFile(componentUrl, "utf8"),
      readFile(compressorUrl, "utf8"),
    ]);
    expect(resizerMarkup).toContain('<label id="resizerReplace" class="button secondary" for="resizerFileInput">');
    expect(resizerMarkup).toContain('<button id="resizerClear" class="button secondary" type="button">');
    expect(compressorMarkup).toContain('<label id="dropArea" class="drop" for="fileInput">');
    expect(compressorMarkup).toContain('browser-image-compression');
  });

  it("does not reveal the details panel until the preview has decoded", async () => {
    const clientSource = await readFile(clientUrl, "utf8");
    const previewDecode = clientSource.indexOf("const dimensions = await loadPreview(preview, previewUrl);");
    const revealPanel = clientSource.indexOf("imageInfo.hidden = false;");
    expect(previewDecode).toBeGreaterThan(-1);
    expect(revealPanel).toBeGreaterThan(previewDecode);
    expect(clientSource).toContain("imageInfo.hidden = true;");
  });
});

describe("image resizer catalog routes and translations", () => {
  it("registers PT-BR, EN, and ES routes with localized metadata", () => {
    const tool = ferramentas.find((item) => item.id === "redimensionar-imagem");
    expect(tool).toBeDefined();
    if (!tool) return;

    expect(tool.categoryKey).toBe("arquivos");
    expect(tool.url).toBe("/ferramentas/redimensionar-imagem");
    expect(getToolLocaleRoute(tool, "pt-BR")).toBe("/ferramentas/redimensionar-imagem");
    expect(getToolLocaleRoute(tool, "en")).toBe("/en/tools/image-resizer");
    expect(getToolLocaleRoute(tool, "es")).toBe("/es/herramientas/redimensionar-imagen");
    expect(getFerramentaTranslation(tool, "pt-BR").title).toBe("Redimensionador de imagem");
    expect(getFerramentaTranslation(tool, "en").title).toBe("Image Resizer");
    expect(getFerramentaTranslation(tool, "es").title).toBe("Redimensionador de imagen");
  });
});
