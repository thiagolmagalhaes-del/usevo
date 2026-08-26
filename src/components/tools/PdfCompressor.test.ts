import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const componentPath = fileURLToPath(new URL("./PdfCompressor.astro", import.meta.url));
const component = readFileSync(componentPath, "utf8");

describe("PdfCompressor upload", () => {
  it("uses a native label association instead of a programmatic file-input click", () => {
    expect(component).toMatch(
      /<label\s+id="dropArea"\s+class="drop"\s+for="fileInput">\{copy\.drop\}<\/label>/,
    );
    expect(component).toMatch(
      /<input\s+id="fileInput"\s+class="file-input"\s+type="file"\s+accept="application\/pdf"\s*\/>/,
    );
    expect(component).not.toMatch(/fileInput\.click\(\)/);
  });

  it("keeps the full upload area usable without selecting its text", () => {
    expect(component).toMatch(/\.drop\s*\{[^}]*display:block;[^}]*cursor:pointer;[^}]*user-select:none;/);
    expect(component).toContain("dropArea.addEventListener('drop'");
    expect(component).toContain("fileInput.addEventListener('change'");
  });

  it("retains the translated upload prompt for PT-BR, EN, and ES", () => {
    expect(component).toContain("Arraste e solte um PDF aqui ou clique para selecionar");
    expect(component).toContain("Drag and drop a PDF here or click to select");
    expect(component).toContain("Arrastra y suelta un PDF");
  });
});
