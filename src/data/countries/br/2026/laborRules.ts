import type { EmploymentModel } from "../../../../types/country";

export const brazil2026LaborRules = {
  country: "BR",
  taxYear: 2026,
  employmentModels: ["employee", "contractor"] as EmploymentModel[],
  supportedCalculators: ["clt-vs-pj"],
  requiredInputs: [
    "grossSalary",
    "benefits",
    "mealVoucher",
    "healthInsurance",
    "otherBenefits",
    "contractorIncome",
    "taxRatePercent",
    "accountingCosts",
    "businessCosts",
    "contractorHealthInsurance",
    "contractorSocialSecurity",
    "contractorOtherCosts",
    "vacationReserve",
    "thirteenthReserve",
  ],
  notes:
    "Este perfil foi criado para manter a arquitetura pronta para expansão internacional. Os parâmetros específicos do Brasil ainda devem ser validados por fontes oficiais antes de uso em decisões fiscais ou jurídicas.",
};
