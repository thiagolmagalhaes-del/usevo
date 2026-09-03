import { describe, expect, it } from "vitest";
import { applyExifOrientation, getJpegDimensions, getJpegExifOrientation, getOrientedDimensions, normalizeJpegExifOrientation } from "./jpeg-orientation";

const jpeg = (orientation?: number) => {
  const exif = orientation === undefined ? [] : [0xff,0xe1,0,34,0x45,0x78,0x69,0x66,0,0,0x4d,0x4d,0,42,0,0,0,8,0,1,0x01,0x12,0,3,0,0,0,1,0,orientation,0,0,0,0,0,0];
  return new Uint8Array([0xff,0xd8,...exif,0xff,0xc0,0,17,8,0,2,0,3,3,1,17,0,2,17,0,3,17,0,0xff,0xd9]);
};

describe("JPEG EXIF orientation", () => {
  it("uses normal orientation for JPEG without EXIF and explicit Orientation 1", () => {
    expect(getJpegExifOrientation(jpeg())).toBe(1);
    expect(getJpegExifOrientation(jpeg(1))).toBe(1);
  });
  it("reads Orientation 3 without swapping horizontal or vertical dimensions", () => {
    expect(getJpegExifOrientation(jpeg(3))).toBe(3);
    expect(getOrientedDimensions({ width: 3, height: 2 }, 3)).toEqual({ width: 3, height: 2 });
  });
  it("reads Orientation 6 and swaps its final dimensions", () => {
    expect(getJpegExifOrientation(jpeg(6))).toBe(6);
    expect(getJpegDimensions(jpeg(6))).toEqual({ width: 3, height: 2 });
    expect(getOrientedDimensions({ width: 3, height: 2 }, 6)).toEqual({ width: 2, height: 3 });
    expect(getJpegExifOrientation(normalizeJpegExifOrientation(jpeg(6)))).toBe(1);
  });
  it("reads Orientation 8 and swaps its final dimensions", () => {
    expect(getJpegExifOrientation(jpeg(8))).toBe(8);
    expect(getOrientedDimensions({ width: 3, height: 2 }, 8)).toEqual({ width: 2, height: 3 });
  });
  it("supports EXIF mirroring transforms without changing unswapped dimensions", () => {
    const calls: number[][] = [];
    applyExifOrientation({ setTransform: (...values: number[]) => calls.push(values) } as unknown as CanvasRenderingContext2D, 2, 3, 2);
    expect(calls).toEqual([[-1, 0, 0, 1, 3, 0]]);
    expect(getOrientedDimensions({ width: 3, height: 2 }, 2)).toEqual({ width: 3, height: 2 });
  });

  it("keeps the encoded dimensions raw while clearing EXIF before decoding", () => {
    const source = jpeg(8);
    const sanitized = normalizeJpegExifOrientation(source);
    expect(getJpegDimensions(sanitized)).toEqual({ width: 3, height: 2 });
    expect(getOrientedDimensions(getJpegDimensions(sanitized)!, 8)).toEqual({ width: 2, height: 3 });
  });

  it("prevents double rotation by making every decoder receive Orientation 1", () => {
    const rawDecoderInput = normalizeJpegExifOrientation(jpeg(6));
    expect(getJpegExifOrientation(rawDecoderInput)).toBe(1);
    expect(getJpegDimensions(rawDecoderInput)).toEqual({ width: 3, height: 2 });
    expect(getOrientedDimensions({ width: 3, height: 2 }, 6)).toEqual({ width: 2, height: 3 });
  });
});
