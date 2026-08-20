import { type Locale } from "./locales";
import { ferramentas, getFerramentaByPath } from "./ferramentas";

export const localeRouteConfig = {
  en: {
    home: "/en/",
    tools: "/en/tools/",
    categories: "/en/categories/",
  },
  "pt-BR": {
    home: "/",
    tools: "/ferramentas/",
    categories: "/categorias/",
  },
  es: {
    home: "/es/",
    tools: "/es/herramientas/",
    categories: "/es/categorias/",
  },
} as const;

const asLocaleSlug = (tool: (typeof ferramentas)[number], locale: Locale) => {
  if (locale === "pt-BR") return tool.slug;
  const slug = tool.localeSlugs?.[locale];
  return typeof slug === "string" && slug.trim() ? slug.trim() : undefined;
};

export const getToolLocaleRoute = (tool: (typeof ferramentas)[number], locale: Locale) => {
  if (locale === "pt-BR") return tool.url;

  const slug = asLocaleSlug(tool, locale);
  if (!slug) {
    return undefined;
  }

  return locale === "en" ? `/en/tools/${slug}/` : `/es/herramientas/${slug}/`;
};

export const getCategoryLocaleRoute = (categoryKey: string, locale: Locale) => {
  if (locale === "pt-BR") return "/categorias/";
  return locale === "en" ? `/en/categories/` : `/es/categorias/`;
};

export const resolveToolByLocaleSlug = (slug: string | undefined, locale: Locale) => {
  if (!slug) return undefined;
  return ferramentas.find((tool) => tool.localeSlugs[locale] === slug);
};

const withTrailingSlash = (value: string) => `${value.replace(/\/+$/, "")}/`;

export const getSiteAlternates = (pathname: string) => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const localeMap: Record<string, string> = {
    en: "https://usevo.tools/en/",
    "pt-BR": "https://usevo.tools",
    es: "https://usevo.tools/es/",
  };

  if (normalizedPath === "/") {
    return localeMap;
  }

  if (normalizedPath.startsWith("/ferramentas/")) {
    const tool = getFerramentaByPath(normalizedPath);
    if (tool) {
      return {
        "pt-BR": `https://usevo.tools${withTrailingSlash(tool.url)}`,
        en: `https://usevo.tools/en/tools/${tool.localeSlugs.en}/`,
        es: `https://usevo.tools/es/herramientas/${tool.localeSlugs.es}/`,
      };
    }

    return localeMap;
  }

  const toolForPath = (prefix: "/en/tools/" | "/es/herramientas/") => {
    const suffix = normalizedPath.startsWith(prefix)
      ? normalizedPath.slice(prefix.length)
      : "";
    if (!suffix) return undefined;

    const tool = prefix === "/en/tools/"
      ? resolveToolByLocaleSlug(suffix, "en")
      : resolveToolByLocaleSlug(suffix, "es");

    return tool;
  };

  if (normalizedPath.startsWith("/en/tools/")) {
    const tool = toolForPath("/en/tools/");
    if (tool) {
      return {
        en: `https://usevo.tools${withTrailingSlash(normalizedPath)}`,
        "pt-BR": `https://usevo.tools${withTrailingSlash(tool.url)}`,
        es: `https://usevo.tools/es/herramientas/${tool.localeSlugs.es}/`,
      };
    }
    return {
      en: `https://usevo.tools${normalizedPath}`,
      "pt-BR": "https://usevo.tools",
      es: "https://usevo.tools/es/",
    };
  }

  if (normalizedPath.startsWith("/es/herramientas/")) {
    const tool = toolForPath("/es/herramientas/");
    if (tool) {
      return {
        en: `https://usevo.tools/en/tools/${tool.localeSlugs.en}/`,
        "pt-BR": `https://usevo.tools${withTrailingSlash(tool.url)}`,
        es: `https://usevo.tools${withTrailingSlash(normalizedPath)}`,
      };
    }
    return {
      en: "https://usevo.tools/en/",
      "pt-BR": "https://usevo.tools",
      es: `https://usevo.tools${normalizedPath}`,
    };
  }

  if (normalizedPath.startsWith("/en/categories/")) {
    return {
      en: `https://usevo.tools${normalizedPath}`,
      "pt-BR": "https://usevo.tools/categorias/",
      es: "https://usevo.tools/es/categorias/",
    };
  }

  if (normalizedPath.startsWith("/es/categorias/")) {
    return {
      en: "https://usevo.tools/en/categories/",
      "pt-BR": "https://usevo.tools/categorias/",
      es: `https://usevo.tools${normalizedPath}`,
    };
  }

  return localeMap;
};
