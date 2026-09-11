import { ferramentas, type Ferramenta } from "./ferramentas";
import type { Locale } from "./locales";

const featuredToolIds = [
  "pdf-para-jpg",
  "jpg-para-pdf",
  "converter-imagem",
  "calculadora-de-porcentagem",
  "contador-de-palavras",
  "leitor-de-qr-code",
] as const;

export const getFeaturedTools = (): Ferramenta[] =>
  featuredToolIds.map((id) => {
    const tool = ferramentas.find((item) => item.id === id);

    if (!tool) throw new Error(`Featured tool not found: ${id}`);

    return tool;
  });

export const featuredToolsCopy: Record<Locale, { title: string; cta: string; href: string }> = {
  en: { title: "Featured tools", cta: "View all tools", href: "/en/tools" },
  "pt-BR": { title: "Ferramentas em destaque", cta: "Ver todas as ferramentas", href: "/ferramentas" },
  es: { title: "Herramientas destacadas", cta: "Ver todas las herramientas", href: "/es/herramientas" },
};
