import { describe, expect, it } from "vitest";
import { convertCase } from "./case-converter";

describe("case converter", () => {
  it("converts uppercase and lowercase with the page locale", () => {
    expect(convertCase("ação ÁRVORE", "uppercase", "pt-BR")).toBe("AÇÃO ÁRVORE");
    expect(convertCase("HELLO ÑANDÚ", "lowercase", "es")).toBe("hello ñandú");
    expect(convertCase("MiXeD", "lowercase", "en")).toBe("mixed");
  });

  it("keeps empty and whitespace-only text unchanged", () => {
    expect(convertCase("", "uppercase", "en")).toBe("");
    expect(convertCase(" \t\r\n ", "sentence", "pt-BR")).toBe(" \t\r\n ");
  });

  it("applies the documented mechanical sentence rule", () => {
    expect(convertCase('hELLO!  "HOW ARE YOU?" yes. e.g. NAME', "sentence", "en"))
      .toBe('Hello!  "How are you?" Yes. E.G. Name');
    expect(convertCase("olá!\r\n  ¿CÓMO ESTÁS? ótimo.", "sentence", "pt-BR"))
      .toBe("Olá!\r\n  ¿Cómo estás? Ótimo.");
  });

  it("capitalizes only the first cased character of whitespace-separated tokens", () => {
    expect(convertCase("oLÁ-mUNDO o'CONNOR\t\"tEXTO\"\nNOVA linha", "capitalize", "pt-BR"))
      .toBe("Olá-mundo O'connor\t\"Texto\"\nNova Linha");
  });

  it("inverts only cased Unicode characters and preserves other code points", () => {
    expect(convertCase("AbÇ 😀 123!\r\nßẞ", "invert", "pt-BR")).toBe("aBç 😀 123!\r\nSSß");
    expect(convertCase("Olá 👋 — 42", "invert", "pt-BR")).toBe("oLÁ 👋 — 42");
  });

  it("permits legitimate Unicode expansions while preserving whitespace and punctuation", () => {
    expect(convertCase("straße\t😀\r\n", "uppercase", "en")).toBe("STRASSE\t😀\r\n");
  });
});
