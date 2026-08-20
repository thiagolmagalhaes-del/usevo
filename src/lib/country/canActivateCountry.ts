import type { CountryProfile } from "../../types/tax";
import type { ValidationResult } from "../../types/country";
import { validateProfile } from "../validation/validateProfile";
import { validateParameters } from "../validation/validateParameters";

export type ActivationResult = {
  allowed: boolean;
  issues: string[];
  warnings: string[];
};

/**
 * canActivateCountry
 *
 * Decides whether a given CountryProfile is eligible to be "activated" for international
 * support (i.e., enabled for other-country usage). This gate is intentionally strict:
 * - status must be "validated"
 * - governance metadata (lastReviewedAt, reviewedBy, sourceReference, sourceDate) must be present
 * - profile structural validation must pass
 * - parameters validation must pass
 *
 * Note: The legacy operational concept (e.g., BR running in production while still needs_review)
 * is intentionally out of scope for this gate. Pass allowLegacy=true only when caller intends to
 * allow legacy behavior (internal use). The public activation flow MUST call this with allowLegacy=false.
 */
export function canActivateCountry(profile: CountryProfile | null | undefined, opts?: { allowLegacy?: boolean }): ActivationResult {
  const allowLegacy = opts?.allowLegacy === true;

  const issues: string[] = [];
  const warnings: string[] = [];

  if (!profile) {
    issues.push("No profile provided");
    return { allowed: false, issues, warnings };
  }

  // Basic structural validation
  const profileValidation = validateProfile(profile) as ValidationResult;
  const parameterValidation = validateParameters(profile) as ValidationResult;

  // If profile structural checks produced issues, report them
  if (profileValidation.issues.length > 0) {
    issues.push(...profileValidation.issues.map((s) => `profile: ${s}`));
  }

  if (parameterValidation.issues.length > 0) {
    issues.push(...parameterValidation.issues.map((s) => `parameters: ${s}`));
  }

  // Special-case legacy allowance: BR may be operational while needs_review; do not allow this for new activations
  if (allowLegacy) {
    // allow legacy BR operational usage even if status != validated
  } else {
    // For real activation gate: require validated status
    if (profile.status !== "validated") {
      issues.push(`Profile status is not 'validated' (actual: ${String(profile.status)})`);
    } else {
      // If validated, require governance metadata
      if (!profile.lastReviewedAt) issues.push("Missing lastReviewedAt for validated profile");
      if (!profile.reviewedBy) issues.push("Missing reviewedBy for validated profile");
      if (!profile.sourceReference) issues.push("Missing sourceReference for validated profile");
      if (!profile.sourceDate) issues.push("Missing sourceDate for validated profile");
    }
  }

  // If there are any issues, activation is denied
  const allowed = issues.length === 0;

  // Collect warnings from validations
  if (profileValidation.warnings.length > 0) warnings.push(...profileValidation.warnings.map((s) => `profile: ${s}`));
  if (parameterValidation.warnings.length > 0) warnings.push(...parameterValidation.warnings.map((s) => `parameters: ${s}`));

  return { allowed, issues, warnings };
}
