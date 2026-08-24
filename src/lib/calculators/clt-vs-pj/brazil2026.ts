import { br2026CltParameters } from "../../../data/countries/br/2026/parameters";

const money = (value: number) => Math.round((value + 1e-9) * 100) / 100;
const finiteNonNegative = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;

export function calculateProgressiveInss(grossSalary: number): number {
  let previousCeiling = 0;
  let contribution = 0;
  const salary = finiteNonNegative(grossSalary);
  for (const bracket of br2026CltParameters.inss.brackets) {
    contribution += Math.max(0, Math.min(salary, bracket.upTo ?? salary) - previousCeiling) * bracket.rate;
    if (bracket.upTo !== null) previousCeiling = bracket.upTo;
  }
  return money(contribution);
}

export function getIrrfMonthlyBase(grossSalary: number, inss: number, dependents = 0) {
  const legalDeductions = finiteNonNegative(inss) + Math.max(0, Math.trunc(dependents)) * br2026CltParameters.irrf.dependentDeduction;
  const simplifiedDeduction = br2026CltParameters.irrf.simplifiedDeductionLimit;
  const deduction = Math.max(legalDeductions, simplifiedDeduction);
  return { base: money(Math.max(0, finiteNonNegative(grossSalary) - deduction)), legalDeductions: money(legalDeductions), simplifiedDeduction, usedSimplifiedDeduction: simplifiedDeduction > legalDeductions };
}

export function calculateIrrfByTable(taxableBase: number): number {
  const base = finiteNonNegative(taxableBase);
  const bracket = br2026CltParameters.irrf.brackets.find((item) => item.upTo === null || base <= item.upTo) ?? br2026CltParameters.irrf.brackets.at(-1)!;
  return money(Math.max(0, base * bracket.rate - (bracket.deduction ?? 0)));
}

export function calculateIrrfReduction2026(irrfBeforeReduction: number, taxableMonthlyIncome: number): number {
  const income = finiteNonNegative(taxableMonthlyIncome);
  const tax = finiteNonNegative(irrfBeforeReduction);
  const { fullReductionUpTo, partialReductionUpTo, intercept, coefficient } = br2026CltParameters.irrf.reduction;
  if (income <= fullReductionUpTo) return tax;
  if (income <= partialReductionUpTo) return money(Math.min(tax, Math.max(0, intercept - coefficient * income)));
  return 0;
}

export function calculateMonthlyIrrf(grossSalary: number, inss: number, dependents = 0) {
  const base = getIrrfMonthlyBase(grossSalary, inss, dependents);
  const beforeReduction = calculateIrrfByTable(base.base);
  const reduction = calculateIrrfReduction2026(beforeReduction, grossSalary);
  return { ...base, beforeReduction, reduction, irrf: money(Math.max(0, beforeReduction - reduction)) };
}

export function calculateThirteenthSalaryNet(grossSalary: number, dependents = 0) {
  const gross = finiteNonNegative(grossSalary);
  const inss = calculateProgressiveInss(gross);
  // Conservative estimate: calculate the 13th separately with legal deductions only.
  // The monthly simplified discount and 2026 monthly reduction are not assumed for this payment.
  const taxableBase = Math.max(0, gross - inss - Math.max(0, Math.trunc(dependents)) * br2026CltParameters.irrf.dependentDeduction);
  const irrf = calculateIrrfByTable(taxableBase);
  return { gross, inss, irrf, net: money(gross - inss - irrf) };
}

export function calculateVacationBonusNet(grossSalary: number): number {
  // The 12 regular salaries already cover the month of vacation; add only one-third.
  return money(finiteNonNegative(grossSalary) / 3);
}
