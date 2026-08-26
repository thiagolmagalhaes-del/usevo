export const IMAGE_RESIZER_MAX_DIMENSION = 8_192;
export const IMAGE_RESIZER_MAX_PIXELS = 40_000_000;

export type ImageDimensions = {
  width: number;
  height: number;
};

export type ImageOutputFormat = "original" | "jpeg" | "png" | "webp";

export const isPositiveInteger = (value: number) => Number.isInteger(value) && value > 0;

export const validateDimensions = ({ width, height }: ImageDimensions) => {
  if (!isPositiveInteger(width) || !isPositiveInteger(height)) return "invalid" as const;
  if (width > IMAGE_RESIZER_MAX_DIMENSION || height > IMAGE_RESIZER_MAX_DIMENSION || width * height > IMAGE_RESIZER_MAX_PIXELS) {
    return "too-large" as const;
  }
  return undefined;
};

const roundedDimension = (value: number) => Math.max(1, Math.round(value));

export const resizeFromWidth = (original: ImageDimensions, width: number): ImageDimensions => ({
  width,
  height: roundedDimension((width * original.height) / original.width),
});

export const resizeFromHeight = (original: ImageDimensions, height: number): ImageDimensions => ({
  width: roundedDimension((height * original.width) / original.height),
  height,
});

export const resizeByPercentage = (original: ImageDimensions, percentage: number): ImageDimensions => ({
  width: roundedDimension((original.width * percentage) / 100),
  height: roundedDimension((original.height * percentage) / 100),
});

export const getOutputMimeType = (format: ImageOutputFormat, originalType: string) => {
  if (format === "original") return originalType === "image/png" || originalType === "image/webp" || originalType === "image/jpeg" ? originalType : "image/png";
  return `image/${format}`;
};

export const getOutputExtension = (mimeType: string) => ({
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}[mimeType] ?? "png");

export const getResizedFileName = (fileName: string, mimeType: string) => {
  const baseName = fileName.replace(/\.[^.]+$/, "") || "image";
  return `${baseName}-resized.${getOutputExtension(mimeType)}`;
};

export const isSupportedImageFile = (file: { type: string; name: string }) => {
  if (["image/jpeg", "image/png", "image/webp"].includes(file.type)) return true;
  return /\.(jpe?g|png|webp)$/i.test(file.name);
};
