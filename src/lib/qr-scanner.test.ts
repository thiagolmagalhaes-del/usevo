import { describe, expect, it, vi } from "vitest";
import {
  classifyQrContent,
  copyQrContent,
  decodeQrPixels,
  getSafeHttpUrl,
  requestBackCamera,
  stopMediaTracks,
} from "./qr-scanner";

describe("QR scanner safety and decoding helpers", () => {
  it("returns decoded content from image pixels and handles images without a QR Code", () => {
    const pixels = new Uint8ClampedArray(4);
    expect(decodeQrPixels(pixels, 1, 1, vi.fn(() => ({ data: "https://usevo.tools" })) as never)).toBe("https://usevo.tools");
    expect(decodeQrPixels(pixels, 1, 1, vi.fn(() => null) as never)).toBeUndefined();
  });

  it("identifies URL, text, email, telephone, and Wi-Fi QR content", () => {
    expect(classifyQrContent("https://usevo.tools/path")).toBe("url");
    expect(classifyQrContent("hello world")).toBe("text");
    expect(classifyQrContent("person@example.com")).toBe("email");
    expect(classifyQrContent("tel:+5511999999999")).toBe("phone");
    expect(classifyQrContent("WIFI:T:WPA;S:network;P:secret;;")).toBe("wifi");
  });

  it("permits only HTTP and HTTPS destinations", () => {
    expect(getSafeHttpUrl("https://example.com/path")?.hostname).toBe("example.com");
    expect(getSafeHttpUrl("http://example.com")?.protocol).toBe("http:");
    expect(getSafeHttpUrl("javascript:alert(1)")).toBeUndefined();
    expect(getSafeHttpUrl("data:text/html,test")).toBeUndefined();
    expect(getSafeHttpUrl("file:///etc/passwd")).toBeUndefined();
  });

  it("requests the rear camera and stops every camera track", async () => {
    const getUserMedia = vi.fn().mockResolvedValue({ getTracks: () => [] });
    await requestBackCamera({ getUserMedia } as never);
    expect(getUserMedia).toHaveBeenCalledWith({ audio: false, video: { facingMode: { ideal: "environment" } } });

    const stopOne = vi.fn();
    const stopTwo = vi.fn();
    stopMediaTracks({ getTracks: () => [{ stop: stopOne }, { stop: stopTwo }] } as never);
    expect(stopOne).toHaveBeenCalledOnce();
    expect(stopTwo).toHaveBeenCalledOnce();
  });

  it("copies decoded content only after an explicit copy action", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    await copyQrContent("https://usevo.tools", { writeText } as never);
    expect(writeText).toHaveBeenCalledWith("https://usevo.tools");
  });
});
