import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { ferramentas } from "./ferramentas";
import { SUPPORTED_LOCALES } from "./locales";
import { getToolEditorialContent, getToolEditorialContentByLocaleSlug, getEditorialRelatedTools } from "./tool-editorial-content";
import { transformText, fontStyleIds } from "../lib/font-generator";
import { normalizeParticipants, removeOccurrence, addWinnerToHistory, MAX_PARTICIPANTS } from "../lib/wheel-of-names";
import { validateBarcode, calculateCheckDigit, barcodeFormats } from "../lib/barcode-generator";

const toolIds = ["calculadora", "gerador-de-letras-diferentes", "roleta-de-nomes", "gerador-de-codigo-de-barras"] as const;
const readSource = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const strings = (value: unknown): string[] => typeof value === "string" ? [value]
  : Array.isArray(value) ? value.flatMap(strings)
  : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];

describe("audited high-risk tool editorial content", () => {
  for (const id of toolIds) {
    for (const locale of SUPPORTED_LOCALES) {
      it(`${id}/${locale} has substantive, localized content and relevant resolved links`, () => {
        const content = getToolEditorialContent(id, locale)!;
        const tool = ferramentas.find((tool) => tool.id === id)!;
        expect(getToolEditorialContentByLocaleSlug(tool.localeSlugs[locale], locale)).toBe(content);
        expect(content.howTo.steps).toHaveLength(3);
        expect(content.example.description.length).toBeGreaterThan(120);
        expect(content.example.result.length).toBeGreaterThan(180);
        expect(content.useCases.items.length).toBeGreaterThanOrEqual(3);
        expect(content.notes.items.length).toBeGreaterThanOrEqual(4);
        expect(content.faq.items).toHaveLength(4);
        for (const { question, answer } of content.faq.items) {
          expect(question.length).toBeGreaterThan(25);
          expect(answer.length).toBeGreaterThan(140);
        }
        const text = strings(content).join(" ");
        expect(text.length).toBeGreaterThan(3000);
        expect(text).not.toMatch(/\p{L}\?\p{L}/u);
        expect(text).not.toContain("\uFFFD");
        const foreignHeadings = {
          en: ["Como usar", "Cómo usar", "Perguntas frequentes", "Preguntas frecuentes", "Ferramentas relacionadas", "Herramientas relacionadas"],
          "pt-BR": ["How to use", "Cómo usar", "Frequently asked questions", "Preguntas frecuentes", "Related tools", "Herramientas relacionadas"],
          es: ["How to use", "Como usar", "Frequently asked questions", "Perguntas frequentes", "Related tools", "Ferramentas relacionadas"],
        };
        for (const marker of foreignHeadings[locale]) expect(text).not.toContain(marker);
        expect(new Set(SUPPORTED_LOCALES.map((lang) => getToolEditorialContent(id, lang)!.example.result)).size).toBe(3);
        const links = getEditorialRelatedTools(content, locale);
        expect(links).toHaveLength(content.relatedTools.items.length);
        expect(new Set(links.map((link) => link.href)).size).toBe(links.length);
        for (const link of links) {
          expect(link.toolId).not.toBe(id);
          expect(ferramentas.some((tool) => tool.id === link.toolId && tool.enabled)).toBe(true);
          expect(link.href).toMatch(locale === "en" ? /^\/en\/tools\// : locale === "es" ? /^\/es\/herramientas\// : /^\/ferramentas\//);
        }
      });
    }
  }

  it("keeps the calculator examples executable through the actual published script", () => {
    const source = readSource("../pages/ferramentas/calculadora.astro");
    const script = source.match(/<script define:vars=.*?>([\s\S]*?)<\/script>/)![1];
    const display = { value: "" };
    const result = { textContent: "0" as string | number };
    const handlers: Record<string, (event?: unknown) => void> = {};
    const context = { document: { getElementById: (id: string) => id === "display" ? display : id === "result" ? result
      : { addEventListener: (_event: string, handler: (event?: unknown) => void) => { handlers[id] = handler; } } }, error: "ERROR", invalidExpression: "INVALID" };
    runInNewContext(script, context);
    const calculate = (expression: string) => { display.value = expression; handlers.equalsBtn(); return result.textContent; };
    expect(calculate("12+8*3")).toBe(36);
    expect(calculate("12+8")).toBe(20);
    expect(display.value).toBe("12+8");
    handlers.clearBtn();
    expect(display.value).toBe("");
    expect(calculate("20*3")).toBe(60);
    expect(calculate("1.5+2.25")).toBe(3.75);
    expect(calculate("0.1+0.2")).toBe(0.30000000000000004);
    expect(calculate("12+")).toBe("INVALID");
    expect(calculate("1..5")).toBe("INVALID");
    expect(calculate("1/0")).toBe("ERROR");
    const keys = [...source.matchAll(/data-key="([^"]+)"/g)].map((match) => match[1]);
    expect(keys).toEqual(expect.arrayContaining(["+", "-", "*", "/", "."]));
    for (const unavailable of ["(", ")", "%"]) expect(keys).not.toContain(unavailable);
    expect(source).toMatch(/id="display"[\s\S]*?readonly/);
    for (const locale of SUPPORTED_LOCALES) {
      const content = getToolEditorialContent("calculadora", locale)!;
      expect(content.example.calculation).toContain("12+8*3 = 36");
      expect(content.notes.items.join(" ")).toContain("0.30000000000000004");
    }
  });

  it("matches the Unicode examples and avoids a universal compatibility claim", () => {
    expect(fontStyleIds).toHaveLength(19);
    expect(transformText("Ab9", "bold")).toBe("𝐀𝐛𝟗");
    expect(transformText("Olá, 42! 🧰", "bold")).toBe("𝐎𝐥á, 𝟒𝟐! 🧰");
    expect(transformText("A B", "underline")).toBe("A̲ B̲");
    expect(transformText("Ab9", "squared")).toBe("🄰b9");
    for (const locale of SUPPORTED_LOCALES) {
      const text = strings(getToolEditorialContent("gerador-de-letras-diferentes", locale)).join(" ");
      expect(text).toContain("Unicode");
      expect(text).toContain("𝐀𝐛𝟗");
      expect(text).toContain("19");
    }
  });

  it("matches duplicate weighting, single-occurrence removal, and history limits", () => {
    const parsed = normalizeParticipants(" Ana \nAna\nBruno\n\nCarla ");
    expect(parsed.participants).toEqual(["Ana", "Ana", "Bruno", "Carla"]);
    expect(parsed.count).toBe(4);
    expect(parsed.participants.filter((name) => name === "Ana").length / parsed.count).toBe(2 / 4);
    expect(removeOccurrence(parsed.participants, 1)).toEqual(["Ana", "Bruno", "Carla"]);
    expect(MAX_PARTICIPANTS).toBe(100);
    expect(normalizeParticipants(Array(101).fill("Ana").join("\n")).overLimit).toBe(true);
    expect(addWinnerToHistory(Array(10).fill("Ana"), "Bruno")).toHaveLength(10);
    const component = readSource("../components/tools/WheelOfNames.astro");
    expect(component).toContain("if (participants.length >= 2) spin()");
    for (const locale of SUPPORTED_LOCALES) {
      const text = strings(getToolEditorialContent("roleta-de-nomes", locale)).join(" ");
      expect(text).toContain("Ana: 2/4; Bruno: 1/4; Carla: 1/4");
      expect(text).toContain("100");
      expect(text).toMatch(/auditorias|audits|auditorías/);
      expect(text).toMatch(/promoções|promotions|promociones/);
    }
  });

  it("matches barcode formats, check digits, character rejection, and configured margins", () => {
    expect(barcodeFormats).toEqual(["CODE128", "EAN13", "EAN8", "UPC", "CODE39", "ITF14"]);
    expect(validateBarcode("KIT-042", "CODE128").valid).toBe(true);
    expect(calculateCheckDigit("400638133393")).toBe("1");
    expect(validateBarcode("400638133393", "EAN13").value).toBe("4006381333931");
    expect(validateBarcode("4006381333932", "EAN13").code).toBe("checkDigit");
    expect(validateBarcode("abc", "CODE39").valid).toBe(false);
    expect(validateBarcode("KIT_042", "CODE39").valid).toBe(false);
    const component = readSource("../components/tools/BarcodeGenerator.astro");
    expect(component).toContain("margin: 12");
    expect(component).toContain('min="1" max="4"');
    expect(component).toContain('min="40" max="180"');
    for (const locale of SUPPORTED_LOCALES) {
      const content = getToolEditorialContent("gerador-de-codigo-de-barras", locale)!;
      const text = strings(content).join(" ");
      for (const format of ["CODE128", "CODE39", "EAN-13", "EAN-8", "UPC-A", "ITF-14"]) expect(text).toContain(format);
      expect(text).toContain("GS1");
      expect(text.toLowerCase()).toContain("quiet zone");
      expect(content.example.calculation).toContain("400638133393 → 4006381333931");
      expect(content.relatedTools.items.map((tool) => tool.toolId)).not.toContain("leitor-de-qr-code");
    }
  });
});
