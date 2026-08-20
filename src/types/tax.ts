import type { CountryCode, ValidationStatus } from "./country";

export type CurrencyCode = "BRL" | "USD" | "EUR" | "GBP";
export type LocaleCode = "pt-BR" | "en-US" | "pt-PT" | "en-GB" | "de-DE" | "es-ES";
export type UnitType = "percent" | "currency" | "days" | "boolean" | "fixed";

export type TaxParameter = {
  id: string;
  country: CountryCode;
  taxYear: number;
  name: string;
  value: number | null;
  unit: UnitType;
  status: ValidationStatus;
  source?: string;
  updatedAt?: string;
  notes?: string;
};

export type EmploymentModel = "employee" | "contractor";

export type CountryProfile = {
  country: CountryCode;
  label: string;
  currency: CurrencyCode;
  locale: LocaleCode;
  taxYear: number;
  status: ValidationStatus;
  employmentModels: EmploymentModel[];
  supportedCalculators: string[];
  requiredInputs: string[];
  rules: Record<string, TaxParameter>;
  notes?: string;

  // Governance / audit metadata (optional — present when validated or reviewed)
  lastReviewedAt?: string | null; // ISO date
  reviewedBy?: string | null; // reviewer identifier
  sourceType?: string | null; // e.g., "legislation", "official_guideline", "tax_authority"
  sourceReference?: string | null; // URL or document reference
  sourceDate?: string | null; // date of source
  effectiveFrom?: string | null; // ISO date
  effectiveUntil?: string | null; // ISO date
  confidenceLevel?: "low" | "medium" | "high" | null;
};
