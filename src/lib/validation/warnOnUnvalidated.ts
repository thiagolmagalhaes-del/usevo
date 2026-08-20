import type { CountryProfile } from "../../types/tax";
import { validateProfile } from "./validateProfile";

export function warnOnUnvalidated(profile: CountryProfile) {
  const warnings: string[] = [];

  // Keep existing messages
  if (profile.status === "needs_review") {
    warnings.push(
      "Estimativa baseada em parâmetros de 2026 em revisão. Os valores não devem ser considerados orientação fiscal, contábil ou jurídica.",
    );
  }

  if (profile.status === "not_validated") {
    warnings.push("Alguns parâmetros deste cálculo ainda não foram validados oficialmente.");
  }

  if (profile.status === "draft") {
    warnings.push("Este perfil está em rascunho e não deve ser usado como cálculo público ativo.");
  }

  const invalidParameters = Object.values(profile.rules).filter(
    (parameter) =>
      parameter.status === "needs_review" ||
      parameter.status === "not_validated" ||
      parameter.status === "draft",
  );

  if (invalidParameters.length > 0) {
    warnings.push("Alguns parâmetros ainda precisam de validação oficial antes de uso em decisões fiscais ou jurídicas.");
  }

  // Include profile validation issues/warnings as part of visible warnings so users know governance metadata is missing
  const profileValidation = validateProfile(profile);
  if (profileValidation.issues.length > 0) {
    warnings.push(...profileValidation.issues);
  }
  if (profileValidation.warnings.length > 0) {
    warnings.push(...profileValidation.warnings);
  }

  // Deduplicate
  return Array.from(new Set(warnings));
}
