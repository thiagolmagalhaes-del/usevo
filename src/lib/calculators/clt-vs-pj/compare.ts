import type { CountryProfile } from "../../../types/tax";
import type { CalculatorInput, ComparisonResult } from "../../../types/calculator";
import { normalizeInputs } from "./normalizeInputs";
import { calculateMonthlyIrrf, calculateProgressiveInss, calculateThirteenthSalaryNet, calculateVacationBonusNet } from "./brazil2026";

export function calculateComparison({
  countryProfile,
  inputs,
}: {
  countryProfile: CountryProfile;
  inputs: Partial<CalculatorInput>;
}): ComparisonResult {
  const normalized = normalizeInputs(inputs);
  const zero = (issues: string[]): ComparisonResult => ({ employeeNet: 0, contractorNet: 0, monthlyDifference: 0, annualDifference: 0, equivalentContractorIncome: 0, employeeShare: 0, contractorShare: 0, employee: { grossSalary: 0, inss: 0, irrf: 0, monthlyNet: 0, benefits: 0, thirteenthSalary: 0, vacationBonus: 0, fgts: 0, economicMonthlyValue: 0, economicAnnualValue: 0 }, contractor: { grossRevenue: 0, taxes: 0, costs: 0, reserves: 0, monthlyBeforeReserves: 0, monthlyAvailable: 0, annualNet: 0 }, warnings: [], validation: { valid: false, issues, warnings: [] }, sourceMeta: { taxYear: countryProfile.taxYear, status: countryProfile.status, sourceLabel: countryProfile.notes } });
  if (normalized.values.country !== "BR" || countryProfile.country !== "BR" || countryProfile.status !== "validated") return zero(["This country is not available for calculation."]);
  if (normalized.issues.length) return zero(normalized.issues);
  const value = normalized.values;
  const money = (amount: number) => Math.round((Number.isFinite(amount) ? amount : 0) * 100) / 100;
  const grossSalary = value.grossSalary ?? 0;
  const benefits = money((value.benefits ?? 0) + (value.mealVoucher ?? 0) + (value.healthInsurance ?? 0) + (value.otherBenefits ?? 0));
  const inss = calculateProgressiveInss(grossSalary);
  const irrf = calculateMonthlyIrrf(grossSalary, inss, value.dependents).irrf;
  const monthlyNet = money(grossSalary - inss - irrf);
  const thirteenthSalary = calculateThirteenthSalaryNet(grossSalary, value.dependents).net;
  const vacationBonus = calculateVacationBonusNet(grossSalary);
  const fgts = money(grossSalary * 0.08);
  const economicAnnualValue = money(monthlyNet * 12 + benefits * 12 + thirteenthSalary + vacationBonus + (grossSalary * 13 + grossSalary / 3) * 0.08);
  const employeeNet = money(economicAnnualValue / 12);
  const grossRevenue = value.contractorIncome ?? 0;
  const taxes = money(grossRevenue * (value.taxRatePercent ?? 0) / 100);
  const costs = money((value.accountingCosts ?? 0) + (value.businessCosts ?? 0) + (value.contractorHealthInsurance ?? 0) + (value.contractorSocialSecurity ?? 0) + (value.contractorOtherCosts ?? 0));
  const reserves = money((value.vacationReserve ?? 0) + (value.thirteenthReserve ?? 0));
  const beforeReserves = money(grossRevenue - taxes - costs);
  const contractorNet = money(beforeReserves - reserves);
  const annualNet = money(contractorNet * 12);
  const monthlyDifference = money(contractorNet - employeeNet);
  const annualDifference = money(annualNet - economicAnnualValue);
  const denominator = 1 - (value.taxRatePercent ?? 0) / 100;
  const equivalentContractorIncome = denominator > 0 ? money((employeeNet + costs + reserves) / denominator) : 0;
  const total = Math.max(0, employeeNet) + Math.max(0, contractorNet);
  const employeeShare = total ? money(Math.max(0, employeeNet) / total * 100) : 0;
  const contractorShare = total ? money(Math.max(0, contractorNet) / total * 100) : 0;

  return {
    employeeNet,
    contractorNet,
    monthlyDifference,
    annualDifference,
    equivalentContractorIncome,
    employeeShare: Number.isFinite(employeeShare) ? Math.min(Math.max(employeeShare, 0), 100) : 0,
    contractorShare: Number.isFinite(contractorShare) ? Math.min(Math.max(contractorShare, 0), 100) : 0,
    employee: { grossSalary, inss, irrf, monthlyNet, benefits, thirteenthSalary, vacationBonus, fgts, economicMonthlyValue: employeeNet, economicAnnualValue },
    contractor: { grossRevenue, taxes, costs, reserves, monthlyBeforeReserves: beforeReserves, monthlyAvailable: contractorNet, annualNet },
    warnings: [],
    validation: { valid: true, issues: [], warnings: [] },
    sourceMeta: {
      taxYear: countryProfile.taxYear,
      status: countryProfile.status,
      sourceLabel: countryProfile.notes || "Sem fonte registrada.",
    },
  };
}
