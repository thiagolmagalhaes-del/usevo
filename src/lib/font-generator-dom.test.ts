import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync(new URL("../components/tools/FontGenerator.astro", import.meta.url), "utf8");
const page = readFileSync(new URL("../pages/ferramentas/gerador-de-letras-diferentes.astro", import.meta.url), "utf8");

describe("font generator UI contract", () => {
  it("keeps a visible label, clear action, accessible copy feedback, and individual copy controls", () => {
    expect(component).toContain('<label for="fontGeneratorInput">');
    expect(component).toContain('id="fontGeneratorClear"');
    expect(component).toContain('aria-live="polite"');
    expect(component).toContain("navigator.clipboard");
    expect(component).toContain("button.addEventListener(\"click\", () => copyResult");
    expect(component).toContain("input.addEventListener(\"input\", renderResults)");
    expect(component).toContain("input.value = \"\"");
  });

  it("keeps each localized placeholder free of language leakage", () => {
    expect(component).toContain('placeholder: "Digite ou cole seu texto aqui..."');
    expect(component).not.toMatch(/[\u0530-\u058F]/);
    expect(component).toContain('placeholder: "Type or paste your text here..."');
    expect(component).toContain('placeholder: "Escribe o pega tu texto aquí..."');
  });

  it("scopes styles for dynamically rendered results to the tool", () => {
    expect(component).toContain('heading.className = "result-title"');
    for (const selector of ["font-result", "result-row", "result-text", "copy-button", "empty-state", "result-title"]) {
      expect(component).toContain(`.font-generator :global(.${selector})`);
    }
    expect(component).toContain('.font-generator :global(.copy-button):focus-visible');
    expect(component).not.toMatch(/(?:^|[,{]\s*)(?:h2|\.font-result|\.result-row|\.result-text|\.copy-button|\.empty-state|\.result-title)\s*\{/m);
  });

  it("renders the tool through the shared layout and editorial component without an additional H1", () => {
    expect(page).toContain("<Layout");
    expect(page).toContain("<FontGenerator locale={locale} />");
    expect(page).toContain("<ToolEditorialContent");
    expect(page.match(/<h1(?:\s|>)/g) ?? []).toHaveLength(1);
    expect(component.match(/<h1(?:\s|>)/g)).toBeNull();
  });
});
