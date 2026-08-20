import type { ValidationResult } from "../../types/country";
import type { CountryProfile } from "../../types/tax";

export function validateProfile(profile: CountryProfile): ValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];

  if (!profile.country) {
    issues.push("Perfil sem país definido.");
  }

  if (!profile.label) {
    issues.push("Perfil sem nome do país definido.");
  }

  if (!profile.currency) {
    issues.push("Perfil sem moeda definida.");
  }

  if (!profile.locale) {
    issues.push("Perfil sem locale definido.");
  }

  if (!profile.taxYear) {
    issues.push("Perfil sem ano fiscal definido.");
  }

  if (!profile.status) {
    issues.push("Perfil sem status de validação definido.");
  }

  if (!profile.employmentModels || profile.employmentModels.length === 0) {
    issues.push("Perfil sem modelos de contratação definidos.");
  }

  if (!profile.supportedCalculators || profile.supportedCalculators.length === 0) {
    issues.push("Perfil sem calculadoras suportadas definidas.");
  }

  if (!profile.requiredInputs || profile.requiredInputs.length === 0) {
    issues.push("Perfil sem inputs mínimos definidos.");
  }

  if (!profile.rules || Object.keys(profile.rules).length === 0) {
    issues.push("Perfil sem regras definidas.");
  }

  // Governance checks: if profile claims to be validated, ensure governance metadata exists
  if (profile.status === "validated") {
    if (!profile.lastReviewedAt) {
      issues.push("Perfil marcado como 'validated' sem lastReviewedAt (data da revisão).");
    }
    if (!profile.reviewedBy) {
      issues.push("Perfil marcado como 'validated' sem reviewedBy (revisor).");
    }
    if (!profile.sourceReference) {
      issues.push("Perfil marcado como 'validated' sem sourceReference (referência da fonte).\n");
    }
    if (!profile.sourceDate) {
      issues.push("Perfil marcado como 'validated' sem sourceDate (data da fonte).\n");
    }
  }

  if (profile.status === "needs_review") {
    warnings.push("O perfil está em revisão e deve ser considerado uma estimativa inicial.");
  }

  if (profile.status === "not_validated") {
    warnings.push("O perfil ainda não foi validado oficialmente e não deve ser apresentado como regra pública.");
  }

  if (profile.status === "draft") {
    issues.push("O perfil está em rascunho e não deve ser usado publicamente.");
  }

  return {
    valid: issues.length === 0 && profile.status !== "draft",
    issues,
    warnings,
  };
}
