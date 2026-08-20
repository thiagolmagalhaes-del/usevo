import fs from "node:fs";
import path from "node:path";

import { ferramentas, type Ferramenta } from "./ferramentas.ts";

export type CatalogValidationIssue = {
  type:
    | "duplicate-id"
    | "duplicate-slug"
    | "duplicate-url"
    | "duplicate-locale-slug"
    | "missing-category-key"
    | "invalid-status"
    | "invalid-locale-slug"
    | "missing-page";
  message: string;
  tool?: string;
};

export type CatalogValidationResult = {
  errors: CatalogValidationIssue[];
  warnings: CatalogValidationIssue[];
};

const normalizeUrl = (value: string) => value.trim().replace(/\/+$/, "") || "/";

const normalizeRoute = (value: string) => {
  const normalized = normalizeUrl(value);
  return normalized.startsWith("/ferramentas/") ? normalized.replace(/^\/ferramentas\//, "") : normalized.replace(/^\//, "");
};

const collectToolRoutes = (pagesDir: string): Set<string> => {
  const routes = new Set<string>();

  if (!fs.existsSync(pagesDir)) {
    return routes;
  }

  const walk = (currentDir: string) => {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.name.endsWith(".astro")) {
        const route = path.relative(pagesDir, fullPath)
          .replace(/\\/g, "/")
          .replace(/\/index\.astro$/, "")
          .replace(/\.astro$/, "");

        if (route && route !== "index") {
          routes.add(route);
        }
      }
    }
  };

  walk(pagesDir);
  return routes;
};

export const validateFerramentasCatalog = (
  items: Ferramenta[],
  pagesDir = path.join(process.cwd(), "src", "pages", "ferramentas"),
): CatalogValidationResult => {
  const errors: CatalogValidationIssue[] = [];
  const warnings: CatalogValidationIssue[] = [];

  const duplicateIdMap = new Map<string, Ferramenta[]>();
  const duplicateSlugMap = new Map<string, Ferramenta[]>();
  const duplicateUrlMap = new Map<string, Ferramenta[]>();
  const duplicateLocaleSlugMap = new Map<string, Ferramenta[]>();

  for (const item of items) {
    if (!item.id || !item.id.trim()) {
      errors.push({
        type: "duplicate-id",
        message: `Ferramenta sem id válido: ${item.nome ?? "Sem nome"}`,
        tool: item.nome,
      });
    }

    if (!item.slug || !item.slug.trim()) {
      errors.push({
        type: "duplicate-slug",
        message: `Ferramenta sem slug válido: ${item.nome ?? "Sem nome"}`,
        tool: item.nome,
      });
    }

    if (!item.categoryKey || !item.categoryKey.trim()) {
      errors.push({
        type: "missing-category-key",
        message: `CategoryKey ausente ou inválido para: ${item.nome}`,
        tool: item.nome,
      });
    }

    if (item.status !== "active") {
      warnings.push({
        type: "invalid-status",
        message: `Status inesperado para ${item.nome}: ${item.status}`,
        tool: item.nome,
      });
    }

    if (item.enabled !== true && item.status === "active") {
      errors.push({
        type: "invalid-status",
        message: `Ferramenta ativa com enabled !== true: ${item.nome}`,
        tool: item.nome,
      });
    }

    if (!duplicateIdMap.has(item.id)) duplicateIdMap.set(item.id, []);
    duplicateIdMap.get(item.id)!.push(item);

    if (!duplicateSlugMap.has(item.slug)) duplicateSlugMap.set(item.slug, []);
    duplicateSlugMap.get(item.slug)!.push(item);

    if (!duplicateUrlMap.has(item.url)) duplicateUrlMap.set(item.url, []);
    duplicateUrlMap.get(item.url)!.push(item);

    const localeEntries = Object.entries(item.localeSlugs ?? {});
    if (!localeEntries.length) {
      errors.push({
        type: "invalid-locale-slug",
        message: `localeSlugs ausente para: ${item.nome}`,
        tool: item.nome,
      });
    }

    for (const [locale, slug] of localeEntries) {
      if (!slug || !slug.trim()) {
        errors.push({
          type: "invalid-locale-slug",
          message: `Slug internacional ausente para ${item.nome} (${locale})`,
          tool: item.nome,
        });
        continue;
      }

      if (locale === "pt-BR" && slug !== item.slug) {
        errors.push({
          type: "invalid-locale-slug",
          message: `localeSlugs["pt-BR"] deve preservar o slug atual de ${item.nome}: ${item.slug}`,
          tool: item.nome,
        });
      }

      const invalidLocaleFormat =
        slug.startsWith("-") ||
        slug.endsWith("-") ||
        slug.includes("--") ||
        /[A-Z]/.test(slug) ||
        /[^a-z0-9-]/.test(slug) ||
        slug.includes("/") ||
        slug.includes("?") ||
        slug.includes("#");

      if (invalidLocaleFormat) {
        errors.push({
          type: "invalid-locale-slug",
          message: `Slug internacional inválido para ${item.nome} (${locale}): ${slug}`,
          tool: item.nome,
        });
      }

      const key = `${locale}:${slug}`;
      if (!duplicateLocaleSlugMap.has(key)) duplicateLocaleSlugMap.set(key, []);
      duplicateLocaleSlugMap.get(key)!.push(item);
    }
  }

  for (const [id, toolMatches] of duplicateIdMap.entries()) {
    if (toolMatches.length > 1) {
      errors.push({
        type: "duplicate-id",
        message: `IDs duplicados detectados: ${id} (${toolMatches.map((tool) => tool.nome).join(", ")})`,
        tool: id,
      });
    }
  }

  for (const [slug, toolMatches] of duplicateSlugMap.entries()) {
    if (toolMatches.length > 1) {
      errors.push({
        type: "duplicate-slug",
        message: `Slugs duplicados detectados: ${slug} (${toolMatches.map((tool) => tool.nome).join(", ")})`,
        tool: slug,
      });
    }
  }

  for (const [url, toolMatches] of duplicateUrlMap.entries()) {
    if (toolMatches.length > 1) {
      errors.push({
        type: "duplicate-url",
        message: `URLs duplicadas detectadas: ${url} (${toolMatches.map((tool) => tool.nome).join(", ")})`,
        tool: url,
      });
    }
  }

  for (const [key, toolMatches] of duplicateLocaleSlugMap.entries()) {
    if (toolMatches.length > 1) {
      const [locale, slug] = key.split(":");
      errors.push({
        type: "duplicate-locale-slug",
        message: `Slug duplicado em ${locale}: ${slug} (${toolMatches.map((tool) => tool.nome).join(", ")})`,
        tool: slug,
      });
    }
  }

  const pageRoutes = collectToolRoutes(pagesDir);
  const catalogRoutes = new Set<string>();

  for (const item of items) {
    const route = normalizeRoute(item.url);
    catalogRoutes.add(route);

    const routePathWithoutPrefix = route;
    const routeExists =
      pageRoutes.has(routePathWithoutPrefix) ||
      pageRoutes.has(`${routePathWithoutPrefix}/index`) ||
      pageRoutes.has(`${routePathWithoutPrefix}.astro`) ||
      pageRoutes.has(`${routePathWithoutPrefix}/index.astro`);

    if (!routeExists) {
      errors.push({
        type: "missing-page",
        message: `URL sem página correspondente: ${item.url}`,
        tool: item.nome,
      });
    }
  }

  for (const route of pageRoutes) {
    if (!catalogRoutes.has(route) && !route.startsWith("index")) {
      warnings.push({
        type: "missing-page",
        message: `Página existente sem cadastro no catálogo: /ferramentas/${route}`,
        tool: route,
      });
    }
  }

  return { errors, warnings };
};

export const catalogValidation = validateFerramentasCatalog(ferramentas);
