export type CountryCode = "BR" | "US" | "PT" | "GB" | "CA" | "AU" | "DE" | "ES";

export type EmploymentModel = "employee" | "contractor";

export type ValidationStatus =
  | "validated"
  | "needs_review"
  | "not_validated"
  | "draft";

export type ValidationResult = {
  valid: boolean;
  issues: string[];
  warnings: string[];
};

export type CountryRegistryEntry = {
  label: string;
  code: CountryCode;
  enabled: boolean;
};
