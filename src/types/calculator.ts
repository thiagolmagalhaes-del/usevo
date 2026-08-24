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
  dependents?: number;
  taxRatePercent?: number;
  contractorHealthInsurance?: number;
  contractorSocialSecurity?: number;
  contractorOtherCosts?: number;
  vacationReserve?: number;
  thirteenthReserve?: number;
};

export type ComparisonMetrics = {
  employeeNet: number;
  contractorNet: number;
  monthlyDifference: number;
  annualDifference: number;
  equivalentContractorIncome: number;
  employeeShare: number;
  contractorShare: number;
  employee: { grossSalary: number; inss: number; irrf: number; monthlyNet: number; benefits: number; thirteenthSalary: number; vacationBonus: number; fgts: number; economicMonthlyValue: number; economicAnnualValue: number };
  contractor: { grossRevenue: number; taxes: number; costs: number; reserves: number; monthlyBeforeReserves: number; monthlyAvailable: number; annualNet: number };
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
