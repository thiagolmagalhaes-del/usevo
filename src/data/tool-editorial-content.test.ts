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
const locales: Locale[] = ["pt-BR", "en", "es"];

describe("tool editorial content", () => {
  it("selects the percentage-calculator content by localized slug and locale without mixing languages", () => {
    const expectedHeadings: Record<Locale, string> = {
      "pt-BR": "Como usar a calculadora de porcentagem",
      en: "How to use the percentage calculator",
      es: "Cómo usar la calculadora de porcentajes",
    };

    for (const locale of locales) {
      const tool = ferramentas.find((candidate) => candidate.id === percentageCalculatorId)!;
      const content = getToolEditorialContentByLocaleSlug(tool.localeSlugs[locale], locale);
      expect(content?.howTo.title).toBe(expectedHeadings[locale]);
      expect(content?.howTo.steps).toHaveLength(3);
      expect(content?.faq.items).toHaveLength(4);
      expect(content?.howTo.title).not.toContain(
        locale === "en" ? "Cómo" : "How to use",
      );
    }
  });

  it("does not provide editorial content or related links for tools without data", () => {
    const content = getToolEditorialContent("calculadora", "pt-BR");
    expect(content).toBeUndefined();
    expect(getEditorialRelatedTools(content, "pt-BR")).toEqual([]);
  });

  it("resolves related tools to existing routes in the current locale", () => {
    for (const locale of locales) {
      const content = getToolEditorialContent(percentageCalculatorId, locale);
      const relatedTools = getEditorialRelatedTools(content, locale);

      expect(relatedTools).toHaveLength(2);
      for (const relatedTool of relatedTools) {
        const tool = ferramentas.find((candidate) => candidate.id === relatedTool.toolId);
        expect(tool).toBeDefined();
        expect(relatedTool.href).toBe(getToolLocaleRoute(tool!, locale));
      }
    }
  });

  it("keeps the reusable store limited to the pilot tool", () => {
    expect(Object.keys(toolEditorialContent)).toEqual([percentageCalculatorId]);
  });

  it("keeps the page to one H1 and renders editorial sections only when content exists", () => {
    const page = readFileSync(
      new URL("../pages/ferramentas/calculadora-de-porcentagem.astro", import.meta.url),
      "utf8",
    );
    const component = readFileSync(
      new URL("../components/tools/ToolEditorialContent.astro", import.meta.url),
      "utf8",
    );

    expect(page.match(/<h1(?:\s|>)/g)).toHaveLength(1);
    expect(page).toContain("<ToolEditorialContent");
    expect(component).toContain("{content && (");
    expect(component.match(/<h1(?:\s|>)/g)).toBeNull();
    expect(component.match(/<h2(?:\s|>)/g)?.length).toBeGreaterThan(0);
    expect(component.match(/<h3(?:\s|>)/g)?.length).toBeGreaterThan(0);
  });
});
