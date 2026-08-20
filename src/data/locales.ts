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
