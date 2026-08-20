import { COUNTRY_REGISTRY } from "../../config/countries";

export function getSupportedCountries() {
  return Object.entries(COUNTRY_REGISTRY)
    .filter(([, entry]) => entry?.enabled)
    .map(([country]) => country);
}
