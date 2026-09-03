import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const page = readFileSync(new URL("../pages/ferramentas/jpg-para-pdf.astro", import.meta.url), "utf8");

describe("JPG to PDF post-conversion actions", () => {
  it("renders static accessible download and open controls with complete button styling", () => {
    expect(page).toContain('<div id="downloadActions" class="download-actions" hidden>');
    expect(page).toContain('<button id="downloadPdf" type="button">{ui.downloadPdf}</button>');
    expect(page).toContain('<a id="openPdf" class="secondary" href="#" target="_blank" rel="noopener noreferrer">{ui.openPdf}</a>');
    expect(page).toContain("display: flex;");
    expect(page).toContain("justify-content: center;");
    expect(page).toContain("min-height: 48px;");
    expect(page).toContain("color: #ffffff;");
    expect(page).toContain("outline: 3px solid #93c5fd;");
    expect(page).toContain("flex-direction: column;");
  });

  it("keeps the existing Blob URL download and open behavior", () => {
    expect(page).toContain("openPdf.href = currentPdfUrl;");
    expect(page).toContain("downloadActions.hidden = false;");
  });

  it("delegates download capability checks and execution to the PDF download module", () => {
    expect(page).toContain("downloadPdfButton.addEventListener(\"click\", downloadPdfFile);");
    expect(page).toContain('import { browserPdfDownloadEnvironment, downloadPdf, inspectPdfDownload } from "../../lib/pdf-download";');
    expect(page).toContain("void downloadPdf(currentPdfBlob, pdfFilename, browserPdfDownloadEnvironment());");
    expect(page).toContain("const sharePromise = navigator.share({ files: [preparedDownload.file] });");
  });

  it("keeps opening separate from downloading and enables diagnostics only with its explicit query parameter", () => {
    expect(page).not.toContain("window.open(");
    expect(page).not.toContain("downloadPdf.href = currentPdfUrl;");
    expect(page).not.toContain("application/octet-stream");
    expect(page).not.toContain("isAppleTouchDevice");
    expect(page).toContain('get("download-diagnostics") === "1"');
    expect(page).toContain('id="downloadDiagnostics" class="download-diagnostics" role="status" aria-live="polite" hidden');
    expect(page).toContain("Clique recebido.");
    expect(page).toContain("if (downloadDiagnosticsMode) return;");
    expect(page).toContain("navigator.canShare({ files: [pdfFile] })");
  });

  it("invokes share before any diagnostic rendering or asynchronous work in the click handler", () => {
    const handler = page.slice(page.indexOf("function downloadPdfFile()"), page.indexOf("function clearSelection()"));
    const shareCall = handler.indexOf("const sharePromise = navigator.share({ files: [preparedDownload.file] });");
    const firstDiagnosticRender = handler.indexOf("appendDownloadDiagnostic(");
    expect(shareCall).toBeGreaterThan(-1);
    expect(firstDiagnosticRender).toBeGreaterThan(shareCall);
    expect(handler.slice(0, shareCall)).not.toContain("await");
    expect(handler.slice(0, shareCall)).not.toContain("setTimeout");
    expect(handler.slice(0, shareCall)).not.toContain("requestAnimationFrame");
  });

  it("normalizes pixels before both preview and PDF generation", () => {
    expect(page).toContain('import { normalizeImageForPdf } from "../../lib/jpeg-orientation";');
    expect(page).toContain("const normalized = await normalizeImageForPdf(file);");
    expect(page).toContain("preview.src = normalized.dataUrl;");
    expect(page).toContain("pdf.addImage(dataUrl, imageFormat, 0, 0, dimensions.width, dimensions.height);");
  });
});
