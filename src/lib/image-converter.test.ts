import { describe, expect, it } from "vitest";
import { IMAGE_CONVERTER_LIMITS, ImageConverterError, assertOutputFormat, assertResultSize, detectImageFormat, formatExtension, formatMimeType, getConvertedFileName, getHeaderDimensions, getOutputFormats, validateDimensions, validateInputFile } from "./image-converter";

const jpeg = new Uint8Array([0xff,0xd8,0xff,0xc0,0x00,0x11,0x08,0x00,0x02,0x00,0x03,0x03,0x01,0x11,0x00,0x02,0x11,0x00,0x03,0x11,0x00,0xff,0xd9]);
const png = new Uint8Array([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0,0,0,13,0x49,0x48,0x44,0x52,0,0,0,3,0,0,0,2]);
const webp = new Uint8Array([0x52,0x49,0x46,0x46,22,0,0,0,0x57,0x45,0x42,0x50,0x56,0x50,0x38,0x58,10,0,0,0,0,0,0,0,2,0,0,1,0,0]);

describe("image converter helpers", () => {
  it("detects real JPEG, PNG, and WebP signatures and dimensions", () => {
    expect(detectImageFormat(jpeg)).toBe("jpeg"); expect(detectImageFormat(png)).toBe("png"); expect(detectImageFormat(webp)).toBe("webp");
    expect(getHeaderDimensions(jpeg, "jpeg")).toEqual({ width: 3, height: 2 }); expect(getHeaderDimensions(png, "png")).toEqual({ width: 3, height: 2 }); expect(getHeaderDimensions(webp, "webp")).toEqual({ width: 3, height: 2 });
  });
  it("rejects unknown and truncated headers", () => {
    expect(detectImageFormat(new Uint8Array([1,2,3]))).toBeUndefined(); expect(() => getHeaderDimensions(new Uint8Array([0xff,0xd8,0xff]), "jpeg")).toThrow(ImageConverterError); expect(() => getHeaderDimensions(new Uint8Array([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]), "png")).toThrow(ImageConverterError);
  });
  it("accepts empty MIME and equivalent JPG/JPEG, but rejects real extension and MIME mismatches", async () => {
    await expect(validateInputFile(new File([jpeg], "photo.jpeg", { type: "" }))).resolves.toMatchObject({ format: "jpeg" });
    await expect(validateInputFile(new File([jpeg], "photo.png", { type: "image/png" }))).rejects.toMatchObject({ code: "extension-mismatch" });
    await expect(validateInputFile(new File([png], "photo.png", { type: "image/jpeg" }))).rejects.toMatchObject({ code: "mime-mismatch" });
  });
  it("enforces safe dimensions and source/result limits", () => {
    expect(() => validateDimensions({ width: 8193, height: 1 })).toThrow("dimensions-too-large"); expect(() => validateDimensions({ width: 4000, height: 4001 })).toThrow("dimensions-too-large"); expect(() => assertResultSize(IMAGE_CONVERTER_LIMITS.resultBytes + 1)).toThrow("result-too-large");
  });
  it("rejects an input exceeding the 20 MB source limit before reading it", async () => {
    await expect(validateInputFile({ size: IMAGE_CONVERTER_LIMITS.sourceBytes + 1 } as File)).rejects.toMatchObject({ code: "too-large" });
  });
  it("offers exactly the six cross-format conversions and rejects same-format output", () => {
    expect(getOutputFormats("jpeg")).toEqual(["png", "webp"]); expect(getOutputFormats("png")).toEqual(["jpeg", "webp"]); expect(getOutputFormats("webp")).toEqual(["jpeg", "png"]); expect(() => assertOutputFormat("png", "png")).toThrow("same-format"); expect(() => assertOutputFormat("jpeg", "webp", false)).toThrow("webp-unsupported");
  });
  it("uses correct output MIME, extension, and predictable name", () => {
    expect(formatMimeType("jpeg")).toBe("image/jpeg"); expect(formatExtension("jpeg")).toBe("jpg"); expect(getConvertedFileName("holiday.photo.jpeg", "webp")).toBe("holiday.photo-convertido.webp");
  });
});
