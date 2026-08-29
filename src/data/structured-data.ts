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
  itemListElement: readonly [
    { "@type": "ListItem"; position: 1; name: string; item: string },
    { "@type": "ListItem"; position: 2; name: string; item: string },
    { "@type": "ListItem"; position: 3; name: string },
  ];
};

export type StructuredData = WebsiteJsonLd | BreadcrumbListJsonLd;

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
  items: readonly [BreadcrumbItem, BreadcrumbItem, BreadcrumbItem],
): BreadcrumbListJsonLd => {
  const [home, tools, current] = items;
  if (!home.url || !tools.url) throw new Error("Breadcrumb URLs are required for home and tools.");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home.name, item: home.url },
      { "@type": "ListItem", position: 2, name: tools.name, item: tools.url },
      { "@type": "ListItem", position: 3, name: current.name },
    ],
  };
};

export const serializeJsonLd = (data: StructuredData) =>
  JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
