export type WebsiteJsonLd = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  "@id": "https://usevo.tools/#website";
  url: "https://usevo.tools/";
  name: "USEVO Tools";
  description: string;
  inLanguage: readonly ["en", "pt-BR", "es"];
};

export const websiteJsonLd: WebsiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://usevo.tools/#website",
  url: "https://usevo.tools/",
  name: "USEVO Tools",
  description: "Simple, fast, and useful online tools for everyday tasks.",
  inLanguage: ["en", "pt-BR", "es"],
};

export const serializeJsonLd = (data: WebsiteJsonLd) =>
  JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
