import { describe, expect, it } from "vitest";
import { featuredToolsCopy, getFeaturedTools } from "./featured-tools";

describe("featured homepage tools", () => {
  it("selects exactly the six requested tools in the intended order", () => {
    expect(getFeaturedTools().map((tool) => tool.id)).toEqual([
      "pdf-para-jpg",
      "jpg-para-pdf",
      "converter-imagem",
      "calculadora-de-porcentagem",
      "contador-de-palavras",
      "leitor-de-qr-code",
    ]);
  });

  it("provides localized section titles and catalog CTAs", () => {
    expect(featuredToolsCopy).toMatchObject({
      en: { title: "Featured tools", cta: "View all tools", href: "/en/tools" },
      "pt-BR": { title: "Ferramentas em destaque", cta: "Ver todas as ferramentas", href: "/ferramentas" },
      es: { title: "Herramientas destacadas", cta: "Ver todas las herramientas", href: "/es/herramientas" },
    });
  });
});
