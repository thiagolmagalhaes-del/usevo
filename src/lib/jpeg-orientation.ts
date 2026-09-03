export type ExifOrientation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ImageDimensions = { width: number; height: number };

const isJpeg = (bytes: Uint8Array) => bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xd8;

const orientationValue = (value: number): ExifOrientation => value >= 1 && value <= 8 ? value as ExifOrientation : 1;

type ExifOrientationEntry = { orientation: ExifOrientation; valueOffset: number; littleEndian: boolean };

const getExifOrientationEntry = (source: ArrayBuffer | Uint8Array): ExifOrientationEntry | undefined => {
  const bytes = source instanceof Uint8Array ? source : new Uint8Array(source);
  if (!isJpeg(bytes)) return undefined;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 2;

  while (offset + 4 <= view.byteLength) {
    if (view.getUint8(offset) !== 0xff) { offset += 1; continue; }
    const marker = view.getUint8(offset + 1);
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) continue;
    if (offset + 2 > view.byteLength) return undefined;
    const length = view.getUint16(offset, false);
    if (length < 2 || offset + length > view.byteLength) return undefined;

    if (marker === 0xe1 && length >= 10 && view.getUint32(offset + 2, false) === 0x45786966 && view.getUint16(offset + 6, false) === 0) {
      const tiff = offset + 8;
      if (tiff + 8 > view.byteLength) return undefined;
      const byteOrder = view.getUint16(tiff, false);
      const littleEndian = byteOrder === 0x4949;
      if (!littleEndian && byteOrder !== 0x4d4d) return undefined;
      if (view.getUint16(tiff + 2, littleEndian) !== 0x002a) return undefined;
      const ifd = tiff + view.getUint32(tiff + 4, littleEndian);
      if (ifd + 2 > view.byteLength) return undefined;
      const entries = view.getUint16(ifd, littleEndian);
      for (let index = 0; index < entries; index += 1) {
        const entry = ifd + 2 + index * 12;
        if (entry + 12 > view.byteLength) return undefined;
        if (view.getUint16(entry, littleEndian) === 0x0112) return { orientation: orientationValue(view.getUint16(entry + 8, littleEndian)), valueOffset: entry + 8, littleEndian };
      }
    }
    offset += length;
  }
  return undefined;
};

export const getJpegExifOrientation = (source: ArrayBuffer | Uint8Array): ExifOrientation => getExifOrientationEntry(source)?.orientation ?? 1;

export const normalizeJpegExifOrientation = (source: ArrayBuffer | Uint8Array) => {
  const bytes = source instanceof Uint8Array ? source : new Uint8Array(source);
  const normalized = new Uint8Array(bytes);
  const entry = getExifOrientationEntry(normalized);
  if (entry) new DataView(normalized.buffer, normalized.byteOffset, normalized.byteLength).setUint16(entry.valueOffset, 1, entry.littleEndian);
  return normalized;
};

export const getJpegDimensions = (source: ArrayBuffer | Uint8Array): ImageDimensions | undefined => {
  const bytes = source instanceof Uint8Array ? source : new Uint8Array(source);
  if (!isJpeg(bytes)) return undefined;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 2;
  while (offset + 9 <= view.byteLength) {
    if (view.getUint8(offset) !== 0xff) { offset += 1; continue; }
    const marker = view.getUint8(offset + 1);
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) continue;
    if (offset + 2 > view.byteLength) return undefined;
    const length = view.getUint16(offset, false);
    if (length < 2 || offset + length > view.byteLength) return undefined;
    if ((marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf)) {
      return { height: view.getUint16(offset + 3, false), width: view.getUint16(offset + 5, false) };
    }
    offset += length;
  }
  return undefined;
};

export const getOrientedDimensions = ({ width, height }: ImageDimensions, orientation: ExifOrientation): ImageDimensions =>
  orientation >= 5 ? { width: height, height: width } : { width, height };

export const applyExifOrientation = (context: CanvasRenderingContext2D, orientation: ExifOrientation, width: number, height: number) => {
  const transforms: Record<ExifOrientation, [number, number, number, number, number, number]> = {
    1: [1, 0, 0, 1, 0, 0], 2: [-1, 0, 0, 1, width, 0], 3: [-1, 0, 0, -1, width, height], 4: [1, 0, 0, -1, 0, height],
    5: [0, 1, 1, 0, 0, 0], 6: [0, 1, -1, 0, height, 0], 7: [0, -1, -1, 0, height, width], 8: [0, -1, 1, 0, 0, width],
  };
  context.setTransform(...transforms[orientation]);
};

const readDataUrl = (file: Blob) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("read"));
  reader.onerror = () => reject(new Error("read"));
  reader.readAsDataURL(file);
});

const loadImage = (dataUrl: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error("decode"));
  image.src = dataUrl;
});

type DecodedImage = { source: CanvasImageSource; width: number; height: number; close?: () => void };

const decodeImage = async (file: Blob, dataUrl: string): Promise<DecodedImage> => {
  if ("createImageBitmap" in globalThis) {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "none" });
      return { source: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close() };
    } catch { /* Safari fallback below. */ }
  }
  const image = await loadImage(dataUrl);
  return { source: image, width: image.naturalWidth, height: image.naturalHeight };
};

export const normalizeImageForPdf = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const orientation = getJpegExifOrientation(bytes);
  const decodeFile = isJpeg(new Uint8Array(bytes)) ? new Blob([normalizeJpegExifOrientation(bytes)], { type: "image/jpeg" }) : file;
  const dataUrl = await readDataUrl(decodeFile);
  const decoded = await decodeImage(decodeFile, dataUrl);
  try {
    const dimensions = getOrientedDimensions({ width: decoded.width, height: decoded.height }, orientation);
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("canvas");
    applyExifOrientation(context, orientation, decoded.width, decoded.height);
    context.drawImage(decoded.source, 0, 0);
    const isPng = file.type === "image/png" || /\.png$/i.test(file.name);
    return { dataUrl: canvas.toDataURL(isPng ? "image/png" : "image/jpeg", isPng ? undefined : 1), dimensions };
  } finally {
    decoded.close?.();
  }
};
