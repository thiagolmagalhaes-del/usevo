import { COUNTRY_PROFILE_MAP, COUNTRY_REGISTRY } from "../../config/countries";

export function getCountryProfile(country: string) {
  const normalized = String(country || "").toUpperCase();

  if (!(normalized in COUNTRY_REGISTRY)) {
    throw new Error(`Country profile not found for: ${normalized}`);
  }

  const profile = COUNTRY_PROFILE_MAP[normalized as keyof typeof COUNTRY_PROFILE_MAP];

  if (!profile) {
    throw new Error(`Country profile not available for: ${normalized}`);
  }

  return profile;
}
