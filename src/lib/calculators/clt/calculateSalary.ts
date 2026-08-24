import { br2026CltParameters } from "../../../data/countries/br/2026/parameters";
import type { CltSalaryInput, CltSalaryResult } from "./types";

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function normalizeMoney(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function normalizeDependents(value: number | undefined): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value ?? 0)) : 0;
}

export function calculateInss2026(grossSalary: number): number {
  const contributionBase = Math.min(normalizeMoney(grossSalary), br2026CltParameters.inss.contributionCeiling);
  let previousLimit = 0;
  let contribution = 0;

  for (const bracket of br2026CltParameters.inss.brackets) {
    const taxableSlice = Math.max(0, Math.min(contributionBase, bracket.upTo) - previousLimit);
    contribution += taxableSlice * bracket.rate;
    previousLimit = bracket.upTo;
  }

  return roundCurrency(contribution);
}

export function calculateCltSalary2026({ grossSalary, dependents = 0 }: CltSalaryInput): CltSalaryResult {
  const normalizedGrossSalary = normalizeMoney(grossSalary);
  const inss = calculateInss2026(normalizedGrossSalary);
  const legalDeduction = normalizeDependents(dependents) * br2026CltParameters.irrf.dependentDeduction;
  const irrfDeduction = Math.max(legalDeduction, br2026CltParameters.irrf.simplifiedDeductionLimit);
  const irrfTaxBase = Math.max(0, normalizedGrossSalary - inss - irrfDeduction);
  const irrfBracket = br2026CltParameters.irrf.brackets.find(
    (bracket) => bracket.upTo === null || irrfTaxBase <= bracket.upTo,
  );

  if (!irrfBracket) throw new Error("Faixa de IRRF 2026 não encontrada.");

  const calculatedIrrf = Math.max(0, irrfTaxBase * irrfBracket.rate - (irrfBracket.deduction ?? 0));
  const reduction = br2026CltParameters.irrf.reduction;
  const irrfReduction = normalizedGrossSalary <= reduction.fullReductionUpTo
    ? calculatedIrrf
    : normalizedGrossSalary <= reduction.partialReductionUpTo
      ? Math.min(calculatedIrrf, Math.max(0, reduction.intercept - reduction.coefficient * normalizedGrossSalary))
      : 0;
  const irrf = roundCurrency(Math.max(0, calculatedIrrf - irrfReduction));

  return {
    grossSalary: roundCurrency(normalizedGrossSalary),
    inss,
    irrf,
    netSalary: roundCurrency(normalizedGrossSalary - inss - irrf),
    irrfTaxBase: roundCurrency(irrfTaxBase),
    irrfDeduction: roundCurrency(irrfDeduction),
    irrfReduction: roundCurrency(irrfReduction),
    sourceMeta: {
      taxYear: br2026CltParameters.taxYear,
      sources: {
        inss: br2026CltParameters.sources.inss.label,
        irrf: br2026CltParameters.sources.irrf.label,
      },
    },
  };
}
