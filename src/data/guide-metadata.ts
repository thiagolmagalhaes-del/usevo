import { guideContent, guideCopy } from "./guide-content";
import { guideIndexRoutes, guideRoutes, type GuideKey } from "./guide-routes";
import { localeRouteConfig, toSiteUrl, type ToolBreadcrumbItem } from "./locale-routes";
import type { Locale } from "./locales";
import type { ArticleJsonLd } from "./structured-data";

export const getGuideBreadcrumb = (locale: Locale, key?: GuideKey) => {
  const copy = guideCopy[locale];
  const home = localeRouteConfig[locale].home;
  const index = guideIndexRoutes[locale];
  const items: ToolBreadcrumbItem[] = [
    { name: copy.home, href: home, url: toSiteUrl(home) },
    key ? { name: copy.name, href: index, url: toSiteUrl(index) } : { name: copy.name },
  ];
  if (key) items.push({ name: guideContent[key][locale].title });
  return { label: copy.breadcrumb, items };
};

export const getGuideArticle = (key: GuideKey, locale: Locale): ArticleJsonLd => {
  const guide = guideContent[key][locale];
  const canonical = toSiteUrl(guideRoutes[key][locale]);
  return {
    "@context": "https://schema.org", "@type": "Article", "@id": `${canonical}#article`,
    headline: guide.title, description: guide.summary, inLanguage: locale, mainEntityOfPage: canonical,
  };
};
