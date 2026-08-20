import type { ComparisonResult } from "../../../types/calculator";

export function formatComparisonResult(result: ComparisonResult, currencyFormatter: Intl.NumberFormat) {
  return {
    employeeNet: currencyFormatter.format(result.employeeNet),
    contractorNet: currencyFormatter.format(result.contractorNet),
    monthlyDifference: currencyFormatter.format(result.monthlyDifference),
    annualDifference: currencyFormatter.format(result.annualDifference),
    equivalentContractorIncome: currencyFormatter.format(result.equivalentContractorIncome),
    employeeShare: `${Math.round(result.employeeShare)}%`,
    contractorShare: `${Math.round(result.contractorShare)}%`,
  };
}
