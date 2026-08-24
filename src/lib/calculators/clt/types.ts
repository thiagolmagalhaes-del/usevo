export type CltSalaryInput = { grossSalary: number; dependents?: number };

export type CltSalaryResult = {
  grossSalary: number;
  inss: number;
  irrf: number;
  netSalary: number;
  irrfTaxBase: number;
  irrfDeduction: number;
  irrfReduction: number;
  sourceMeta: { taxYear: number; sources: { inss: string; irrf: string } };
};
