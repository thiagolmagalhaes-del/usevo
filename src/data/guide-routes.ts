import type { Locale } from "./locales";

export const GUIDE_KEYS = ["images", "pdfs", "developer-data"] as const;
export type GuideKey = (typeof GUIDE_KEYS)[number];
export const guideIndexRoutes: Record<Locale, string> = {
  en: "/guides", "pt-BR": "/pt-br/guias", es: "/es/guias",
};
export const guideRoutes: Record<GuideKey, Record<Locale, string>> = {
  images: {
    en: "/guides/prepare-images-for-web",
    "pt-BR": "/pt-br/guias/preparar-imagens-para-web",
    es: "/es/guias/preparar-imagenes-para-web",
  },
  pdfs: {
    en: "/guides/work-with-pdfs-online",
    "pt-BR": "/pt-br/guias/trabalhar-com-pdfs-online",
    es: "/es/guias/trabajar-con-pdf-online",
  },
  "developer-data": {
    en: "/guides/use-developer-data-tools-safely",
    "pt-BR": "/pt-br/guias/usando-ferramentas-de-dados-com-seguranca",
    es: "/es/guias/utilizar-herramientas-de-datos-con-seguridad",
  },
};

export const getGuideRouteFamily = (path: string): Record<Locale, string> | undefined =>
  [guideIndexRoutes, ...GUIDE_KEYS.map((key) => guideRoutes[key])]
    .find((routes) => Object.values(routes).includes(path));
