import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { ferramentas, getFerramentaTranslation } from "../data/ferramentas";
import { getSiteAlternates, getToolLocaleRoute } from "../data/locale-routes";

const component = new URL("../components/tools/ImageConverter.astro", import.meta.url);
const client = new URL("./image-converter-client.ts", import.meta.url);
describe("image converter UI contract", () => {
  it("provides accessible button and drop upload, previews, metadata, and manual download", async () => {
    const markup = await readFile(component, "utf8");
    expect(markup).toContain('<label id="imageConverterDropArea" class="drop-area" for="imageConverterInput">');
    expect(markup).toContain('accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"');
    expect(markup).toContain('aria-live="polite"'); expect(markup).toContain('role="alert"'); expect(markup).toContain('id="imageConverterDownload"'); expect(markup).toContain('id="imageConverterBackground" class="color-input" type="color" value="#ffffff" aria-describedby="imageConverterBackgroundHelp imageConverterBackgroundValue"'); expect(markup).toContain('<output id="imageConverterBackgroundValue" class="color-value" aria-live="polite">#FFFFFF</output>'); expect(markup).toContain('id="imageConverterBackgroundHelp" class="background-help"');
  });
  it("keeps quality and runtime WebP detection in the browser client", async () => {
    const source = await readFile(client, "utf8");
    expect(source).toContain('target === "png"'); expect(source).toContain('supportsWebpExport'); expect(source).toContain('blob.type !== mime'); expect(source).toContain('URL.revokeObjectURL'); expect(source).toContain('imageOrientation: "from-image"');
  });
  it("clears every partial panel, preview URL, and metadata before reporting a rejected file", async () => {
    const source = await readFile(client, "utf8");
    expect(source).toContain("const clearRejectedAttempt = () =>");
    expect(source).toContain("revokeOriginal(); revokeResult(); form.reset();");
    expect(source).toContain("output.replaceChildren(); info.hidden = true; controls.hidden = true; another.hidden = true;");
    expect(source).toContain("clearRejectedAttempt(); showError(message(reason));");
  });
  it("keeps a compact, labeled color picker and synchronizes its displayed hexadecimal value", async () => {
    const [markup, source] = await Promise.all([readFile(component, "utf8"), readFile(client, "utf8")]);
    expect(markup).toContain(".color-picker{align-items:center;display:flex;gap:12px}"); expect(markup).toContain(".controls .color-input{cursor:pointer;height:46px;padding:3px;width:58px}");
    expect(source).toContain("const updateBackgroundValue = () => { backgroundValue.textContent = background.value.toUpperCase(); revokeResult(); };"); expect(source).toContain('background.addEventListener("input", updateBackgroundValue)');
  });
});
describe("image converter catalog routes and translations", () => {
  it("registers reciprocal PT-BR, EN, and ES routes", () => {
    const tool = ferramentas.find((item) => item.id === "converter-imagem")!;
    expect(tool.url).toBe("/ferramentas/converter-imagem"); expect(getToolLocaleRoute(tool, "en")).toBe("/en/tools/image-converter"); expect(getToolLocaleRoute(tool, "es")).toBe("/es/herramientas/convertir-imagen"); expect(getFerramentaTranslation(tool, "en").title).toBe("Image Converter");
    expect(getSiteAlternates(tool.url)).toEqual({ "pt-BR":"https://usevo.tools/ferramentas/converter-imagem", en:"https://usevo.tools/en/tools/image-converter", es:"https://usevo.tools/es/herramientas/convertir-imagen" });
  });
});
