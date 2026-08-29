import type { Ferramenta } from "../ferramentas";
import type { Locale } from "../locales";

export type EditorialRelatedTool = {
  toolId: Ferramenta["id"];
  label: string;
  description: string;
};

export type ResolvedEditorialRelatedTool = EditorialRelatedTool & {
  href: string;
};

export type ToolEditorialContent = {
  howTo: { title: string; steps: string[] };
  example: { title: string; description: string; calculation: string; result: string };
  useCases: { title: string; items: string[] };
  notes: { title: string; items: string[] };
  faq: { title: string; items: Array<{ question: string; answer: string }> };
  relatedTools: { title: string; items: EditorialRelatedTool[] };
};

export type ToolEditorialTranslations = Partial<Record<Locale, ToolEditorialContent>>;
export type ToolEditorialContentCatalog = Partial<Record<Ferramenta["id"], ToolEditorialTranslations>>;
