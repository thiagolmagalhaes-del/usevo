import { describe, expect, it } from "vitest";
import { copyText, fontStyleIds, transformText } from "./font-generator";

describe("font generator transformations", () => {
  it("creates the principal Unicode styles", () => {
    expect(transformText("Ab9", "bold")).toBe("𝐀𝐛𝟗");
    expect(transformText("Ab", "italic")).toBe("𝐴𝑏");
    expect(transformText("Ab", "boldItalic")).toBe("𝑨𝒃");
    expect(transformText("Ab", "script")).toBe("𝒜𝒷");
    expect(transformText("Ab", "doubleStruck")).toBe("𝔸𝕓");
    expect(transformText("Ab", "monospace")).toBe("𝙰𝚋");
    expect(transformText("Ab", "circled")).toBe("Ⓐⓑ");
    expect(transformText("AB", "squared")).toBe("🄰🄱");
  });

  it("preserves spaces, punctuation, accents, and unsupported characters", () => {
    expect(transformText("Olá, 42! 🧰", "bold")).toBe("𝐎𝐥á, 𝟒𝟐! 🧰");
    expect(transformText("á é ñ", "fullwidth")).toBe("á é ñ");
    expect(transformText("Qx", "smallCaps")).toBe("Qx");
    expect(transformText("A B", "underline")).toBe("A̲ B̲");
  });

  it("handles empty input and includes every advertised style", () => {
    expect(transformText("", "sansBold")).toBe("");
    expect(fontStyleIds).toHaveLength(19);
    expect(transformText("Text", "alternatingCase")).toBe("TeXt");
  });

  it("copies an entire generated result through the provided clipboard", async () => {
    const writes: string[] = [];
    await expect(copyText("𝓣𝓮𝔁𝓽", { writeText: async (value) => { writes.push(value); } })).resolves.toBe(true);
    expect(writes).toEqual(["𝓣𝓮𝔁𝓽"]);
    await expect(copyText("", { writeText: async () => undefined })).resolves.toBe(false);
  });
});
