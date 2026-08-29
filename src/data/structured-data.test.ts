import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createBreadcrumbListJsonLd, serializeJsonLd, websiteJsonLd } from "./structured-data";

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

describe("BreadcrumbList structured data", () => {
  const items = [
    { name: "Home", href: "/", url: "https://usevo.tools/" },
    { name: "Tools", href: "/en/tools", url: "https://usevo.tools/en/tools" },
    { name: "JSON Formatter" },
  ] as const;

  it("creates three sequential list items and omits item from the current page", () => {
    const schema = createBreadcrumbListJsonLd(items);
    expect(schema.itemListElement.map(({ position }) => position)).toEqual([1, 2, 3]);
    expect(schema.itemListElement[0].item).toBe("https://usevo.tools/");
    expect(schema.itemListElement[1].item).toBe("https://usevo.tools/en/tools");
    expect(schema.itemListElement[2]).toEqual({ "@type": "ListItem", position: 3, name: "JSON Formatter" });
    expect(schema.itemListElement[2]).not.toHaveProperty("item");
  });

  it("serializes BreadcrumbList safely", () => {
    const schema = createBreadcrumbListJsonLd([
      { name: "<Home>", url: "https://usevo.tools/" },
      { name: "Tools", url: "https://usevo.tools/en/tools" },
      { name: "JSON <Formatter>" },
    ]);
    const serialized = serializeJsonLd(schema);
    expect(JSON.parse(serialized)).toEqual(schema);
    expect(serialized).not.toContain("<");
  });
});
