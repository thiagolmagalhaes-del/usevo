import { type Locale } from "./locales";
import { ferramentas, getFerramentaByPath, getFerramentaTranslation } from "./ferramentas";
import { institutionalKeys, institutionalRoutes } from "./institutional-content";

export const SITE_ORIGIN = "https://usevo.tools";

export type Hreflang = Locale | "x-default";
export type HreflangAlternates = Partial<Record<Hreflang, string>>;

/**
 * Completes a localized alternate set for indexable pages. The English URL is
 * the site's default experience, so it is also the x-default target.
 */
export const getHreflangAlternates = (
  alternates: HreflangAlternates | undefined,
  robots = "index, follow",
): HreflangAlternates => {
  if (!alternates || robots.toLowerCase().includes("noindex")) return {};

  const { "x-default": _existingDefault, ...localizedAlternates } = alternates;
  return localizedAlternates.en
    ? { ...localizedAlternates, "x-default": localizedAlternates.en }
    : localizedAlternates;
};

const splitPathSuffix = (value: string) => {
  const match = value.match(/^([^?#]*)(.*)$/);
  return [match?.[1] ?? value, match?.[2] ?? ""] as const;
};

/**
 * Normalizes only application page paths. It preserves query strings and
 * fragments for navigation, while canonical URLs intentionally remove both.
 */
export const normalizeSitePath = (value: string) => {
  const [path, suffix] = splitPathSuffix(value);
  const withoutOutputExtension = path
    .replace(/\/index\.html$/i, "")
    .replace(/\.html$/i, "");
  const normalizedPath = withoutOutputExtension.replace(/\/+$/, "") || "/";
  return `${normalizedPath}${suffix}`;
};

export const toSiteUrl = (path: string) => new URL(normalizeSitePath(path), SITE_ORIGIN).href;

export const getCanonicalUrl = (value: string) => {
  const url = new URL(value, SITE_ORIGIN);
  if (url.origin !== SITE_ORIGIN) return url.href;

  url.pathname = normalizeSitePath(url.pathname);
  url.search = "";
  url.hash = "";
  return url.href;
};

export const localeRouteConfig = {
  en: {
    home: "/",
    tools: "/en/tools",
    categories: "/en/categories",
  },
  "pt-BR": {
    home: "/pt-br",
    tools: "/ferramentas",
    categories: "/categorias",
  },
  es: {
    home: "/es",
    tools: "/es/herramientas",
    categories: "/es/categorias",
  },
} as const;

const asLocaleSlug = (tool: (typeof ferramentas)[number], locale: Locale) => {
  if (locale === "pt-BR") return tool.slug;
  const slug = tool.localeSlugs?.[locale];
  return typeof slug === "string" && slug.trim() ? slug.trim() : undefined;
};

export const getToolLocaleRoute = (tool: (typeof ferramentas)[number], locale: Locale) => {
  if (locale === "pt-BR") return normalizeSitePath(tool.url);

  const slug = asLocaleSlug(tool, locale);
  if (!slug) return undefined;

  return locale === "en" ? `/en/tools/${slug}` : `/es/herramientas/${slug}`;
};

export const getToolLocaleRouteById = (toolId: string, locale: Locale) => {
  const tool = ferramentas.find((candidate) => candidate.id === toolId);
  return tool ? getToolLocaleRoute(tool, locale) : undefined;
};

export type ToolBreadcrumbItem = {
  name: string;
  href?: string;
  url?: string;
};

export type ToolBreadcrumb = {
  label: string;
  items: readonly [ToolBreadcrumbItem, ToolBreadcrumbItem, ToolBreadcrumbItem];
};

const breadcrumbCopy = {
  en: { label: "Breadcrumb", home: "Home", tools: "Tools" },
  "pt-BR": { label: "Trilha de navegação", home: "Início", tools: "Ferramentas" },
  es: { label: "Ruta de navegación", home: "Inicio", tools: "Herramientas" },
} as const;

const getToolForLocalePath = (pathname: string, locale: Locale) => {
  const normalizedPath = normalizeSitePath(pathname).split(/[?#]/, 1)[0] || "/";
  if (locale === "pt-BR") return getFerramentaByPath(normalizedPath);

  const prefix = locale === "en" ? "/en/tools/" : "/es/herramientas/";
  if (!normalizedPath.startsWith(prefix)) return undefined;
  return resolveToolByLocaleSlug(normalizedPath.slice(prefix.length), locale);
};

export const getToolBreadcrumb = (pathname: string, locale: Locale): ToolBreadcrumb | undefined => {
  const tool = getToolForLocalePath(pathname, locale);
  if (!tool) return undefined;

  const copy = breadcrumbCopy[locale];
  const homeRoute = localeRouteConfig[locale].home;
  const toolsRoute = localeRouteConfig[locale].tools;
  return {
    label: copy.label,
    items: [
      { name: copy.home, href: homeRoute, url: toSiteUrl(homeRoute) },
      { name: copy.tools, href: toolsRoute, url: toSiteUrl(toolsRoute) },
      { name: getFerramentaTranslation(tool, locale).title },
    ],
  };
};

export const getCategoryLocaleRoute = (categoryKey: string, locale: Locale) => {
  if (locale === "pt-BR") return "/categorias";
  return locale === "en" ? "/en/categories" : "/es/categorias";
};

export const resolveToolByLocaleSlug = (slug: string | undefined, locale: Locale) => {
  if (!slug) return undefined;
  return ferramentas.find((tool) => tool.localeSlugs[locale] === slug);
};

export const getSiteAlternates = (pathname: string) => {
  const normalizedPath = normalizeSitePath(pathname).split(/[?#]/, 1)[0] || "/";
  for (const key of institutionalKeys) {
    if (Object.values(institutionalRoutes[key]).includes(normalizedPath)) {
      return {
        en: toSiteUrl(institutionalRoutes[key].en),
        "pt-BR": toSiteUrl(institutionalRoutes[key]["pt-BR"]),
        es: toSiteUrl(institutionalRoutes[key].es),
      };
    }
  }
  const homeAlternates = {
    en: toSiteUrl("/"),
    "pt-BR": toSiteUrl("/pt-br"),
    es: toSiteUrl("/es"),
    "x-default": toSiteUrl("/"),
  };

  if (["/", "/en", "/pt-br", "/es"].includes(normalizedPath)) return homeAlternates;

  if (["/ferramentas", "/en/tools", "/es/herramientas"].includes(normalizedPath)) {
    return {
      "pt-BR": toSiteUrl("/ferramentas"),
      en: toSiteUrl("/en/tools"),
      es: toSiteUrl("/es/herramientas"),
    };
  }

  if (["/categorias", "/en/categories", "/es/categorias"].includes(normalizedPath)) {
    return {
      "pt-BR": toSiteUrl("/categorias"),
      en: toSiteUrl("/en/categories"),
      es: toSiteUrl("/es/categorias"),
    };
  }

  if (normalizedPath.startsWith("/ferramentas/")) {
    const tool = getFerramentaByPath(normalizedPath);
    if (tool) {
      return {
        "pt-BR": toSiteUrl(tool.url),
        en: toSiteUrl(`/en/tools/${tool.localeSlugs.en}`),
        es: toSiteUrl(`/es/herramientas/${tool.localeSlugs.es}`),
      };
    }
    return homeAlternates;
  }

  const toolForPath = (prefix: "/en/tools/" | "/es/herramientas/") => {
    const suffix = normalizedPath.startsWith(prefix) ? normalizedPath.slice(prefix.length) : "";
    if (!suffix) return undefined;
    return prefix === "/en/tools/"
      ? resolveToolByLocaleSlug(suffix, "en")
      : resolveToolByLocaleSlug(suffix, "es");
  };

  if (normalizedPath.startsWith("/en/tools/")) {
    const tool = toolForPath("/en/tools/");
    if (tool) {
      return {
        en: toSiteUrl(normalizedPath),
        "pt-BR": toSiteUrl(tool.url),
        es: toSiteUrl(`/es/herramientas/${tool.localeSlugs.es}`),
      };
    }
    return { en: toSiteUrl(normalizedPath), "pt-BR": toSiteUrl("/"), es: toSiteUrl("/es") };
  }

  if (normalizedPath.startsWith("/es/herramientas/")) {
    const tool = toolForPath("/es/herramientas/");
    if (tool) {
      return {
        en: toSiteUrl(`/en/tools/${tool.localeSlugs.en}`),
        "pt-BR": toSiteUrl(tool.url),
        es: toSiteUrl(normalizedPath),
      };
    }
    return { en: toSiteUrl("/"), "pt-BR": toSiteUrl("/"), es: toSiteUrl(normalizedPath) };
  }

  if (normalizedPath.startsWith("/en/categories/")) {
    return {
      en: toSiteUrl(normalizedPath),
      "pt-BR": toSiteUrl("/categorias"),
      es: toSiteUrl("/es/categorias"),
    };
  }

  if (normalizedPath.startsWith("/es/categorias/")) {
    return {
      en: toSiteUrl("/en/categories"),
      "pt-BR": toSiteUrl("/categorias"),
      es: toSiteUrl(normalizedPath),
    };
  }

  return homeAlternates;
};

export const getLocaleNavigationRoutes = (pathname: string) => {
  const normalizedPath = normalizeSitePath(pathname).split(/[?#]/, 1)[0] || "/";

  if (["/", "/en", "/pt-br", "/es"].includes(normalizedPath)) {
    return {
      "pt-BR": localeRouteConfig["pt-BR"].home,
      en: localeRouteConfig.en.home,
      es: localeRouteConfig.es.home,
    };
  }

  if (["/ferramentas", "/en/tools", "/es/herramientas"].includes(normalizedPath)) {
    return {
      "pt-BR": localeRouteConfig["pt-BR"].tools,
      en: localeRouteConfig.en.tools,
      es: localeRouteConfig.es.tools,
    };
  }

  if (["/categorias", "/en/categories", "/es/categorias"].includes(normalizedPath)) {
    return {
      "pt-BR": localeRouteConfig["pt-BR"].categories,
      en: localeRouteConfig.en.categories,
      es: localeRouteConfig.es.categories,
    };
  }

  return getSiteAlternates(normalizedPath);
};
