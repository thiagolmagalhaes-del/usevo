import type { CalculatorInput } from "../../../types/calculator";
export type NormalizedCalculatorInputs = { values: CalculatorInput; issues: string[] };
export function normalizeInputs(raw: Partial<CalculatorInput> = {}): NormalizedCalculatorInputs {
  const issues: string[] = [];
  const number = (key: keyof CalculatorInput, value: unknown, options: { integer?: boolean; required?: boolean } = {}) => {
    const empty = value === "" || value === null || value === undefined || (typeof value === "string" && value.trim() === "");
    if (empty) {
      if (options.required) issues.push(`${key} is required.`);
      return 0;
    }
    const parsed = typeof value === "string" ? Number(value) : Number(value ?? 0);
    if (!Number.isFinite(parsed)) { issues.push(`${key} must be a valid number.`); return 0; }
    if (parsed < 0) { issues.push(`${key} cannot be negative.`); return 0; }
    if (options.integer && !Number.isInteger(parsed)) { issues.push(`${key} must be a whole number.`); return 0; }
    return parsed;
  };
  const taxRatePercent = number("taxRatePercent", raw.taxRatePercent, { required: true });
  if (taxRatePercent > 100) issues.push("taxRatePercent must be between 0 and 100.");
  return { values: {
    country: String(raw.country ?? "BR").trim().toUpperCase() as CalculatorInput["country"],
    grossSalary: number("grossSalary", raw.grossSalary, { required: true }), benefits: number("benefits", raw.benefits), mealVoucher: number("mealVoucher", raw.mealVoucher), healthInsurance: number("healthInsurance", raw.healthInsurance), otherBenefits: number("otherBenefits", raw.otherBenefits), contractorIncome: number("contractorIncome", raw.contractorIncome, { required: true }), taxRatePercent, accountingCosts: number("accountingCosts", raw.accountingCosts), businessCosts: number("businessCosts", raw.businessCosts), contractorHealthInsurance: number("contractorHealthInsurance", raw.contractorHealthInsurance), contractorSocialSecurity: number("contractorSocialSecurity", raw.contractorSocialSecurity), contractorOtherCosts: number("contractorOtherCosts", raw.contractorOtherCosts), vacationReserve: number("vacationReserve", raw.vacationReserve), thirteenthReserve: number("thirteenthReserve", raw.thirteenthReserve), dependents: number("dependents", raw.dependents, { integer: true }),
  }, issues };
}
