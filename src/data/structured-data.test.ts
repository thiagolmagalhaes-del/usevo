import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { serializeJsonLd, websiteJsonLd } from "./structured-data";

const readTemplate = (relativePath: string) =>
  readFileSync(new URL(relativePath, import.meta.url), "utf8");

describe("WebSite structured data", () => {
  it("defines only the verified WebSite properties", () => {
    expect(websiteJsonLd).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://usevo.tools/#website",
      url: "https://usevo.tools/",
      name: "USEVO Tools",
      description: "Simple, fast, and useful online tools for everyday tasks.",
      inLanguage: ["en", "pt-BR", "es"],
    });
    expect(websiteJsonLd).not.toHaveProperty("potentialAction");
    expect(websiteJsonLd).not.toHaveProperty("publisher");
  });

  it("serializes valid JSON without raw script-closing characters", () => {
    const serialized = serializeJsonLd(websiteJsonLd);

    expect(JSON.parse(serialized)).toEqual(websiteJsonLd);
    expect(serialized).not.toContain("<");
  });

  it("renders the schema only from the canonical homepage template", () => {
    expect(readTemplate("../pages/index.astro")).toContain("structuredData={websiteJsonLd}");
    expect(readTemplate("../pages/pt-br/index.astro")).not.toContain("structuredData=");
    expect(readTemplate("../pages/es/index.astro")).not.toContain("structuredData=");
  });
});
