import { describe, expect, it } from "vitest";
import { ferramentas } from "./ferramentas";
import {
  getCanonicalUrl,
  getLocaleNavigationRoutes,
  getSiteAlternates,
  getToolLocaleRoute,
  getToolBreadcrumb,
  localeRouteConfig,
  normalizeSitePath,
  toSiteUrl,
} from "./locale-routes";
import { getFerramentaTranslation } from "./ferramentas";
import { institutionalKeys, institutionalRoutes } from "./institutional-content";

const homeAlternates = {
  en: "https://usevo.tools/",
  "pt-BR": "https://usevo.tools/pt-br",
  es: "https://usevo.tools/es",
  "x-default": "https://usevo.tools/",
};

const hasUnexpectedTrailingSlash = (url: string) => url !== "https://usevo.tools/" && url.endsWith("/");

describe("canonical URL policy", () => {
  it("keeps the root slash while normalizing non-root page paths", () => {
    expect(normalizeSitePath("/")).toBe("/");
    expect(normalizeSitePath("/pt-br/")).toBe("/pt-br");
    expect(normalizeSitePath("/en/tools/json-formatter/")).toBe("/en/tools/json-formatter");
    expect(normalizeSitePath("/ferramentas/base64.html")).toBe("/ferramentas/base64");
    expect(normalizeSitePath("/ferramentas/base64/?source=card#how-to")).toBe(
      "/ferramentas/base64?source=card#how-to",
    );
  });

  it("keeps navigation parameters but strips them from canonical URLs", () => {
    expect(toSiteUrl("/ferramentas/base64/?source=card#how-to")).toBe(
      "https://usevo.tools/ferramentas/base64?source=card#how-to",
    );
    expect(getCanonicalUrl("https://usevo.tools/ferramentas/base64/?source=card#how-to")).toBe(
      "https://usevo.tools/ferramentas/base64",
    );
  });
});

describe("international route architecture", () => {
  it("keeps all institutional routes canonical and localized", () => {
    expect(institutionalKeys).toHaveLength(5);
    for (const key of institutionalKeys) for (const route of Object.values(institutionalRoutes[key])) {
      expect(route).not.toBe("/en");
      expect(route).not.toMatch(/\/$/);
      expect(route).toMatch(/^\//);
    }
  });
  it.each(["/", "/pt-br/", "/es/", "/en/"])("uses normalized homepage alternates for %s", (pathname) => {
    expect(getSiteAlternates(pathname)).toEqual(homeAlternates);
  });

  it("uses canonical, locale-specific navigation routes", () => {
    expect(localeRouteConfig.en.home).toBe("/");
    expect(localeRouteConfig["pt-BR"].home).toBe("/pt-br");
    expect(localeRouteConfig.es.home).toBe("/es");
    expect(getLocaleNavigationRoutes("/")).toEqual({ "pt-BR": "/pt-br", en: "/", es: "/es" });
    expect(getLocaleNavigationRoutes("/en/tools/")).toEqual({
      "pt-BR": "/ferramentas",
      en: "/en/tools",
      es: "/es/herramientas",
    });
  });

  it("keeps all localized tool links and alternates canonical for the 23 published tools", () => {
    expect(ferramentas).toHaveLength(23);

    for (const tool of ferramentas) {
      for (const locale of ["pt-BR", "en", "es"] as const) {
        const route = getToolLocaleRoute(tool, locale)!;
        expect(route).not.toBe("/");
        expect(route).not.toMatch(/\/$/);
      }

      const alternates = getSiteAlternates(`${tool.url}/`);
      for (const url of Object.values(alternates)) {
        expect(hasUnexpectedTrailingSlash(url)).toBe(false);
      }
    }
  });

  it("builds localized three-item breadcrumbs from the same tool data used by pages", () => {
    const expected = {
      en: { label: "Breadcrumb", home: "/", tools: "/en/tools" },
      "pt-BR": { label: "Trilha de navegação", home: "/pt-br", tools: "/ferramentas" },
      es: { label: "Ruta de navegación", home: "/es", tools: "/es/herramientas" },
    } as const;
    for (const tool of ferramentas) for (const locale of ["pt-BR", "en", "es"] as const) {
      const breadcrumb = getToolBreadcrumb(getToolLocaleRoute(tool, locale)!, locale)!;
      expect(breadcrumb.label).toBe(expected[locale].label);
      expect(breadcrumb.items).toHaveLength(3);
      expect(breadcrumb.items[0]).toMatchObject({ name: locale === "en" ? "Home" : locale === "es" ? "Inicio" : "Início", href: expected[locale].home });
      expect(breadcrumb.items[1]).toMatchObject({ name: locale === "en" ? "Tools" : locale === "es" ? "Herramientas" : "Ferramentas", href: expected[locale].tools });
      expect(breadcrumb.items[2]).toEqual({ name: getFerramentaTranslation(tool, locale).title });
      expect(breadcrumb.items[0].href).not.toBe("/en");
    }
  });
});
