import type { CountryProfile } from "../../../types/tax";
import type { CalculatorInput, ComparisonResult } from "../../../types/calculator";
import { normalizeInputs } from "./normalizeInputs";
import { validateParameters } from "../../validation/validateParameters";
import { validateProfile } from "../../validation/validateProfile";
import { warnOnUnvalidated } from "../../validation/warnOnUnvalidated";

export function calculateComparison({
  countryProfile,
  inputs,
}: {
  countryProfile: CountryProfile;
  inputs: Partial<CalculatorInput>;
}): ComparisonResult {
  const normalized = normalizeInputs(inputs);
  const profileValidation = validateProfile(countryProfile);
  const parameterValidation = validateParameters(countryProfile);
  const warnings = warnOnUnvalidated(countryProfile);

  const employeeNet =
    (normalized.grossSalary ?? 0) +
    (normalized.benefits ?? 0) +
    (normalized.mealVoucher ?? 0) +
    (normalized.healthInsurance ?? 0) +
    (normalized.otherBenefits ?? 0);

  const contractorNet =
    (normalized.contractorIncome ?? 0) -
    (normalized.taxes ?? 0) -
    (normalized.accountingCosts ?? 0) -
    (normalized.businessCosts ?? 0) -
    (normalized.socialCharges ?? 0) -
    (normalized.professionalCosts ?? 0);

  const monthlyDifference = contractorNet - employeeNet;
  const annualDifference = monthlyDifference * 12;
  const equivalentContractorIncome =
    employeeNet +
    (normalized.taxes ?? 0) +
    (normalized.accountingCosts ?? 0) +
    (normalized.businessCosts ?? 0) +
    (normalized.socialCharges ?? 0) +
    (normalized.professionalCosts ?? 0);

  const total = Math.max(Math.abs(employeeNet), Math.abs(contractorNet), 1);
  const employeeShare = (employeeNet / total) * 100;
  const contractorShare = (contractorNet / total) * 100;

  return {
    employeeNet,
    contractorNet,
    monthlyDifference,
    annualDifference,
    equivalentContractorIncome,
    employeeShare: Number.isFinite(employeeShare) ? Math.min(Math.max(employeeShare, 0), 100) : 0,
    contractorShare: Number.isFinite(contractorShare) ? Math.min(Math.max(contractorShare, 0), 100) : 0,
    warnings,
    validation: {
      valid: profileValidation.valid && parameterValidation.valid,
      issues: [...profileValidation.issues, ...parameterValidation.issues],
      warnings,
    },
    sourceMeta: {
      taxYear: countryProfile.taxYear,
      status: countryProfile.status,
      sourceLabel: countryProfile.notes || "Sem fonte registrada.",
    },
  };
}
