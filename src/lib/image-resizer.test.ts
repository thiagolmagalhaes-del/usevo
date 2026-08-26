import { describe, expect, it } from "vitest";
import {
  IMAGE_RESIZER_MAX_DIMENSION,
  getOutputMimeType,
  getResizedFileName,
  resizeByPercentage,
  resizeFromHeight,
  resizeFromWidth,
  validateDimensions,
} from "./image-resizer";

describe("image resizer calculations", () => {
  const original = { width: 1_200, height: 800 };

  it("keeps proportion when the width changes", () => {
    expect(resizeFromWidth(original, 600)).toEqual({ width: 600, height: 400 });
  });

  it("keeps proportion when the height changes", () => {
    expect(resizeFromHeight(original, 200)).toEqual({ width: 300, height: 200 });
  });

  it.each([25, 50, 75, 100])("resizes by %i percent", (percentage) => {
    expect(resizeByPercentage(original, percentage)).toEqual({ width: percentage * 12, height: percentage * 8 });
  });

  it("rounds proportional dimensions without producing zero", () => {
    expect(resizeFromWidth({ width: 3, height: 2 }, 1)).toEqual({ width: 1, height: 1 });
    expect(resizeByPercentage({ width: 1, height: 1 }, 25)).toEqual({ width: 1, height: 1 });
  });

  it("rejects zero, negative, non-integer and excessively large dimensions", () => {
    expect(validateDimensions({ width: 0, height: 100 })).toBe("invalid");
    expect(validateDimensions({ width: -1, height: 100 })).toBe("invalid");
    expect(validateDimensions({ width: Number.NaN, height: 100 })).toBe("invalid");
    expect(validateDimensions({ width: 1.5, height: 100 })).toBe("invalid");
    expect(validateDimensions({ width: IMAGE_RESIZER_MAX_DIMENSION + 1, height: 100 })).toBe("too-large");
  });

  it("selects output formats and a clear download filename", () => {
    expect(getOutputMimeType("original", "image/webp")).toBe("image/webp");
    expect(getOutputMimeType("jpeg", "image/png")).toBe("image/jpeg");
    expect(getOutputMimeType("png", "image/jpeg")).toBe("image/png");
    expect(getResizedFileName("holiday.photo.png", "image/jpeg")).toBe("holiday.photo-resized.jpg");
  });
});
