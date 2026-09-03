export type PdfDownloadStrategy = "pending" | "share" | "share-cancelled" | "share-error" | "download";

export type PdfDownloadDiagnostics = {
  fileApi: boolean;
  shareApi: boolean;
  canShareApi: boolean;
  canShareFiles: boolean | null;
  canShareError?: string;
  strategy: PdfDownloadStrategy;
  error?: string;
};

type FileConstructor = new (parts: BlobPart[], name: string, options?: FilePropertyBag) => File;
type ShareNavigator = Pick<Navigator, "share" | "canShare">;
type DownloadDocument = Pick<Document, "body" | "createElement">;

export type PdfDownloadEnvironment = {
  FileConstructor?: FileConstructor;
  navigator: ShareNavigator;
  document: DownloadDocument;
  URL: Pick<typeof URL, "createObjectURL" | "revokeObjectURL">;
  setTimeout: typeof setTimeout;
};

export const browserPdfDownloadEnvironment = (): PdfDownloadEnvironment => ({
  FileConstructor: globalThis.File,
  navigator: globalThis.navigator,
  document: globalThis.document,
  URL: globalThis.URL,
  setTimeout: globalThis.setTimeout,
});

export const inspectPdfDownload = (blob: Blob, filename: string, environment: PdfDownloadEnvironment) => {
  const fileApi = typeof environment.FileConstructor === "function";
  const shareApi = typeof environment.navigator.share === "function";
  const canShareApi = typeof environment.navigator.canShare === "function";
  const file = fileApi ? new environment.FileConstructor!([blob], filename, { type: "application/pdf" }) : undefined;
  let canShareFiles: boolean | null = null;
  let canShareError: string | undefined;
  if (file && canShareApi) {
    try { canShareFiles = environment.navigator.canShare!({ files: [file] }); } catch (error) { canShareFiles = false; canShareError = `${errorName(error)}: ${errorMessage(error)}`; }
  }
  return { file, diagnostics: { fileApi, shareApi, canShareApi, canShareFiles, canShareError, strategy: "pending" as const } };
};

const triggerTraditionalPdfDownload = (blob: Blob, filename: string, environment: PdfDownloadEnvironment) => {
  const downloadUrl = environment.URL.createObjectURL(blob);
  const link = environment.document.createElement("a") as HTMLAnchorElement;
  link.href = downloadUrl;
  link.download = filename;
  link.style.display = "none";
  environment.document.body.appendChild(link);
  link.click();
  link.remove();
  environment.setTimeout(() => environment.URL.revokeObjectURL(downloadUrl), 60_000);
};

const errorName = (error: unknown) => typeof error === "object" && error && "name" in error && typeof error.name === "string" ? error.name : String(error);
const errorMessage = (error: unknown) => typeof error === "object" && error && "message" in error && typeof error.message === "string" ? error.message : String(error);

export const downloadPdf = async (blob: Blob, filename: string, environment: PdfDownloadEnvironment): Promise<PdfDownloadDiagnostics> => {
  const { file, diagnostics } = inspectPdfDownload(blob, filename, environment);
  if (file && diagnostics.shareApi && diagnostics.canShareFiles) {
    try {
      await environment.navigator.share!({ files: [file] });
      return { ...diagnostics, strategy: "share" };
    } catch (error) {
      const details = `${errorName(error)}: ${errorMessage(error)}`;
      if (errorName(error) === "AbortError") return { ...diagnostics, strategy: "share-cancelled" };
      return { ...diagnostics, strategy: "share-error", error: details };
    }
  }
  triggerTraditionalPdfDownload(blob, filename, environment);
  return { ...diagnostics, strategy: "download" };
};
