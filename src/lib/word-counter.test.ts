import { describe, expect, it } from "vitest";
import { formatReadingTime, getWordCounterMetrics } from "./word-counter";

describe("word counter metrics", () => {
  it("returns zero for empty text and whitespace-only text", () => {
    expect(getWordCounterMetrics("")).toEqual({ words: 0, charactersWithSpaces: 0, charactersWithoutSpaces: 0, sentences: 0, lines: 0, paragraphs: 0, readingMinutes: 0 });
    expect(getWordCounterMetrics(" \t\n ")).toMatchObject({ words: 0, charactersWithSpaces: 4, charactersWithoutSpaces: 0, sentences: 0, lines: 2, paragraphs: 0, readingMinutes: 0 });
  });

  it("preserves the established word, character, sentence, and line rules", () => {
    expect(getWordCounterMetrics("Hello\tworld.\nHow are you?")).toMatchObject({ words: 5, charactersWithSpaces: 25, sentences: 2, lines: 2 });
    expect(getWordCounterMetrics("One\r\nTwo\r\n")).toMatchObject({ words: 2, lines: 3 });
  });

  it("counts characters without whitespace and paragraphs separated by blank lines", () => {
    expect(getWordCounterMetrics("One two\n\nThree\n \nFour\t!")).toMatchObject({ charactersWithoutSpaces: 16, paragraphs: 3 });
  });

  it("rounds reading time up at 200 words per minute", () => {
    const words = (count: number) => Array.from({ length: count }, () => "word").join(" ");
    expect(getWordCounterMetrics(words(1)).readingMinutes).toBe(1);
    expect(getWordCounterMetrics(words(199)).readingMinutes).toBe(1);
    expect(getWordCounterMetrics(words(200)).readingMinutes).toBe(1);
    expect(getWordCounterMetrics(words(201)).readingMinutes).toBe(2);
    const copy = { readingZero: "0 min", readingLessThanMinute: "< 1 min", readingMinutes: "{minutes} min" };
    expect(formatReadingTime(0, copy)).toBe("0 min");
    expect(formatReadingTime(1, copy)).toBe("< 1 min");
    expect(formatReadingTime(199, copy)).toBe("< 1 min");
    expect(formatReadingTime(200, copy)).toBe("1 min");
    expect(formatReadingTime(201, copy)).toBe("2 min");
  });
});
