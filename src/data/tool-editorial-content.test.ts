import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ferramentas } from "./ferramentas";
import { getToolLocaleRoute } from "./locale-routes";
import {
  getEditorialRelatedTools,
  getToolEditorialContent,
  getToolEditorialContentByLocaleSlug,
  toolEditorialContent,
} from "./tool-editorial-content";
import type { Locale } from "./locales";

const percentageCalculatorId = "calculadora-de-porcentagem";
const editorialToolIds = [
  percentageCalculatorId,
  "calculadora",
  "calculadora-de-datas",
  "calculadora-de-idade",
] as const;
const locales: Locale[] = ["pt-BR", "en", "es"];

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
    };

    for (const toolId of editorialToolIds) {
      const tool = ferramentas.find((candidate) => candidate.id === toolId)!;
      for (const locale of locales) {
        const content = getToolEditorialContentByLocaleSlug(tool.localeSlugs[locale], locale);
        expect(content?.howTo.title).toBe(expectedHeadings[toolId][locale]);
        expect(content?.howTo.steps).toHaveLength(3);
        expect(content?.faq.items.length).toBeGreaterThanOrEqual(3);
        expect(content?.faq.items.length).toBeLessThanOrEqual(4);
        expect(content?.relatedTools.items).toHaveLength(2);
      }
    }
  });

  it("does not provide editorial content or related links for tools without data", () => {
    const content = getToolEditorialContent("conversor-de-unidades", "pt-BR");
    expect(content).toBeUndefined();
    expect(getEditorialRelatedTools(content, "pt-BR")).toEqual([]);
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

  it("keeps the reusable store limited to the approved editorial tools", () => {
    expect(Object.keys(toolEditorialContent)).toEqual(editorialToolIds);
  });

  it("renders editorial sections only in the approved templates without adding H1 elements", () => {
    const pages = [
      "../pages/ferramentas/calculadora-de-porcentagem.astro",
      "../pages/ferramentas/calculadora.astro",
      "../pages/ferramentas/calculadora-de-datas.astro",
      "../pages/ferramentas/calculadora-de-idade.astro",
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
