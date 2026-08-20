import type { ValidationResult } from "../../types/country";
import type { CountryProfile, TaxParameter } from "../../types/tax";

export function validateParameters(profile: CountryProfile): ValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];

  Object.values(profile.rules).forEach((parameter: TaxParameter) => {
    if (!parameter.id) {
      issues.push("Parâmetro sem identificador.");
    }

    if (!parameter.country) {
      issues.push(`Parâmetro ${parameter.id ?? "desconhecido"} sem país definido.`);
    }

    if (!parameter.name) {
      issues.push("Parâmetro sem nome.");
    }

    if (!parameter.taxYear) {
      issues.push(`Parâmetro ${parameter.id ?? "desconhecido"} sem ano de vigência.`);
    }

    if (!parameter.unit) {
      issues.push(`Parâmetro ${parameter.id ?? "desconhecido"} sem unidade definida.`);
    }

    if (!parameter.status) {
      issues.push(`Parâmetro ${parameter.id ?? "desconhecido"} sem status de validação.`);
    }

    if (!parameter.source && parameter.status !== "draft") {
      issues.push(`Parâmetro ${parameter.id ?? "desconhecido"} sem fonte oficial registrada.`);
    }

    if (parameter.status === "needs_review") {
      warnings.push(`Parâmetro ${parameter.id ?? "desconhecido"} está em revisão.`);
    }

    if (parameter.status === "not_validated") {
      warnings.push(`Parâmetro ${parameter.id ?? "desconhecido"} ainda não foi validado oficialmente.`);
    }

    if (parameter.status === "draft") {
      issues.push(`Parâmetro ${parameter.id ?? "desconhecido"} está em rascunho e não deve ser usado publicamente.`);
    }
  });

  return {
    valid: issues.length === 0,
    issues,
    warnings,
  };
}
