import { describe, expect, it } from "vitest";
import { getLocaleNavigationRoutes, getSiteAlternates, localeRouteConfig } from "./locale-routes";

const homeAlternates = {
  en: "https://usevo.tools/",
  "pt-BR": "https://usevo.tools/pt-br/",
  es: "https://usevo.tools/es/",
  "x-default": "https://usevo.tools/",
};

describe("international homepage architecture", () => {
  it.each(["/", "/pt-br/", "/es/"])("uses reciprocal homepage alternates for %s", (pathname) => {
    expect(getSiteAlternates(pathname)).toEqual(homeAlternates);
  });

  it("keeps the English redirect path mapped to the canonical homepage alternates", () => {
    expect(getSiteAlternates("/en/")).toEqual(homeAlternates);
  });

  it("uses locale-specific homepage links in the primary navigation", () => {
    expect(localeRouteConfig.en.home).toBe("/");
    expect(localeRouteConfig["pt-BR"].home).toBe("/pt-br/");
    expect(localeRouteConfig.es.home).toBe("/es/");
    expect(getLocaleNavigationRoutes("/")).toEqual({ "pt-BR": "/pt-br/", en: "/", es: "/es/" });
  });
});
