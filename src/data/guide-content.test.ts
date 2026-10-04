import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { guideContent, guideCopy } from "./guide-content";
import { GUIDE_KEYS, guideIndexRoutes, guideRoutes } from "./guide-routes";
import { getGuideArticle, getGuideBreadcrumb } from "./guide-metadata";
import { ferramentas } from "./ferramentas";
import { SUPPORTED_LOCALES } from "./locales";
import { getCanonicalUrl, getHreflangAlternates, getLocaleNavigationRoutes, getSiteAlternates, getToolLocaleRoute, toSiteUrl } from "./locale-routes";
import { createBreadcrumbListJsonLd, serializeJsonLd } from "./structured-data";

const allowedTools = {
  images: ["converter-imagem", "comprimir-imagem", "redimensionar-imagem", "jpg-para-pdf"],
  pdfs: ["jpg-para-pdf", "comprimir-pdf", "juntar-pdf", "dividir-pdf", "pdf-para-jpg"],
  "developer-data": ["base64", "formatador-de-json", "json-inspector", "url-encoder-decoder", "uuid-generator", "formatador-sql"],
};

describe("localized practical guides", () => {
  it("defines twelve unique static pages", () => {
    const routes = [guideIndexRoutes, ...GUIDE_KEYS.map((key) => guideRoutes[key])].flatMap(Object.values);
    expect(routes).toHaveLength(12);
    expect(new Set(routes).size).toBe(12);
    for (const route of routes) {
      const index = Object.values(guideIndexRoutes).includes(route);
      const file = new URL(`../pages${route}${index ? "/index" : ""}.astro`, import.meta.url);
      expect(existsSync(file), route).toBe(true);
      const template = readFileSync(file, "utf8");
      expect(template).not.toContain("getStaticPaths");
      expect(template).not.toContain("prerender = false");
    }
  });

  for (const locale of SUPPORTED_LOCALES) {
    it(`provides a localized hub and two-item breadcrumb in ${locale}`, () => {
      expect(guideCopy[locale].intro.length).toBeGreaterThan(150);
      const trail = getGuideBreadcrumb(locale);
      const schema = createBreadcrumbListJsonLd(trail.items);
      expect(schema.itemListElement.map((item) => item.position)).toEqual([1, 2]);
      expect(schema.itemListElement[1].name).toBe(guideCopy[locale].name);
      expect(schema.itemListElement[1]).not.toHaveProperty("item");
      const template = readFileSync(new URL(`../pages${guideIndexRoutes[locale]}/index.astro`, import.meta.url), "utf8");
      expect(template).toContain(`GuideIndex locale="${locale}"`);
    });

    for (const key of GUIDE_KEYS) {
      it(`${key}/${locale} includes a complete workflow, concrete examples, limitations, and FAQ`, () => {
        const guide = guideContent[key][locale];
        expect(guide.title.length).toBeGreaterThan(30);
        expect(guide.summary.length).toBeGreaterThan(80);
        expect(guide.introduction).toHaveLength(2);
        expect(guide.introduction.join(" ").length).toBeGreaterThan(500);
        expect(guide.steps.length).toBeGreaterThanOrEqual(4);
        for (const step of guide.steps) {
          expect(step.title.length).toBeGreaterThan(20);
          expect(step.paragraphs.join(" ").length).toBeGreaterThan(250);
        }
        expect(guide.examples.length).toBeGreaterThanOrEqual(2);
        for (const example of guide.examples) {
          expect(example.input.length).toBeGreaterThan(20);
          expect(example.result.length).toBeGreaterThan(40);
          expect(example.explanation.length).toBeGreaterThan(150);
        }
        expect(guide.mistakes).toHaveLength(4);
        for (const mistake of guide.mistakes) expect(mistake.length).toBeGreaterThan(100);
        expect(guide.faq).toHaveLength(3);
        for (const faq of guide.faq) {
          expect(faq.question.length).toBeGreaterThan(20);
          expect(faq.answer.length).toBeGreaterThan(150);
        }
        expect(guide.tools.map((tool) => tool.toolId).sort()).toEqual([...allowedTools[key]].sort());
        for (const choice of guide.tools) {
          const tool = ferramentas.find((tool) => tool.id === choice.toolId);
          expect(tool, choice.toolId).toBeDefined();
          expect(tool?.enabled).toBe(true);
          expect(getToolLocaleRoute(tool!, locale)).toMatch(/^\//);
          expect(choice.purpose.length).toBeGreaterThan(50);
        }
        expect(guide.relatedGuides.length).toBeGreaterThan(0);
        for (const related of guide.relatedGuides) {
          expect(related).not.toBe(key);
          expect(guideContent[related][locale]).toBeDefined();
        }
        const template = readFileSync(new URL(`../pages${guideRoutes[key][locale]}.astro`, import.meta.url), "utf8");
        expect(template).toContain(`GuidePage locale="${locale}" guideKey="${key}"`);
      });

      it(`${key}/${locale} uses reciprocal alternates, canonical Article, and visible breadcrumb data`, () => {
        const route = guideRoutes[key][locale];
        expect(getCanonicalUrl(`${route}/?preview=1#faq`)).toBe(toSiteUrl(route));
        const alternates = getHreflangAlternates(getSiteAlternates(route));
        for (const target of SUPPORTED_LOCALES) {
          expect(alternates[target]).toBe(toSiteUrl(guideRoutes[key][target]));
          expect(getSiteAlternates(guideRoutes[key][target])).toEqual(getSiteAlternates(route));
        }
        expect(alternates["x-default"]).toBe(toSiteUrl(guideRoutes[key].en));
        expect(getLocaleNavigationRoutes(route)).toEqual(getSiteAlternates(route));
        const article = getGuideArticle(key, locale);
        expect(article["@type"]).toBe("Article");
        expect(article.headline).toBe(guideContent[key][locale].title);
        expect(article.inLanguage).toBe(locale);
        expect(article.mainEntityOfPage).toBe(toSiteUrl(route));
        expect(article["@id"]).toBe(`${toSiteUrl(route)}#article`);
        expect(JSON.parse(serializeJsonLd(article))).toEqual(article);
        expect(serializeJsonLd({ ...article, headline: "</script><script>" })).not.toContain("<");
        const breadcrumb = createBreadcrumbListJsonLd(getGuideBreadcrumb(locale, key).items);
        expect(breadcrumb.itemListElement.map((item) => item.position)).toEqual([1, 2, 3]);
        expect(breadcrumb.itemListElement[1].item).toBe(toSiteUrl(guideIndexRoutes[locale]));
        expect(breadcrumb.itemListElement[2].name).toBe(article.headline);
      });
    }
  }

  it("localizes editorial text instead of reusing prose across languages or themes", () => {
    const introductions = GUIDE_KEYS.flatMap((key) => SUPPORTED_LOCALES.map((locale) => guideContent[key][locale].introduction.join(" ")));
    expect(new Set(introductions).size).toBe(9);
    const answers = GUIDE_KEYS.flatMap((key) => SUPPORTED_LOCALES.flatMap((locale) => guideContent[key][locale].faq.map((faq) => faq.answer)));
    expect(new Set(answers).size).toBe(27);
  });
});
