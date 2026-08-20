import type { CountryProfile } from "../../../../types/tax";
import { br2026Parameters } from "./parameters";
import { brazil2026LaborRules } from "./laborRules";

export const brazil2026Profile: CountryProfile = {
  country: "BR",
  label: "Brasil",
  currency: "BRL",
  locale: "pt-BR",
  taxYear: 2026,
  status: "needs_review",
  employmentModels: brazil2026LaborRules.employmentModels,
  supportedCalculators: brazil2026LaborRules.supportedCalculators,
  requiredInputs: brazil2026LaborRules.requiredInputs,
  rules: br2026Parameters,
  notes:
    "Perfil inicial do Brasil para a calculadora CLT vs PJ. O objetivo é preparar a arquitetura para internacionalização sem sugerir regras tributárias oficiais não validadas.",
};
