import { ferramentas, type Ferramenta } from "./ferramentas";
import { getToolLocaleRoute } from "./locale-routes";
import type { Locale } from "./locales";
import { calculatorsEditorialContent } from "./tool-editorial-content/calculators";
import { cltPjEditorialContent } from "./tool-editorial-content/clt-pj";
import { convertersEditorialContent } from "./tool-editorial-content/converters";
import { developmentEditorialContent } from "./tool-editorial-content/development";
import { filesAndImagesEditorialContent } from "./tool-editorial-content/files-and-images";
import { financeEditorialContent } from "./tool-editorial-content/finance";
import { securityEditorialContent } from "./tool-editorial-content/security";
import { textEditorialContent } from "./tool-editorial-content/text";
import type {
  EditorialRelatedTool,
  ResolvedEditorialRelatedTool,
  ToolEditorialContent,
  ToolEditorialContentCatalog,
  ToolEditorialTranslations,
} from "./tool-editorial-content/types";

export type {
  EditorialRelatedTool,
  ResolvedEditorialRelatedTool,
  ToolEditorialContent,
  ToolEditorialContentCatalog,
  ToolEditorialTranslations,
} from "./tool-editorial-content/types";

export const mergeToolEditorialContentCatalogs = (
  ...catalogs: ToolEditorialContentCatalog[]
): ToolEditorialContentCatalog => {
  const merged: ToolEditorialContentCatalog = {};

  for (const catalog of catalogs) {
    for (const [toolId, translations] of Object.entries(catalog)) {
      if (Object.prototype.hasOwnProperty.call(merged, toolId)) {
        throw new Error(`Duplicate editorial content for tool: ${toolId}`);
      }
      merged[toolId as Ferramenta["id"]] = translations;
    }
  }

  return merged;
};

export const toolEditorialContent = mergeToolEditorialContentCatalogs(
  calculatorsEditorialContent,
  financeEditorialContent,
  textEditorialContent,
  convertersEditorialContent,
  securityEditorialContent,
  filesAndImagesEditorialContent,
  developmentEditorialContent,
  cltPjEditorialContent,
);

export const getToolEditorialContent = (
  toolId: Ferramenta["id"] | undefined,
  locale: Locale,
) => toolId ? toolEditorialContent[toolId]?.[locale] : undefined;

export const getToolEditorialContentByLocaleSlug = (
  slug: string | undefined,
  locale: Locale,
) => {
  const tool = ferramentas.find((candidate) => candidate.localeSlugs[locale] === slug);
  return getToolEditorialContent(tool?.id, locale);
};

export const getEditorialRelatedTools = (
  content: ToolEditorialContent | undefined,
  locale: Locale,
): ResolvedEditorialRelatedTool[] => {
  if (!content) return [];

  return content.relatedTools.items.flatMap((item) => {
    const tool = ferramentas.find((candidate) => candidate.id === item.toolId);
    const href = tool ? getToolLocaleRoute(tool, locale) : undefined;
    return href ? [{ ...item, href }] : [];
  });
};
