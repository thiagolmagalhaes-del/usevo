import type { Locale } from "../../../data/locales";

type ValidationCopy = {
  required: string;
  number: string;
  negative: string;
  integer: string;
  rate: string;
  unavailable: string;
  fallback: string;
};

const validationCopy: Record<Locale, ValidationCopy> = {
  "pt-BR": {
    required: "O campo {field} é obrigatório.",
    number: "O campo {field} deve ser um número válido.",
    negative: "O campo {field} não pode ser negativo.",
    integer: "O campo {field} deve ser um número inteiro.",
    rate: "Os impostos estimados devem estar entre 0 e 100%.",
    unavailable: "Este país não está disponível para cálculo.",
    fallback: "Não foi possível validar os dados informados.",
  },
  en: {
    required: "{field} is required.",
    number: "{field} must be a valid number.",
    negative: "{field} cannot be negative.",
    integer: "{field} must be a whole number.",
    rate: "Estimated taxes must be between 0 and 100%.",
    unavailable: "This country is not available for calculation.",
    fallback: "The entered data could not be validated.",
  },
  es: {
    required: "El campo {field} es obligatorio.",
    number: "El campo {field} debe ser un número válido.",
    negative: "El campo {field} no puede ser negativo.",
    integer: "El campo {field} debe ser un número entero.",
    rate: "Los impuestos estimados deben estar entre 0 y 100%.",
    unavailable: "Este país no está disponible para cálculo.",
    fallback: "No se pudieron validar los datos ingresados.",
  },
};

export function localizeCalculatorValidationIssue(issue: string, locale: Locale, fieldLabels: Record<string, string>) {
  const copy = validationCopy[locale];
  if (issue === "This country is not available for calculation.") return copy.unavailable;
  if (issue === "taxRatePercent must be between 0 and 100.") return copy.rate;

  const match = issue.match(/^(\w+) (is required\.|must be a valid number\.|cannot be negative\.|must be a whole number\.)$/);
  if (!match || !fieldLabels[match[1]]) return copy.fallback;

  const template = match[2] === "is required."
    ? copy.required
    : match[2] === "must be a valid number."
      ? copy.number
      : match[2] === "cannot be negative."
        ? copy.negative
        : copy.integer;
  return template.replace("{field}", fieldLabels[match[1]]);
}
