import jsQR from "jsqr";

export type QrContentKind = "url" | "email" | "phone" | "wifi" | "text";

export const getSafeHttpUrl = (value: string) => {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
};

export const classifyQrContent = (value: string): QrContentKind => {
  if (getSafeHttpUrl(value)) return "url";
  if (/^mailto:/i.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "email";
  if (/^tel:/i.test(value) || /^\+?[\d\s().-]{5,}$/.test(value.trim())) return "phone";
  if (/^WIFI:/i.test(value.trim())) return "wifi";
  return "text";
};

export const decodeQrPixels = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
  decoder: typeof jsQR = jsQR,
) => decoder(data, width, height, { inversionAttempts: "attemptBoth" })?.data;

export const stopMediaTracks = (stream?: Pick<MediaStream, "getTracks"> | null) => {
  stream?.getTracks().forEach((track) => track.stop());
};

export const requestBackCamera = (mediaDevices: Pick<MediaDevices, "getUserMedia">) => mediaDevices.getUserMedia({
  audio: false,
  video: { facingMode: { ideal: "environment" } },
});

export const copyQrContent = (value: string, clipboard: Pick<Clipboard, "writeText">) => clipboard.writeText(value);
