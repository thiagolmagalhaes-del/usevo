import { describe, expect, it, vi } from "vitest";
import { downloadPdf, inspectPdfDownload, type PdfDownloadEnvironment } from "./pdf-download";

const createEnvironment = (overrides: Partial<PdfDownloadEnvironment> = {}) => {
  const anchor = { href: "", download: "", style: {}, click: vi.fn(), remove: vi.fn() } as unknown as HTMLAnchorElement;
  const environment: PdfDownloadEnvironment = {
    FileConstructor: class extends File {},
    navigator: { share: vi.fn(), canShare: vi.fn(() => true) } as unknown as Navigator,
    document: { body: { appendChild: vi.fn() }, createElement: vi.fn(() => anchor) } as unknown as Document,
    URL: { createObjectURL: vi.fn(() => "blob:pdf"), revokeObjectURL: vi.fn() },
    setTimeout: vi.fn(),
    ...overrides,
  };
  return { environment, anchor };
};

const blob = new Blob(["%PDF-"], { type: "application/pdf" });
const filename = "usevo-jpg-para-pdf.pdf";

describe("PDF download strategy", () => {
  it("shares a correctly named PDF file when file sharing is supported, without an anchor", async () => {
    const { environment, anchor } = createEnvironment();
    const result = await downloadPdf(blob, filename, environment);
    expect(environment.navigator.canShare).toHaveBeenCalledWith({ files: [expect.any(File)] });
    expect(environment.navigator.share).toHaveBeenCalledWith({ files: [expect.objectContaining({ name: filename, type: "application/pdf" })] });
    expect(anchor.click).not.toHaveBeenCalled();
    expect(result.strategy).toBe("share");
  });

  it("uses the traditional anchor when canShare(files) is false or share is unavailable", async () => {
    const { environment, anchor } = createEnvironment({ navigator: { canShare: vi.fn(() => false) } as unknown as Navigator });
    expect((await downloadPdf(blob, filename, environment)).strategy).toBe("download");
    expect(anchor.download).toBe(filename);
    expect(anchor.click).toHaveBeenCalledOnce();
    const unsupported = createEnvironment({ navigator: {} as Navigator });
    expect((await downloadPdf(blob, filename, unsupported.environment)).strategy).toBe("download");
  });

  it("does not navigate through an anchor after share cancellation or a real share error", async () => {
    const cancelled = createEnvironment({ navigator: { share: vi.fn(() => Promise.reject(new DOMException("cancelled", "AbortError"))), canShare: vi.fn(() => true) } as unknown as Navigator });
    expect((await downloadPdf(blob, filename, cancelled.environment)).strategy).toBe("share-cancelled");
    expect(cancelled.anchor.click).not.toHaveBeenCalled();
    const failed = createEnvironment({ navigator: { share: vi.fn(() => Promise.reject(new Error("share failed"))), canShare: vi.fn(() => true) } as unknown as Navigator });
    const result = await downloadPdf(blob, filename, failed.environment);
    expect(result).toMatchObject({ strategy: "share-error", error: "Error: share failed" });
    expect(failed.anchor.click).not.toHaveBeenCalled();
  });

  it("reports the actual capability state before a user taps download", () => {
    const { environment } = createEnvironment({ navigator: { canShare: vi.fn(() => false) } as unknown as Navigator });
    expect(inspectPdfDownload(blob, filename, environment).diagnostics).toMatchObject({ fileApi: true, shareApi: false, canShareApi: true, canShareFiles: false, strategy: "pending" });
  });
});
