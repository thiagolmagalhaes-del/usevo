import { describe, expect, it } from "vitest";
import { brazil2026Profile } from "../../../data/countries/br/2026/profile";
import { calculateComparison } from "./compare";
import { calculateIrrfByTable, calculateIrrfReduction2026, calculateMonthlyIrrf, calculateProgressiveInss, getIrrfMonthlyBase } from "./brazil2026";

const input = (overrides = {}) => ({ country: "BR", grossSalary: 7000, benefits: 0, mealVoucher: 0, healthInsurance: 0, otherBenefits: 0, dependents: 0, contractorIncome: 7000, taxRatePercent: 15, accountingCosts: 0, businessCosts: 0, contractorHealthInsurance: 0, contractorSocialSecurity: 0, contractorOtherCosts: 0, vacationReserve: 0, thirteenthReserve: 0, ...overrides });
const result = (overrides = {}) => calculateComparison({ countryProfile: brazil2026Profile, inputs: input(overrides) });

describe("Brazil 2026 payroll", () => {
  it("calculates progressive INSS in every band and caps it", () => {
    expect(calculateProgressiveInss(1621)).toBeCloseTo(121.58, 2);
    expect(calculateProgressiveInss(2902.84)).toBeCloseTo(236.94, 2);
    expect(calculateProgressiveInss(4354.27)).toBeCloseTo(411.11, 2);
    expect(calculateProgressiveInss(8475.55)).toBeCloseTo(988.09, 2);
    expect(calculateProgressiveInss(20000)).toBe(calculateProgressiveInss(8475.55));
  });
  it("uses IRRF brackets, simplified deduction and dependents when beneficial", () => {
    expect(calculateIrrfByTable(2428.8)).toBe(0);
    expect(calculateIrrfByTable(2826.65)).toBeCloseTo(29.84, 2);
    expect(calculateIrrfByTable(3751.05)).toBeCloseTo(168.5, 2);
    expect(calculateIrrfByTable(4664.68)).toBeCloseTo(374.06, 2);
    expect(calculateIrrfByTable(6000)).toBeCloseTo(741.27, 2);
    expect(getIrrfMonthlyBase(3000, 200, 0).usedSimplifiedDeduction).toBe(true);
    expect(getIrrfMonthlyBase(7000, 800, 3).usedSimplifiedDeduction).toBe(false);
  });
  it("applies 2026 full, partial and no IRRF reduction", () => {
    expect(calculateIrrfReduction2026(100, 5000)).toBe(100);
    expect(calculateIrrfReduction2026(500, 6000)).toBeCloseTo(179.75, 2);
    expect(calculateIrrfReduction2026(500, 7351)).toBe(0);
    expect(calculateMonthlyIrrf(5000, calculateProgressiveInss(5000)).irrf).toBe(0);
  });
});

describe("CLT versus PJ comparison", () => {
  it("handles zero values and rejects negatives without NaN or Infinity", () => {
    const zero = result({ grossSalary: 0, contractorIncome: 0 });
    expect(zero.validation.valid).toBe(true); expect(zero.employee.economicAnnualValue).toBe(0);
    const invalid = result({ grossSalary: -1 }); expect(invalid.validation.valid).toBe(false);
    expect(result({ grossSalary: "" }).validation.valid).toBe(false);
    expect(Object.values(invalid.employee).every(Number.isFinite)).toBe(true);
  });
  it("accepts PJ tax rates at 0, intermediate and 100 percent", () => {
    expect(result({ taxRatePercent: 0 }).contractor.taxes).toBe(0);
    expect(result({ contractorIncome: 10000, taxRatePercent: 15 }).contractor.taxes).toBe(1500);
    expect(result({ contractorIncome: 10000, taxRatePercent: 100 }).contractor.monthlyAvailable).toBe(0);
  });
  it("identifies CLT and PJ winners and solves the percentage-tax equivalence point", () => {
    expect(result({ contractorIncome: 0 }).monthlyDifference).toBeLessThan(0);
    expect(result({ grossSalary: 0, contractorIncome: 10000 }).monthlyDifference).toBeGreaterThan(0);
    const base = result({ contractorIncome: 0, taxRatePercent: 20, accountingCosts: 100, vacationReserve: 50 });
    const equivalent = result({ contractorIncome: base.equivalentContractorIncome, taxRatePercent: 20, accountingCosts: 100, vacationReserve: 50 });
    expect(equivalent.monthlyDifference).toBeCloseTo(0, 1);
  });
  it("does not double-count a vacation month and keeps FGTS outside available net pay", () => {
    const clt = result({ grossSalary: 3000, contractorIncome: 0 }).employee;
    expect(clt.economicAnnualValue).toBeCloseTo(clt.monthlyNet * 12 + clt.thirteenthSalary + clt.vacationBonus + (3000 * 13 + 1000) * .08, 2);
    expect(clt.monthlyNet).toBe(3000 - clt.inss - clt.irrf);
    expect(clt.fgts).toBe(240);
  });
  it("never runs Brazilian calculation for another country", () => {
    const planned = calculateComparison({ countryProfile: { ...brazil2026Profile, country: "US", status: "planned" }, inputs: input({ country: "US" }) });
    expect(planned.validation.valid).toBe(false); expect(planned.employee.economicAnnualValue).toBe(0);
  });
});
