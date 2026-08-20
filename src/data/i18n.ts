import { DEFAULT_LOCALE, FALLBACK_LOCALE, isSupportedLocale, type Locale } from "./locales";

export type UITranslations = {
  tools: string;
  categories: string;
  exploreTools: string;
  allTools: string;
  search: string;
  popularTools: string;
  freeOnlineTools: string;
  footerTools: string;
  footerCategories: string;
  home: string;
  back: string;
  copy: string;
  clear: string;
  format: string;
  download: string;
  upload: string;
  language: string;
  noResults: string;
};

export type CategoryKey =
  | "financas"
  | "calculadoras"
  | "conversores"
  | "texto"
  | "seguranca"
  | "utilidades"
  | "arquivos"
  | "desenvolvimento";

export const categoryTranslations: Record<CategoryKey, Record<Locale, string>> = {
  financas: {
    en: "Finance",
    "pt-BR": "Finanças",
    es: "Finanzas",
  },
  calculadoras: {
    en: "Calculators",
    "pt-BR": "Calculadoras",
    es: "Calculadoras",
  },
  conversores: {
    en: "Converters",
    "pt-BR": "Conversores",
    es: "Convertidores",
  },
  texto: {
    en: "Text",
    "pt-BR": "Texto",
    es: "Texto",
  },
  seguranca: {
    en: "Security",
    "pt-BR": "Segurança",
    es: "Seguridad",
  },
  utilidades: {
    en: "Utilities",
    "pt-BR": "Utilidades",
    es: "Utilidades",
  },
  arquivos: {
    en: "Files",
    "pt-BR": "Arquivos",
    es: "Archivos",
  },
  desenvolvimento: {
    en: "Development",
    "pt-BR": "Desenvolvimento",
    es: "Desarrollo",
  },
};

export const uiTranslations: Record<Locale, UITranslations> = {
  en: {
    tools: "Tools",
    categories: "Categories",
    exploreTools: "Explore tools",
    allTools: "All tools",
    search: "Search",
    popularTools: "Popular tools",
    freeOnlineTools: "Free online tools",
    footerTools: "Tools",
    footerCategories: "Categories",
    home: "Home",
    back: "Back",
    copy: "Copy",
    clear: "Clear",
    format: "Format",
    download: "Download",
    upload: "Upload",
    language: "Language",
    noResults: "No tools found.",
  },
  "pt-BR": {
    tools: "Ferramentas",
    categories: "Categorias",
    exploreTools: "Explorar ferramentas",
    allTools: "Todas as ferramentas",
    search: "Buscar",
    popularTools: "Ferramentas populares",
    freeOnlineTools: "Ferramentas online grátis",
    footerTools: "Ferramentas",
    footerCategories: "Categorias",
    home: "Início",
    back: "Voltar",
    copy: "Copiar",
    clear: "Limpar",
    format: "Formatar",
    download: "Baixar",
    upload: "Enviar",
    language: "Idioma",
    noResults: "Nenhuma ferramenta encontrada.",
  },
  es: {
    tools: "Herramientas",
    categories: "Categorías",
    exploreTools: "Explorar herramientas",
    allTools: "Todas las herramientas",
    search: "Buscar",
    popularTools: "Herramientas populares",
    freeOnlineTools: "Herramientas online gratuitas",
    footerTools: "Herramientas",
    footerCategories: "Categorías",
    home: "Inicio",
    back: "Atrás",
    copy: "Copiar",
    clear: "Limpiar",
    format: "Formatear",
    download: "Descargar",
    upload: "Subir",
    language: "Idioma",
    noResults: "No se encontraron herramientas.",
  },
};

export const getTranslations = (locale?: string | null): UITranslations => {
  const resolvedLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return uiTranslations[resolvedLocale] ?? uiTranslations[FALLBACK_LOCALE];
};

export const getCategoryTranslation = (categoryKey: string, locale?: string | null): string => {
  const resolvedLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const normalizedKey = categoryKey.trim().toLowerCase();
  const translation = categoryTranslations[normalizedKey as CategoryKey];
  return translation?.[resolvedLocale] ?? normalizedKey;
};
