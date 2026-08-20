import type { CountryCode, CountryRegistryEntry } from "../types/country";
import type { CountryProfile } from "../types/tax";
import { brazil2026Profile } from "../data/countries/br/2026/profile";

export const COUNTRY_REGISTRY: Partial<Record<CountryCode, CountryRegistryEntry>> = {
  BR: { label: "Brasil", code: "BR", enabled: true },
};

export const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_REGISTRY).filter(Boolean) as CountryCode[];

export const COUNTRY_PROFILE_MAP: Partial<Record<CountryCode, CountryProfile>> = {
  BR: brazil2026Profile,
};
