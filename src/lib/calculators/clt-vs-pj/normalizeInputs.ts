import type { CalculatorInput } from "../../../types/calculator";

export function normalizeInputs(raw: Partial<CalculatorInput> = {}): CalculatorInput {
  const normalizeNumber = (value: number | string | undefined) => {
    const parsed = typeof value === "string" ? Number(value) : Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  return {
    country: raw.country ?? "BR",
    grossSalary: normalizeNumber(raw.grossSalary),
    benefits: normalizeNumber(raw.benefits),
    mealVoucher: normalizeNumber(raw.mealVoucher),
    healthInsurance: normalizeNumber(raw.healthInsurance),
    otherBenefits: normalizeNumber(raw.otherBenefits),
    contractorIncome: normalizeNumber(raw.contractorIncome),
    taxes: normalizeNumber(raw.taxes),
    accountingCosts: normalizeNumber(raw.accountingCosts),
    businessCosts: normalizeNumber(raw.businessCosts),
    socialCharges: normalizeNumber(raw.socialCharges),
    professionalCosts: normalizeNumber(raw.professionalCosts),
  };
}
