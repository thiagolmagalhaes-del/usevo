export const WORDS_PER_MINUTE = 200;

export type WordCounterMetrics = {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  lines: number;
  paragraphs: number;
  readingMinutes: number;
};

export type ReadingTimeCopy = {
  readingZero: string;
  readingLessThanMinute: string;
  readingMinutes: string;
};

export const formatReadingTime = (words: number, copy: ReadingTimeCopy) => {
  if (words === 0) return copy.readingZero;
  if (words < WORDS_PER_MINUTE) return copy.readingLessThanMinute;
  return copy.readingMinutes.replace("{minutes}", String(Math.ceil(words / WORDS_PER_MINUTE)));
};

export const getWordCounterMetrics = (text: string): WordCounterMetrics => {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;

  return {
    words,
    charactersWithSpaces: text.length,
    charactersWithoutSpaces: text.replace(/\s/g, "").length,
    sentences: trimmed ? (text.match(/[.!?]+(?=\s|$)/g) ?? []).length : 0,
    lines: text ? text.split(/\r?\n/).length : 0,
    paragraphs: trimmed ? trimmed.split(/\r?\n(?:[ \t]*\r?\n)+/).length : 0,
    readingMinutes: words === 0 ? 0 : Math.ceil(words / WORDS_PER_MINUTE),
  };
};
