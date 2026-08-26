import { describe, expect, it } from "vitest";
import { ferramentas, getFerramentaTranslation } from "./ferramentas";
import { getToolLocaleRoute } from "./locale-routes";

const expectedTools = [
  {
    id: "calculadora-de-datas",
    routes: {
      "pt-BR": "/ferramentas/calculadora-de-datas",
      en: "/en/tools/date-calculator/",
      es: "/es/herramientas/calculadora-de-fechas/",
    },
    titles: { "pt-BR": "Calculadora de datas", en: "Date Calculator", es: "Calculadora de fechas" },
  },
  {
    id: "calculadora-de-idade",
    routes: {
      "pt-BR": "/ferramentas/calculadora-de-idade",
      en: "/en/tools/age-calculator/",
      es: "/es/herramientas/calculadora-de-edad/",
    },
    titles: { "pt-BR": "Calculadora de idade", en: "Age Calculator", es: "Calculadora de edad" },
  },
] as const;

describe("date tool catalog routes and translations", () => {
  it.each(expectedTools)("registers $id in PT-BR, EN, and ES", ({ id, routes, titles }) => {
    const tool = ferramentas.find((item) => item.id === id);
    expect(tool).toBeDefined();
    if (!tool) return;

    expect(tool.categoryKey).toBe("calculadoras");
    expect(tool.url).toBe(routes["pt-BR"]);
    for (const locale of ["pt-BR", "en", "es"] as const) {
      expect(getToolLocaleRoute(tool, locale)).toBe(routes[locale]);
      expect(getFerramentaTranslation(tool, locale).title).toBe(titles[locale]);
      expect(getFerramentaTranslation(tool, locale).description).not.toBe("");
    }
  });
});
