import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getInstitutionalAlternates, getInstitutionalContent, institutionalKeys, institutionalRoutes } from "./institutional-content";
import { getSiteAlternates } from "./locale-routes";

const locales = ["en", "pt-BR", "es"] as const;
const forbidden = /use tradu|preserve|\bTODO\b|google adsense|cnpj|empresa registrada/i;

describe("institutional content", () => {
  it("keeps the complete four-section About content localized", () => {
    const expected = { en: ["What we do", "How the tools work", "Important limitations", "Contact"], "pt-BR": ["O que fazemos", "Como as ferramentas funcionam", "Limitações importantes", "Contato"], es: ["Qué hacemos", "Cómo funcionan las herramientas", "Limitaciones importantes", "Contacto"] } as const;
    for (const locale of locales) {
      const content = getInstitutionalContent("about", locale);
      expect(content.sections.map((section) => section.heading)).toEqual(expected[locale]);
      expect(content.sections.flatMap((section) => section.paragraphs)).toHaveLength(6);
      const text = content.sections.flatMap((section) => section.paragraphs).join(" ");
      for (const term of ["Thiago Magalhães", "Frankfurter", "Google Analytics", locale === "en" ? "camera" : locale === "es" ? "cámara" : "câmera", "contato@usevo.tools"]) expect(text.toLowerCase()).toContain(term.toLowerCase());
      expect(text).not.toMatch(forbidden);
    }
  });
  it("keeps complete three-section Contact content localized", () => {
    const expected = { en: ["Email contact", "What to include", "Handling messages"], "pt-BR": ["Contato por e-mail", "O que informar", "Tratamento das mensagens"], es: ["Contacto por correo electrónico", "Qué incluir", "Tratamiento de mensajes"] } as const;
    for (const locale of locales) {
      const content = getInstitutionalContent("contact", locale); const text = content.sections.flatMap((section) => section.paragraphs).join(" ").toLowerCase();
      expect(content.sections.map((section) => section.heading)).toEqual(expected[locale]); expect(content.sections.flatMap((section) => section.paragraphs)).toHaveLength(3);
      for (const term of ["contato@usevo.tools", "password", "payment", "identity", "security", "legal"]) expect(text).toContain(locale === "en" ? term : term === "password" ? locale === "es" ? "contraseñas" : "senhas" : term === "payment" ? locale === "es" ? "pago" : "pagamento" : term === "identity" ? locale === "es" ? "identidad" : "identidade" : term === "security" ? locale === "es" ? "seguridad" : "segurança" : locale === "es" ? "legales" : "legais");
      expect(text).not.toMatch(forbidden);
    }
  });
  it("keeps complete six-section Privacy content localized", () => {
    const expected = { en:["Scope and controller","Data handled by the site","Analytics and external services","Purposes and retention","Your choices and rights","Security and updates"], "pt-BR":["Escopo e responsável","Dados tratados pelo site","Analytics e serviços externos","Finalidades e retenção","Escolhas e direitos","Segurança e atualizações"], es:["Alcance y responsable","Datos tratados por el sitio","Google Analytics y servicios externos","Finalidades y conservación","Opciones y derechos","Seguridad y actualizaciones"] } as const;
    for (const locale of locales) { const content=getInstitutionalContent("privacy",locale); const text=content.sections.flatMap(s=>s.paragraphs).join(" "); expect(content.sections.map(s=>s.heading)).toEqual(expected[locale]); expect(content.sections.flatMap(s=>s.paragraphs).length).toBeGreaterThanOrEqual(8); for(const term of ["Thiago Magalhães","LGPD","Frankfurter","Google Analytics","contato@usevo.tools"]) expect(text).toContain(term); expect(content.updated).toBe(locale==="en"?"Last updated: August 29, 2026":locale==="es"?"Última actualización: 29 de agosto de 2026":"Última atualização: 29 de agosto de 2026"); }
  });
  it("defines five complete localized page families", () => {
    expect(institutionalKeys).toHaveLength(5);
    for (const key of institutionalKeys) for (const locale of locales) {
      const content = getInstitutionalContent(key, locale);
      expect(content.title).not.toBe(""); expect(content.description).not.toBe(""); expect(content.h1).not.toBe(""); expect(content.footerLabel).not.toBe("");
      expect(content.sections.length).toBeGreaterThan(0);
      const text = [content.title, content.description, content.h1, ...content.sections.flatMap((s) => [s.heading, ...s.paragraphs])].join(" ");
      expect(text).not.toMatch(forbidden); if (["about", "contact", "privacy"].includes(key)) expect(text).toContain("contato@usevo.tools");
      expect(institutionalRoutes[key][locale]).toMatch(/^\//); expect(institutionalRoutes[key][locale]).not.toMatch(/\/$/);
    }
  });

  it("includes approved policy facts and finalized Spanish sections", () => {
    for (const locale of locales) for (const key of ["privacy", "terms", "cookies"] as const) expect(getInstitutionalContent(key, locale).updated).toBe(locale === "en" ? "Last updated: August 29, 2026" : locale === "es" ? "Última actualización: 29 de agosto de 2026" : "Última atualização: 29 de agosto de 2026");
    const privacy = getInstitutionalContent("privacy", "es"); const privacyText = privacy.sections.flatMap((s) => [s.heading, ...s.paragraphs]).join(" ");
    expect(privacyText).toContain("LGPD"); expect(privacyText).toContain("Frankfurter"); expect(privacyText).toContain("Google Analytics"); expect(privacyText).toContain("usevo.analytics-consent"); expect(privacyText).toContain("Opciones y derechos"); expect(privacyText).toContain("Seguridad y actualizaciones");
    expect(getInstitutionalContent("cookies", "es").sections.flatMap((s) => s.paragraphs).join(" ")).toMatch(/cookies publicitarias/);
    expect(getInstitutionalContent("terms", "es").sections.flatMap((s) => s.paragraphs).join(" ")).toContain("Santo André, São Paulo");
  });

  it("exposes reciprocal canonical alternates", () => {
    for (const key of institutionalKeys) {
      const alternates = getInstitutionalAlternates(key);
      expect(alternates).toEqual(institutionalRoutes[key]);
      for (const locale of locales) expect(getSiteAlternates(alternates[locale])).toEqual({ en: `https://usevo.tools${alternates.en}`, "pt-BR": `https://usevo.tools${alternates["pt-BR"]}`, es: `https://usevo.tools${alternates.es}` });
    }
  });
});

describe("institutional footer", () => {
  it("uses semantic localized links from centralized route data", () => {
    const footer = readFileSync(new URL("../components/SiteFooter.astro", import.meta.url), "utf8");
    expect(footer).toContain("<nav aria-label="); expect(footer).toContain("<ul>"); expect(footer).toContain("institutionalLinks"); expect(footer).toContain("localeRouteConfig"); expect(footer).toContain("© 2026 USEVO TOOLS");
  });
});
