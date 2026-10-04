export type WebsiteJsonLd = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  "@id": "https://usevo.tools/#website";
  url: "https://usevo.tools/";
  name: "USEVO Tools";
  description: string;
  inLanguage: readonly ["en", "pt-BR", "es"];
};

export type BreadcrumbListJsonLd = {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: readonly { "@type": "ListItem"; position: number; name: string; item?: string }[];
};

export type ArticleJsonLd = {
  "@context": "https://schema.org";
  "@type": "Article";
  "@id": string;
  headline: string;
  description: string;
  inLanguage: string;
  mainEntityOfPage: string;
};

export type StructuredData = WebsiteJsonLd | BreadcrumbListJsonLd | ArticleJsonLd;

type BreadcrumbItem = { name: string; href?: string; url?: string };

export const websiteJsonLd: WebsiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://usevo.tools/#website",
  url: "https://usevo.tools/",
  name: "USEVO Tools",
  description: "Simple, fast, and useful online tools for everyday tasks.",
  inLanguage: ["en", "pt-BR", "es"],
};

export const createBreadcrumbListJsonLd = (
  items: readonly BreadcrumbItem[],
): BreadcrumbListJsonLd => {
  if (items.length < 2 || items.slice(0, -1).some((item) => !item.url)) {
    throw new Error("Breadcrumb URLs are required for ancestor pages.");
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name,
      ...(index < items.length - 1 ? { item: item.url } : {}),
    })),
  };
};

export const serializeJsonLd = (data: StructuredData) =>
  JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
