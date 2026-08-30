export type BarcodeFormat = "CODE128" | "EAN13" | "EAN8" | "UPC" | "CODE39" | "ITF14";

export const barcodeFormats: readonly BarcodeFormat[] = ["CODE128", "EAN13", "EAN8", "UPC", "CODE39", "ITF14"];

export const getBarcodeFilename = (locale: "pt-BR" | "en" | "es", extension: "png" | "svg") =>
  `${locale === "en" ? "usevo-barcode" : "usevo-codigo-de-barras"}.${extension}`;

export type BarcodeValidationCode =
  | "empty"
  | "code128Characters"
  | "digits"
  | "length"
  | "checkDigit"
  | "code39Characters";

export type BarcodeValidation = {
  valid: boolean;
  value: string;
  code?: BarcodeValidationCode;
};

const code39Characters = /^[0-9A-Z\-\. $/+%]+$/;

export const calculateCheckDigit = (body: string): string => {
  let sum = 0;
  let weight = 3;
  for (let index = body.length - 1; index >= 0; index -= 1) {
    sum += Number(body[index]) * weight;
    weight = weight === 3 ? 1 : 3;
  }
  return String((10 - (sum % 10)) % 10);
};

const validateFixedDigits = (input: string, acceptedLengths: readonly number[]): BarcodeValidation => {
  if (!/^\d+$/.test(input)) return { valid: false, value: input, code: "digits" };
  if (!acceptedLengths.includes(input.length)) return { valid: false, value: input, code: "length" };
  const bodyLength = Math.max(...acceptedLengths) - 1;
  const body = input.length === bodyLength ? input : input.slice(0, -1);
  const value = input.length === bodyLength ? `${input}${calculateCheckDigit(input)}` : input;
  return input.length === bodyLength || calculateCheckDigit(body) === input.at(-1)
    ? { valid: true, value }
    : { valid: false, value: input, code: "checkDigit" };
};

export const validateBarcode = (rawValue: string, format: BarcodeFormat): BarcodeValidation => {
  const value = rawValue;
  if (!value) return { valid: false, value, code: "empty" };

  switch (format) {
    case "CODE128":
      return /^[\x20-\x7E]+$/.test(value)
        ? { valid: true, value }
        : { valid: false, value, code: "code128Characters" };
    case "EAN13":
      return validateFixedDigits(value, [12, 13]);
    case "EAN8":
      return validateFixedDigits(value, [7, 8]);
    case "UPC":
      return validateFixedDigits(value, [11, 12]);
    case "ITF14":
      return validateFixedDigits(value, [13, 14]);
    case "CODE39":
      return code39Characters.test(value)
        ? { valid: true, value }
        : { valid: false, value, code: "code39Characters" };
  }
};
