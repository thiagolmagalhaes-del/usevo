export const SUPPORTED_LOCALES = ["en", "pt-BR", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const FALLBACK_LOCALE: Locale = "en";

export const isSupportedLocale = (value: string | null | undefined): value is Locale => {
  if (!value) return false;
  return SUPPORTED_LOCALES.includes(value as Locale);
};

export const getDefaultLocale = (): Locale => DEFAULT_LOCALE;

export const resolveLocale = (value?: string | null): Locale => {
  if (isSupportedLocale(value)) return value;
  return FALLBACK_LOCALE;
};

/** The public route is authoritative; component props are only a fallback. */
export const resolveLocaleFromPath = (pathname: string, fallback?: string | null): Locale => {
  if (pathname === "/") return "en";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/pt-br" || pathname.startsWith("/pt-br/")) return "pt-BR";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/ferramentas" || pathname.startsWith("/ferramentas/")) return "pt-BR";
  return resolveLocale(fallback);
};
