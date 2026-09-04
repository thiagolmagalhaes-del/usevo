import type { Locale } from "../data/locales";

export const caseConverterModes = [
  "uppercase",
  "lowercase",
  "sentence",
  "capitalize",
  "invert",
] as const;

export type CaseConverterMode = (typeof caseConverterModes)[number];

const isCasedCharacter = (character: string, locale: Locale) =>
  character.toLocaleUpperCase(locale) !== character.toLocaleLowerCase(locale);

const toSentenceCase = (text: string, locale: Locale) => {
  const lowered = text.toLocaleLowerCase(locale);
  let shouldCapitalize = true;
  let result = "";

  for (const character of lowered) {
    if (shouldCapitalize && isCasedCharacter(character, locale)) {
      result += character.toLocaleUpperCase(locale);
      shouldCapitalize = false;
    } else {
      result += character;
    }

    if (character === "." || character === "!" || character === "?") shouldCapitalize = true;
  }

  return result;
};

const capitalizeWords = (text: string, locale: Locale) => {
  const lowered = text.toLocaleLowerCase(locale);
  let isAtTokenStart = true;
  let result = "";

  for (const character of lowered) {
    if (/\s/u.test(character)) {
      result += character;
      isAtTokenStart = true;
      continue;
    }

    if (isAtTokenStart && isCasedCharacter(character, locale)) {
      result += character.toLocaleUpperCase(locale);
      isAtTokenStart = false;
      continue;
    }

    result += character;
  }

  return result;
};

const invertCase = (text: string, locale: Locale) => {
  let result = "";

  for (const character of text) {
    if (!isCasedCharacter(character, locale)) {
      result += character;
      continue;
    }

    result += character === character.toLocaleUpperCase(locale)
      ? character.toLocaleLowerCase(locale)
      : character.toLocaleUpperCase(locale);
  }

  return result;
};

export const convertCase = (text: string, mode: CaseConverterMode, locale: Locale) => {
  switch (mode) {
    case "uppercase":
      return text.toLocaleUpperCase(locale);
    case "lowercase":
      return text.toLocaleLowerCase(locale);
    case "sentence":
      return toSentenceCase(text, locale);
    case "capitalize":
      return capitalizeWords(text, locale);
    case "invert":
      return invertCase(text, locale);
  }
};
