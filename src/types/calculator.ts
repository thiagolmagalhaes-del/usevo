import type { CountryCode, ValidationResult, ValidationStatus } from "./country";

export type CalculatorInput = {
  country: CountryCode;
  grossSalary?: number;
  benefits?: number;
  mealVoucher?: number;
  healthInsurance?: number;
  otherBenefits?: number;
  contractorIncome?: number;
  taxes?: number;
  accountingCosts?: number;
  businessCosts?: number;
  socialCharges?: number;
  professionalCosts?: number;
};

export type ComparisonMetrics = {
  employeeNet: number;
  contractorNet: number;
  monthlyDifference: number;
  annualDifference: number;
  equivalentContractorIncome: number;
  employeeShare: number;
  contractorShare: number;
};

export type ComparisonResult = {
  employeeNet: number;
  contractorNet: number;
  monthlyDifference: number;
  annualDifference: number;
  equivalentContractorIncome: number;
  employeeShare: number;
  contractorShare: number;
  warnings: string[];
  validation: ValidationResult;
  sourceMeta: {
    taxYear: number;
    status: ValidationStatus;
    sourceLabel?: string;
  };
};
