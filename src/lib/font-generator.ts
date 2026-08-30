export type FontStyleId =
  | "bold"
  | "italic"
  | "boldItalic"
  | "script"
  | "boldScript"
  | "fraktur"
  | "doubleStruck"
  | "monospace"
  | "sans"
  | "sansBold"
  | "sansItalic"
  | "circled"
  | "squared"
  | "fullwidth"
  | "smallCaps"
  | "upsideDown"
  | "strikethrough"
  | "underline"
  | "alternatingCase";

export const fontStyleIds: readonly FontStyleId[] = [
  "bold", "italic", "boldItalic", "script", "boldScript", "fraktur", "doubleStruck",
  "monospace", "sans", "sansBold", "sansItalic", "circled", "squared", "fullwidth",
  "smallCaps", "upsideDown", "strikethrough", "underline", "alternatingCase",
];

export type ClipboardLike = { writeText?: (value: string) => Promise<void> };

export const copyText = async (value: string, clipboard?: ClipboardLike): Promise<boolean> => {
  if (!value || !clipboard?.writeText) return false;
  await clipboard.writeText(value);
  return true;
};

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

const mapCharacters = (text: string, source: string, target: string) => {
  const mapping = new Map(Array.from(source, (character, index) => [character, Array.from(target)[index] ?? character]));
  return Array.from(text, (character) => mapping.get(character) ?? character).join("");
};

const mapMathematical = (text: string, upperStart: number, lowerStart: number, digitStart?: number) => Array.from(text, (character) => {
  const upperIndex = upper.indexOf(character);
  if (upperIndex >= 0) return String.fromCodePoint(upperStart + upperIndex);
  const lowerIndex = lower.indexOf(character);
  if (lowerIndex >= 0) return String.fromCodePoint(lowerStart + lowerIndex);
  const digitIndex = digits.indexOf(character);
  if (digitStart !== undefined && digitIndex >= 0) return String.fromCodePoint(digitStart + digitIndex);
  return character;
}).join("");

const scriptUpper = "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵";
const scriptLower = "𝒶𝒷𝒸𝒹ℯ𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏";
const frakturUpper = "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ";
const frakturLower = "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷";
const doubleStruckUpper = "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ";
const doubleStruckLower = "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫";
const circledUpper = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ";
const circledLower = "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";
const circledDigits = "⓪①②③④⑤⑥⑦⑧⑨";
const squaredUpper = "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉";
const smallCapsLower = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ";

const toSmallCaps = (text: string) => Array.from(text, (character) => {
  const lowerCharacter = character.toLowerCase();
  const index = lower.indexOf(lowerCharacter);
  const replacement = index >= 0 ? Array.from(smallCapsLower)[index] : undefined;
  return replacement && replacement !== lowerCharacter ? replacement : character;
}).join("");

const upsideDown = new Map<string, string>([
  ["a", "ɐ"], ["b", "q"], ["c", "ɔ"], ["d", "p"], ["e", "ǝ"], ["f", "ɟ"], ["g", "ƃ"], ["h", "ɥ"], ["i", "ᴉ"], ["j", "ɾ"], ["k", "ʞ"], ["l", "l"], ["m", "ɯ"], ["n", "u"], ["o", "o"], ["p", "d"], ["q", "b"], ["r", "ɹ"], ["s", "s"], ["t", "ʇ"], ["u", "n"], ["v", "ʌ"], ["w", "ʍ"], ["x", "x"], ["y", "ʎ"], ["z", "z"],
  ["A", "∀"], ["B", "𐐒"], ["C", "Ɔ"], ["D", "◖"], ["E", "Ǝ"], ["F", "Ⅎ"], ["G", "פ"], ["H", "H"], ["I", "I"], ["J", "ſ"], ["K", "⋊"], ["L", "˥"], ["M", "W"], ["N", "N"], ["O", "O"], ["P", "Ԁ"], ["Q", "Ό"], ["R", "ᴚ"], ["S", "S"], ["T", "┴"], ["U", "∩"], ["V", "Λ"], ["W", "M"], ["X", "X"], ["Y", "⅄"], ["Z", "Z"],
  ["1", "Ɩ"], ["2", "ᄅ"], ["3", "Ɛ"], ["4", "ㄣ"], ["5", "ϛ"], ["6", "9"], ["7", "ㄥ"], ["8", "8"], ["9", "6"], ["0", "0"], ["!", "¡"], ["?", "¿"], [".", "˙"], [",", "'"], ["'", ","], ["(", ")"], [")", "("], ["[", "]"], ["]", "["], ["{", "}"], ["}", "{"],
]);

const decorate = (text: string, mark: string) => Array.from(text, (character) => /\s/.test(character) ? character : `${character}${mark}`).join("");

export const transformText = (text: string, style: FontStyleId): string => {
  if (!text) return "";

  switch (style) {
    case "bold": return mapMathematical(text, 0x1D400, 0x1D41A, 0x1D7CE);
    case "italic": return Array.from(text, (character) => character === "h" ? "ℎ" : mapMathematical(character, 0x1D434, 0x1D44E)).join("");
    case "boldItalic": return mapMathematical(text, 0x1D468, 0x1D482);
    case "script": return mapCharacters(mapCharacters(text, upper, scriptUpper), lower, scriptLower);
    case "boldScript": return mapMathematical(text, 0x1D4D0, 0x1D4EA);
    case "fraktur": return mapCharacters(mapCharacters(text, upper, frakturUpper), lower, frakturLower);
    case "doubleStruck": return mapCharacters(mapCharacters(mapCharacters(text, upper, doubleStruckUpper), lower, doubleStruckLower), digits, "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡");
    case "monospace": return mapMathematical(text, 0x1D670, 0x1D68A, 0x1D7F6);
    case "sans": return mapMathematical(text, 0x1D5A0, 0x1D5BA, 0x1D7E2);
    case "sansBold": return mapMathematical(text, 0x1D5D4, 0x1D5EE, 0x1D7EC);
    case "sansItalic": return mapMathematical(text, 0x1D608, 0x1D622);
    case "circled": return mapCharacters(mapCharacters(mapCharacters(text, upper, circledUpper), lower, circledLower), digits, circledDigits);
    case "squared": return mapCharacters(text, upper, squaredUpper);
    case "fullwidth": return Array.from(text, (character) => {
      const code = character.codePointAt(0) ?? 0;
      return code >= 0x21 && code <= 0x7E ? String.fromCodePoint(code + 0xFEE0) : character;
    }).join("");
    case "smallCaps": return toSmallCaps(text);
    case "upsideDown": return Array.from(text, (character) => upsideDown.get(character) ?? character).reverse().join("");
    case "strikethrough": return decorate(text, "̶");
    case "underline": return decorate(text, "̲");
    case "alternatingCase": {
      let letterIndex = 0;
      return Array.from(text, (character) => {
        if (character.toUpperCase() === character.toLowerCase()) return character;
        const value = letterIndex % 2 === 0 ? character.toUpperCase() : character.toLowerCase();
        letterIndex += 1;
        return value;
      }).join("");
    }
  }
};
