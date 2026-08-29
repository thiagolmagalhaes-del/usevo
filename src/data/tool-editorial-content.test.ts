import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ferramentas } from "./ferramentas";
import { getToolLocaleRoute } from "./locale-routes";
import {
  getEditorialRelatedTools,
  getToolEditorialContent,
  getToolEditorialContentByLocaleSlug,
  mergeToolEditorialContentCatalogs,
  toolEditorialContent,
} from "./tool-editorial-content";
import { calculatorsEditorialContent } from "./tool-editorial-content/calculators";
import { cltPjEditorialContent } from "./tool-editorial-content/clt-pj";
import { convertersEditorialContent } from "./tool-editorial-content/converters";
import { developmentEditorialContent } from "./tool-editorial-content/development";
import { filesAndImagesEditorialContent } from "./tool-editorial-content/files-and-images";
import { financeEditorialContent } from "./tool-editorial-content/finance";
import { securityEditorialContent } from "./tool-editorial-content/security";
import { textEditorialContent } from "./tool-editorial-content/text";
import type { Locale } from "./locales";

const percentageCalculatorId = "calculadora-de-porcentagem";
const editorialToolIds = [
  percentageCalculatorId,
  "calculadora",
  "calculadora-de-datas",
  "calculadora-de-idade",
  "conversor-de-unidades",
  "conversor-de-moedas",
  "contador-de-palavras",
  "comparador-de-texto",
  "gerador-de-senhas",
  "gerador-de-qr-code",
  "leitor-de-qr-code",
  "uuid-generator",
  "base64",
  "jpg-para-pdf",
  "comprimir-pdf",
  "juntar-pdf",
  "comprimir-imagem",
  "redimensionar-imagem",
  "formatador-de-json",
  "json-inspector",
  "url-encoder-decoder",
  "formatador-sql",
  "calculadora-clt-pj",
] as const;
const locales: Locale[] = ["pt-BR", "en", "es"];
const imageEditorialToolIds = ["comprimir-imagem", "redimensionar-imagem"] as const;
const pdfEditorialToolIds = ["jpg-para-pdf", "comprimir-pdf", "juntar-pdf"] as const;
const qrEditorialToolIds = ["gerador-de-qr-code", "leitor-de-qr-code"] as const;
const developmentPartTwoToolIds = ["url-encoder-decoder", "formatador-sql"] as const;
const cltPjEditorialToolIds = ["calculadora-clt-pj"] as const;

describe("tool editorial content", () => {
  it("selects complete editorial content by localized slug and locale without mixing languages", () => {
    const expectedHeadings: Record<(typeof editorialToolIds)[number], Record<Locale, string>> = {
      "calculadora-de-porcentagem": {
        "pt-BR": "Como usar a calculadora de porcentagem",
        en: "How to use the percentage calculator",
        es: "Cómo usar la calculadora de porcentajes",
      },
      calculadora: {
        "pt-BR": "Como usar a calculadora",
        en: "How to use the calculator",
        es: "Cómo usar la calculadora",
      },
      "calculadora-de-datas": {
        "pt-BR": "Como usar a calculadora de datas",
        en: "How to use the date calculator",
        es: "Cómo usar la calculadora de fechas",
      },
      "calculadora-de-idade": {
        "pt-BR": "Como usar a calculadora de idade",
        en: "How to use the age calculator",
        es: "Cómo usar la calculadora de edad",
      },
      "conversor-de-unidades": {
        "pt-BR": "Como usar o conversor de unidades",
        en: "How to use the unit converter",
        es: "Cómo usar el convertidor de unidades",
      },
      "conversor-de-moedas": {
        "pt-BR": "Como usar o conversor de moedas",
        en: "How to use the currency converter",
        es: "Cómo usar el convertidor de moneda",
      },
      "contador-de-palavras": {
        "pt-BR": "Como usar o contador de palavras",
        en: "How to use the word counter",
        es: "Cómo usar el contador de palabras",
      },
      "comparador-de-texto": {
        "pt-BR": "Como usar o comparador de texto",
        en: "How to use the text comparator",
        es: "Cómo usar el comparador de texto",
      },
      "gerador-de-senhas": { "pt-BR": "Como usar o gerador de senhas", en: "How to use the password generator", es: "Cómo usar el generador de contraseñas" },
      "gerador-de-qr-code": { "pt-BR": "Como criar um QR Code", en: "How to create a QR Code", es: "Como crear un código QR" },
      "leitor-de-qr-code": { "pt-BR": "Como ler QR Code pela câmera ou imagem", en: "How to scan a QR Code", es: "Como leer un código QR" },
      "uuid-generator": { "pt-BR": "Como usar o gerador de UUID", en: "How to use the UUID generator", es: "Cómo usar el generador de UUID" },
      base64: { "pt-BR": "Como usar Base64", en: "How to use Base64", es: "Cómo usar Base64" },
    };

    for (const toolId of editorialToolIds) {
      const tool = ferramentas.find((candidate) => candidate.id === toolId)!;
      for (const locale of locales) {
        const content = getToolEditorialContentByLocaleSlug(tool.localeSlugs[locale], locale);
        const expectedHeading = expectedHeadings[toolId as keyof typeof expectedHeadings]?.[locale];
        if (expectedHeading) expect(content?.howTo.title).toBe(expectedHeading);
        else expect(content?.howTo.title).toBeTruthy();
        expect(content?.howTo.steps).toHaveLength(3);
        expect(content?.faq.items.length).toBeGreaterThanOrEqual(3);
        expect(content?.faq.items.length).toBeLessThanOrEqual(4);
        expect(content?.relatedTools.items).toHaveLength(2);
      }
    }
  });

  it("keeps the public lookup API safe for absent content", () => {
    expect(getToolEditorialContent(undefined, "pt-BR")).toBeUndefined();
    expect(getEditorialRelatedTools(undefined, "pt-BR")).toEqual([]);
  });

  it("rejects duplicate editorial keys instead of overwriting existing content", () => {
    expect(() => mergeToolEditorialContentCatalogs(
      { base64: {} },
      { base64: {} },
    )).toThrow("Duplicate editorial content for tool: base64");
  });

  it("keeps the Phase 3E security wording aligned with the implemented behavior", () => {
    for (const locale of locales) {
      const password = getToolEditorialContent("gerador-de-senhas", locale)!;
      expect(password.notes.items.join(" ").toLowerCase()).toContain(locale === "en" ? "estimate" : locale === "es" ? "estimaci" : "estimativa");
      const uuid = getToolEditorialContent("uuid-generator", locale)!;
      expect(uuid.notes.items.join(" ")).toContain("crypto.randomUUID");
      expect(uuid.notes.items.join(" ")).toContain("Math.random");
      const base64 = getToolEditorialContent("base64", locale)!;
      expect(base64.notes.items.join(" ").toLowerCase()).toMatch(/text|texto/);
    }
  });

  it("resolves related tools to existing routes in the current locale", () => {
    for (const toolId of editorialToolIds) {
      for (const locale of locales) {
        const content = getToolEditorialContent(toolId, locale);
        const relatedTools = getEditorialRelatedTools(content, locale);

        expect(relatedTools).toHaveLength(2);
        for (const relatedTool of relatedTools) {
          const tool = ferramentas.find((candidate) => candidate.id === relatedTool.toolId);
          expect(tool).toBeDefined();
          expect(relatedTool.href).toBe(getToolLocaleRoute(tool!, locale));
        }
      }
    }
  });

  it("covers all 23 published tools with the expected 23 editorial records", () => {
    expect(new Set(Object.keys(toolEditorialContent))).toEqual(new Set(editorialToolIds));
    expect(Object.keys(toolEditorialContent)).toHaveLength(23);
    expect(new Set(ferramentas.map((tool) => tool.id))).toEqual(new Set(editorialToolIds));
    expect(ferramentas).toHaveLength(23);
    expect(Object.keys(filesAndImagesEditorialContent)).toHaveLength(7);
    expect(Object.keys(filesAndImagesEditorialContent)).toEqual(expect.arrayContaining(qrEditorialToolIds));
    expect(Object.keys(developmentEditorialContent)).toEqual(expect.arrayContaining(["base64", "uuid-generator", "formatador-de-json", "json-inspector", ...developmentPartTwoToolIds]));
    expect(Object.keys(cltPjEditorialContent)).toEqual(cltPjEditorialToolIds);
    expect(Object.keys(calculatorsEditorialContent)).toEqual(["calculadora", "calculadora-de-datas", "calculadora-de-idade"]);
    expect(Object.keys(financeEditorialContent)).toEqual([percentageCalculatorId, "conversor-de-moedas"]);
    expect(Object.keys(textEditorialContent)).toEqual(["contador-de-palavras", "comparador-de-texto"]);
    expect(Object.keys(convertersEditorialContent)).toEqual(["conversor-de-unidades"]);
    expect(Object.keys(securityEditorialContent)).toEqual(["gerador-de-senhas"]);
  });

  it("keeps the 22 editorial records that existed before the CLT/PJ addition", () => {
    const preservedToolIds = editorialToolIds.filter(
      (toolId) => !cltPjEditorialToolIds.includes(toolId as (typeof cltPjEditorialToolIds)[number]),
    );
    expect(preservedToolIds).toHaveLength(22);
    for (const toolId of preservedToolIds) {
      for (const locale of locales) {
        expect(getToolEditorialContent(toolId, locale)).toBeDefined();
      }
    }
  });

  it("loads Base64, UUID, JSON, URL, and SQL editorial records from the development catalog", () => {
    for (const toolId of ["base64", "uuid-generator", "formatador-de-json", "json-inspector", ...developmentPartTwoToolIds] as const) {
      expect(developmentEditorialContent[toolId]).toBeDefined();
      const content = getToolEditorialContent(toolId, "pt-BR");
      expect(content?.howTo.steps).toHaveLength(3);
      expect(content?.faq.items.length).toBeGreaterThanOrEqual(3);
      expect(content?.relatedTools.items).toHaveLength(2);
    }
    expect(getToolEditorialContent("formatador-de-json", "pt-BR")?.notes.items.join(" ")).toContain("JSON.parse");
    expect(getToolEditorialContent("json-inspector", "pt-BR")?.notes.items.join(" ")).toContain("árvore expansível");
    expect(getToolEditorialContent("url-encoder-decoder", "pt-BR")?.notes.items.join(" ")).toContain("encodeURIComponent");
    expect(getToolEditorialContent("formatador-sql", "pt-BR")?.notes.items.join(" ")).toContain("sql-formatter");
  });

  it("loads the complete CLT versus PJ editorial record from the CLT/PJ catalog", () => {
    const content = getToolEditorialContent("calculadora-clt-pj", "pt-BR");
    expect(cltPjEditorialContent["calculadora-clt-pj"]).toBeDefined();
    expect(content?.howTo.steps).toHaveLength(3);
    expect(content?.example.description).toBeTruthy();
    expect(content?.example.calculation).toContain("CLT");
    expect(content?.useCases.items.length).toBeGreaterThanOrEqual(3);
    expect(content?.notes.items.length).toBeGreaterThanOrEqual(5);
    expect(content?.faq.items.length).toBeGreaterThanOrEqual(3);
    expect(content?.relatedTools.items).toHaveLength(2);
    expect(content?.notes.items.join(" ")).toContain("INSS progressivo");
    expect(content?.notes.items.join(" ")).toContain("FGTS");
  });

  it("removes the obsolete scannerEditorial helper from the central catalog", () => {
    const centralCatalog = readFileSync(new URL("./tool-editorial-content.ts", import.meta.url), "utf8");
    expect(centralCatalog).not.toContain("scannerEditorial");
    expect(centralCatalog).not.toContain("'uuid-generator':{'pt-BR':devEditorial");
    expect(centralCatalog).not.toContain("existingToolEditorialContent");
    expect(centralCatalog).not.toContain('"calculadora-de-porcentagem": {');
    expect(centralCatalog).toContain("calculatorsEditorialContent");
    expect(centralCatalog).toContain("financeEditorialContent");
    expect(centralCatalog).toContain("textEditorialContent");
    expect(centralCatalog).toContain("convertersEditorialContent");
    expect(centralCatalog).toContain("securityEditorialContent");
  });

  it("loads complete QR Code editorial records from the files-and-images catalog", () => {
    for (const toolId of qrEditorialToolIds) {
      const content = getToolEditorialContent(toolId, "pt-BR");
      expect(filesAndImagesEditorialContent[toolId]).toBeDefined();
      expect(content?.howTo.steps).toHaveLength(3);
      expect(content?.example.description).toBeTruthy();
      expect(content?.useCases.items.length).toBeGreaterThanOrEqual(3);
      expect(content?.notes.items.length).toBeGreaterThanOrEqual(4);
      expect(content?.faq.items.length).toBeGreaterThanOrEqual(3);
      expect(content?.relatedTools.items).toHaveLength(2);
      for (const relatedTool of content?.relatedTools.items ?? []) {
        expect(ferramentas.some((tool) => tool.id === relatedTool.toolId)).toBe(true);
      }
    }

    expect(getToolEditorialContent("gerador-de-qr-code", "pt-BR")?.notes.items.join(" ")).toContain("qrcode");
    expect(getToolEditorialContent("leitor-de-qr-code", "pt-BR")?.notes.items.join(" ")).toContain("BarcodeDetector");
  });

  it("provides complete editorial records for the three PDF tools", () => {
    for (const toolId of pdfEditorialToolIds) {
      const content = getToolEditorialContent(toolId, "pt-BR");
      expect(content).toBeDefined();
      expect(content?.howTo.steps).toHaveLength(3);
      expect(content?.example.description).toBeTruthy();
      expect(content?.example.calculation).toBeTruthy();
      expect(content?.example.result).toBeTruthy();
      expect(content?.useCases.items.length).toBeGreaterThanOrEqual(3);
      expect(content?.notes.items.length).toBeGreaterThanOrEqual(4);
      expect(content?.faq.items.length).toBeGreaterThanOrEqual(3);
      expect(content?.relatedTools.items).toHaveLength(2);
      for (const relatedTool of content?.relatedTools.items ?? []) {
        expect(ferramentas.some((tool) => tool.id === relatedTool.toolId)).toBe(true);
      }
    }

    expect(getToolEditorialContent("jpg-para-pdf", "pt-BR")?.notes.items.join(" ")).toContain("não digitaliza");
    expect(getToolEditorialContent("comprimir-pdf", "pt-BR")?.notes.items.join(" ")).toContain("pode ficar menor, igual ou maior");
    expect(getToolEditorialContent("juntar-pdf", "pt-BR")?.notes.items.join(" ")).toContain("ordem da lista");
  });

  it("provides complete, distinct editorial records for the two image tools", () => {
    for (const toolId of imageEditorialToolIds) {
      const content = getToolEditorialContent(toolId, "pt-BR");
      expect(content).toBeDefined();
      expect(content?.howTo.steps).toHaveLength(3);
      expect(content?.example.description).toBeTruthy();
      expect(content?.example.calculation).toBeTruthy();
      expect(content?.example.result).toBeTruthy();
      expect(content?.useCases.items.length).toBeGreaterThanOrEqual(3);
      expect(content?.notes.items.length).toBeGreaterThanOrEqual(4);
      expect(content?.faq.items.length).toBeGreaterThanOrEqual(3);
      expect(content?.relatedTools.items).toHaveLength(2);
      for (const relatedTool of content?.relatedTools.items ?? []) {
        expect(ferramentas.some((tool) => tool.id === relatedTool.toolId)).toBe(true);
      }
    }

    const compressor = getToolEditorialContent("comprimir-imagem", "pt-BR")!;
    const resizer = getToolEditorialContent("redimensionar-imagem", "pt-BR")!;
    expect(compressor.howTo.title.toLowerCase()).toContain("tamanho");
    expect(resizer.notes.items.join(" ").toLowerCase()).toContain("dimensões em pixels");
  });

  it("renders editorial sections only in the approved templates without adding H1 elements", () => {
    const pages = [
      "../pages/ferramentas/calculadora-de-porcentagem.astro",
      "../pages/ferramentas/calculadora.astro",
      "../pages/ferramentas/calculadora-de-datas.astro",
      "../pages/ferramentas/calculadora-de-idade.astro",
      "../pages/ferramentas/conversor-de-unidades.astro",
      "../pages/ferramentas/conversor-de-moedas.astro",
      "../pages/ferramentas/contador-de-palavras.astro",
      "../pages/ferramentas/comparador-de-texto.astro",
      "../pages/ferramentas/gerador-de-senhas.astro",
      "../pages/ferramentas/gerador-de-qr-code.astro",
      "../pages/ferramentas/leitor-de-qr-code.astro",
      "../pages/ferramentas/uuid-generator.astro",
      "../pages/ferramentas/base64.astro",
    ].map((path) => readFileSync(new URL(path, import.meta.url), "utf8"));
    const component = readFileSync(
      new URL("../components/tools/ToolEditorialContent.astro", import.meta.url),
      "utf8",
    );

    expect(pages[0].match(/<h1(?:\s|>)/g)).toHaveLength(1);
    for (const page of pages) expect(page).toContain("<ToolEditorialContent");
    expect(component).toContain("{content && (");
    expect(component.match(/<h1(?:\s|>)/g)).toBeNull();
    expect(component.match(/<h2(?:\s|>)/g)?.length).toBeGreaterThan(0);
    expect(component.match(/<h3(?:\s|>)/g)?.length).toBeGreaterThan(0);
  });
});
