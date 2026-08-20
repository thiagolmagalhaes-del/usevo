import type { CurrencyCode, LocaleCode } from "../types/tax";

export const localeMap: Record<string, { locale: LocaleCode; currency: CurrencyCode }> = {
  BR: { locale: "pt-BR", currency: "BRL" },
};
