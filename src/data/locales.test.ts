import { describe, expect, it } from "vitest";
import { resolveLocaleFromPath } from "./locales";

describe("resolveLocaleFromPath", () => {
  it("uses the public route as the locale source of truth", () => {
    expect(resolveLocaleFromPath("/ferramentas/calculadora-clt-pj/", "en")).toBe("pt-BR");
    expect(resolveLocaleFromPath("/en/tools/clt-vs-freelance-calculator/", "pt-BR")).toBe("en");
    expect(resolveLocaleFromPath("/es/herramientas/calculadora-clt-vs-autonomo/", "en")).toBe("es");
  });

  it("uses a valid prop only when the route has no locale convention", () => {
    expect(resolveLocaleFromPath("/unknown/", "es")).toBe("es");
  });
});
