import { describe, expect, it } from "vitest";
import { barcodeFormats, calculateCheckDigit, getBarcodeFilename, validateBarcode } from "./barcode-generator";

describe("barcode validation", () => {
  it("accepts CODE128 text and rejects unsupported control characters", () => {
    expect(validateBarcode("USEVO-2026", "CODE128")).toEqual({ valid: true, value: "USEVO-2026" });
    expect(validateBarcode("line\ncode", "CODE128").code).toBe("code128Characters");
  });

  it("calculates and validates EAN-13 check digits", () => {
    expect(calculateCheckDigit("400638133393")).toBe("1");
    expect(validateBarcode("400638133393", "EAN13")).toEqual({ valid: true, value: "4006381333931" });
    expect(validateBarcode("4006381333931", "EAN13").valid).toBe(true);
    expect(validateBarcode("4006381333932", "EAN13").code).toBe("checkDigit");
  });

  it("validates EAN-8, UPC-A, and ITF-14 lengths and check digits", () => {
    expect(validateBarcode("9638507", "EAN8")).toEqual({ valid: true, value: "96385074" });
    expect(validateBarcode("96385074", "EAN8").valid).toBe(true);
    expect(validateBarcode("96385070", "EAN8").code).toBe("checkDigit");
    expect(validateBarcode("03600029145", "UPC")).toEqual({ valid: true, value: "036000291452" });
    expect(validateBarcode("036000291452", "UPC").valid).toBe(true);
    expect(validateBarcode("036000291451", "UPC").code).toBe("checkDigit");
    expect(validateBarcode("1001234567890", "ITF14")).toEqual({ valid: true, value: "10012345678902" });
    expect(validateBarcode("10012345678902", "ITF14").valid).toBe(true);
    expect(validateBarcode("10012345678901", "ITF14").code).toBe("checkDigit");
  });

  it("accepts only the supported CODE39 character set", () => {
    expect(validateBarcode("ABC-39 /+%", "CODE39").valid).toBe(true);
    expect(validateBarcode("abc", "CODE39").code).toBe("code39Characters");
    expect(validateBarcode("ABC_39", "CODE39").code).toBe("code39Characters");
  });

  it("handles empty input and exposes only the supported formats", () => {
    expect(validateBarcode("", "CODE128").code).toBe("empty");
    expect(barcodeFormats).toEqual(["CODE128", "EAN13", "EAN8", "UPC", "CODE39", "ITF14"]);
    expect(getBarcodeFilename("en", "png")).toBe("usevo-barcode.png");
    expect(getBarcodeFilename("pt-BR", "svg")).toBe("usevo-codigo-de-barras.svg");
    expect(getBarcodeFilename("es", "png")).toBe("usevo-codigo-de-barras.png");
  });
});
