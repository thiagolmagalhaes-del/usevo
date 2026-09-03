import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync(new URL("../components/tools/WheelOfNames.astro", import.meta.url), "utf8");
const logic = readFileSync(new URL("./wheel-of-names.ts", import.meta.url), "utf8");
const page = readFileSync(new URL("../pages/ferramentas/roleta-de-nomes.astro", import.meta.url), "utf8");

describe("wheel of names UI contract", () => {
  it("provides localized controls, accessible feedback, and idempotent SVG rendering", () => {
    for (const id of ["wheelInput", "wheelSpin", "wheelShuffle", "wheelClear", "wheelRestore", "wheelWinner", "wheelCopyWinner", "wheelAgain", "wheelRemove", "wheelClearHistory", "wheelSvg"]) expect(component).toContain(`id="${id}"`);
    expect(component).toContain('label for="wheelInput"');
    expect(component).toContain('role="alert" aria-live="polite"');
    expect(component).toContain('role="status" aria-live="polite"');
    expect(logic).toContain("cryptoSource");
    expect(component).toContain("replaceChildren()");
    expect(component).toContain("createElementNS");
    expect(component).toContain("text.textContent");
    expect(component).toContain("prefers-reduced-motion");
    expect(component).toContain("border-top:28px solid #172033");
    expect(component).toContain("border-bottom:0");
    expect(component).not.toContain('role="dialog"');
    expect(component).toContain("winnerSnapshot");
    expect(component).toContain("isWinnerSnapshotCurrent");
    expect(component).toContain("removeAria");
    expect(component).toContain("setRemoveAction(selectedWinner)");
    expect(component).toContain("-webkit-line-clamp:2");
    expect(component).toContain("winner-action--danger");
    expect(component).toContain("winner-action--neutral");
    expect(component).not.toMatch(/\bfetch\s*\(/);
    expect(component).not.toContain("localStorage");
    expect(component).not.toContain("sessionStorage");
    expect(component).not.toContain("innerHTML");
    expect(component).not.toMatch(/console\.(log|error|warn)/);
  });
  it("uses the shared layout, tool component, and editorial content", () => {
    expect(page).toContain("<Layout");
    expect(page).toContain("<WheelOfNames locale={locale} />");
    expect(page).toContain("<ToolEditorialContent");
    expect(page.match(/<h1(?:\s|>)/g) ?? []).toHaveLength(1);
  });
});
