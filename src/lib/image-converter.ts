export const IMAGE_CONVERTER_LIMITS = {
  sourceBytes: 20 * 1024 * 1024,
  maxDimension: 8_192,
  maxPixels: 16_000_000,
  resultBytes: 50 * 1024 * 1024,
} as const;

export type ImageConverterFormat = "jpeg" | "png" | "webp";
export type ImageConverterDimensions = { width: number; height: number };

export class ImageConverterError extends Error {
  constructor(public readonly code: "too-large" | "invalid-file" | "extension-mismatch" | "mime-mismatch" | "dimensions-too-large" | "result-too-large" | "same-format" | "webp-unsupported") {
    super(code);
  }
}

const isJpeg = (bytes: Uint8Array) => bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
const isPng = (bytes: Uint8Array) => bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value);
const isWebp = (bytes: Uint8Array) => bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";

export const detectImageFormat = (bytes: Uint8Array): ImageConverterFormat | undefined => isJpeg(bytes) ? "jpeg" : isPng(bytes) ? "png" : isWebp(bytes) ? "webp" : undefined;

export const formatMimeType = (format: ImageConverterFormat) => format === "jpeg" ? "image/jpeg" : `image/${format}`;
export const formatExtension = (format: ImageConverterFormat) => format === "jpeg" ? "jpg" : format;
export const formatLabel = (format: ImageConverterFormat) => format === "jpeg" ? "JPG" : format.toUpperCase();

export const getExtensionFormat = (name: string): ImageConverterFormat | undefined => {
  const extension = name.match(/\.([^.]+)$/)?.[1]?.toLowerCase();
  return extension === "jpg" || extension === "jpeg" ? "jpeg" : extension === "png" || extension === "webp" ? extension : undefined;
};

export const getMimeFormat = (mimeType: string): ImageConverterFormat | undefined => mimeType === "image/jpeg" ? "jpeg" : mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : undefined;

const readU16BE = (bytes: Uint8Array, offset: number) => (bytes[offset] << 8) | bytes[offset + 1];
const readU24LE = (bytes: Uint8Array, offset: number) => bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16);
const readU32LE = (bytes: Uint8Array, offset: number) => bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24);

const jpegDimensions = (bytes: Uint8Array): ImageConverterDimensions => {
  if (!isJpeg(bytes)) throw new ImageConverterError("invalid-file");
  let offset = 2;
  while (offset < bytes.length) {
    while (bytes[offset] === 0xff) offset += 1;
    const marker = bytes[offset++];
    if (marker === undefined || marker === 0xd9 || marker === 0xda) break;
    if (marker >= 0xd0 && marker <= 0xd7 || marker === 0x01) continue;
    if (offset + 2 > bytes.length) throw new ImageConverterError("invalid-file");
    const length = readU16BE(bytes, offset);
    if (length < 2 || offset + length > bytes.length) throw new ImageConverterError("invalid-file");
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      if (length < 8) throw new ImageConverterError("invalid-file");
      return { width: readU16BE(bytes, offset + 5), height: readU16BE(bytes, offset + 3) };
    }
    offset += length;
  }
  throw new ImageConverterError("invalid-file");
};

const pngDimensions = (bytes: Uint8Array): ImageConverterDimensions => {
  if (!isPng(bytes) || bytes.length < 24 || String.fromCharCode(...bytes.slice(12, 16)) !== "IHDR") throw new ImageConverterError("invalid-file");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return { width: view.getUint32(16), height: view.getUint32(20) };
};

const webpDimensions = (bytes: Uint8Array): ImageConverterDimensions => {
  if (!isWebp(bytes) || bytes.length < 20) throw new ImageConverterError("invalid-file");
  const declaredSize = readU32LE(bytes, 4);
  if (declaredSize < 4 || declaredSize + 8 > bytes.length) throw new ImageConverterError("invalid-file");
  const chunk = String.fromCharCode(...bytes.slice(12, 16));
  if (chunk === "VP8X" && bytes.length >= 30) return { width: readU24LE(bytes, 24) + 1, height: readU24LE(bytes, 27) + 1 };
  if (chunk === "VP8L" && bytes.length >= 25 && bytes[20] === 0x2f) return { width: 1 + bytes[21] + ((bytes[22] & 0x3f) << 8), height: 1 + (bytes[22] >> 6) + (bytes[23] << 2) + ((bytes[24] & 0x0f) << 10) };
  if (chunk === "VP8 " && bytes.length >= 30 && bytes[23] === 0x9d && bytes[24] === 0x01 && bytes[25] === 0x2a) return { width: readU16BE(bytes.slice(26, 28), 0) & 0x3fff, height: readU16BE(bytes.slice(28, 30), 0) & 0x3fff };
  throw new ImageConverterError("invalid-file");
};

export const getHeaderDimensions = (bytes: Uint8Array, format: ImageConverterFormat): ImageConverterDimensions => format === "jpeg" ? jpegDimensions(bytes) : format === "png" ? pngDimensions(bytes) : webpDimensions(bytes);

export const validateDimensions = ({ width, height }: ImageConverterDimensions) => {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) throw new ImageConverterError("invalid-file");
  if (width > IMAGE_CONVERTER_LIMITS.maxDimension || height > IMAGE_CONVERTER_LIMITS.maxDimension || width * height > IMAGE_CONVERTER_LIMITS.maxPixels) throw new ImageConverterError("dimensions-too-large");
};

export const validateInputFile = async (file: File): Promise<{ format: ImageConverterFormat; dimensions: ImageConverterDimensions }> => {
  if (!file.size || file.size > IMAGE_CONVERTER_LIMITS.sourceBytes) throw new ImageConverterError("too-large");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const format = detectImageFormat(bytes);
  if (!format) throw new ImageConverterError("invalid-file");
  const extensionFormat = getExtensionFormat(file.name);
  if (!extensionFormat || extensionFormat !== format) throw new ImageConverterError("extension-mismatch");
  if (file.type && getMimeFormat(file.type) !== format) throw new ImageConverterError("mime-mismatch");
  const dimensions = getHeaderDimensions(bytes, format);
  validateDimensions(dimensions);
  return { format, dimensions };
};

export const getOutputFormats = (source: ImageConverterFormat, webpSupported = true) => (["jpeg", "png", "webp"] as const).filter((format) => format !== source && (format !== "webp" || webpSupported));
export const assertOutputFormat = (source: ImageConverterFormat, output: ImageConverterFormat, webpSupported = true) => {
  if (source === output) throw new ImageConverterError("same-format");
  if (output === "webp" && !webpSupported) throw new ImageConverterError("webp-unsupported");
};
export const getConvertedFileName = (fileName: string, format: ImageConverterFormat) => `${fileName.replace(/\.[^.]+$/, "") || "image"}-convertido.${formatExtension(format)}`;
export const assertResultSize = (bytes: number) => { if (!bytes || bytes > IMAGE_CONVERTER_LIMITS.resultBytes) throw new ImageConverterError("result-too-large"); };
