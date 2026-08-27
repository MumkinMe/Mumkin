export type Script =
  | "latin"
  | "arabic"
  | "devanagari"
  | "bengali"
  | "malayalam"
  | "tamil"
  | "gurmukhi"
  | "sinhala"
  | "ethiopic";

export type Word = {
  /** "possible" in this language, native script */
  word: string;
  /** BCP-47 tag, so the browser shapes and font-matches correctly */
  lang: string;
  script: Script;
};

/**
 * "Possible" across the languages Mumkin's customers speak. Many are the same
 * Arabic-rooted word carried along migration and trade routes:
 * mumkin / mumkun / mungkin / mümkün.
 */
export const WORDS: Word[] = [
  { word: "ممكن", lang: "ar", script: "arabic" },
  { word: "मुमकिन", lang: "hi", script: "devanagari" },
  { word: "ممکن", lang: "ur", script: "arabic" },
  { word: "സാധ്യം", lang: "ml", script: "malayalam" },
  { word: "शक्य", lang: "mr", script: "devanagari" },
  { word: "Inawezekana", lang: "sw", script: "latin" },
  { word: "ይቻላል", lang: "am", script: "ethiopic" },
  { word: "সম্ভব", lang: "bn", script: "bengali" },
  { word: "Suurtogal", lang: "so", script: "latin" },
  { word: "சாத்தியம்", lang: "ta", script: "tamil" },
  { word: "ਮੁਮਕਿਨ", lang: "pa", script: "gurmukhi" },
  { word: "सम्भव", lang: "ne", script: "devanagari" },
  { word: "හැකි", lang: "si", script: "sinhala" },
  { word: "Posible", lang: "tl", script: "latin" },
  { word: "ممکن", lang: "fa", script: "arabic" },
  { word: "Mungkin", lang: "id", script: "latin" },
  { word: "ممڪن", lang: "sd", script: "arabic" },
  { word: "Mümkün", lang: "tr", script: "latin" },
  { word: "Possible", lang: "en", script: "latin" },
];

export type Pair = {
  /** "impossible" */
  no: string;
  /** "possible" */
  yes: string;
  lang: string;
  script: Script;
};

/**
 * Pairs for the cycling tagline. English leads, then Arabic — the brand's own
 * words — then the rest. Only languages where both halves are idiomatic are
 * listed here; the marquee above carries the wider set.
 */
export const PAIRS: Pair[] = [
  // Mumkin's own words first, in the Latin spelling most people say them in.
  { no: "mish mumkin", yes: "mumkin", lang: "en", script: "latin" },
  // Then what they mean.
  { no: "impossible", yes: "possible", lang: "en", script: "latin" },
  // Then the same shift in the languages Mumkin's customers speak.
  { no: "\u0645\u0634 \u0645\u0645\u0643\u0646", yes: "\u0645\u0645\u0643\u0646", lang: "ar", script: "arabic" },
  { no: "\u0d05\u0d38\u0d3e\u0d27\u0d4d\u0d2f\u0d02", yes: "\u0d38\u0d3e\u0d27\u0d4d\u0d2f\u0d02", lang: "ml", script: "malayalam" },
  { no: "\u0928\u093e\u092e\u0941\u092e\u0915\u093f\u0928", yes: "\u092e\u0941\u092e\u0915\u093f\u0928", lang: "hi", script: "devanagari" },
  { no: "\u0646\u0627\u0645\u0645\u06a9\u0646", yes: "\u0645\u0645\u06a9\u0646", lang: "ur", script: "arabic" },
  { no: "Haiwezekani", yes: "Inawezekana", lang: "sw", script: "latin" },
  { no: "\u12a0\u12ed\u127b\u120d\u121d", yes: "\u12ed\u127b\u120b\u120d", lang: "am", script: "ethiopic" },
  { no: "\u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bbe\u0ba4\u0bc1", yes: "\u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bc1\u0bae\u0bcd", lang: "ta", script: "tamil" },
  { no: "\u0db1\u0ddc\u0dc4\u0dd0\u0d9a\u0dd2", yes: "\u0dc4\u0dd0\u0d9a\u0dd2", lang: "si", script: "sinhala" },
];

/** Google Fonts family per non-Latin script. Latin is covered by IBM Plex Sans. */
const FAMILY: Partial<Record<Script, string>> = {
  arabic: "Noto Sans Arabic",
  devanagari: "Noto Sans Devanagari",
  bengali: "Noto Sans Bengali",
  malayalam: "Noto Sans Malayalam",
  tamil: "Noto Sans Tamil",
  gurmukhi: "Noto Sans Gurmukhi",
  sinhala: "Noto Sans Sinhala",
  ethiopic: "Noto Sans Ethiopic",
};

/**
 * Built from WORDS *and* PAIRS so the font request can never drift out of sync
 * with the text on screen and render tofu. `text=` makes Google subset each
 * face to only the glyphs used, keeping all eight scripts to roughly 20KB.
 */
export function googleFontsHref(): string {
  const families = Object.values(FAMILY).sort();

  const nonLatin = [
    ...WORDS.filter((w) => w.script !== "latin").map((w) => w.word),
    ...PAIRS.filter((p) => p.script !== "latin").flatMap((p) => [p.no, p.yes]),
  ].join("");

  const chars = Array.from(new Set(nonLatin.split(""))).join("");
  const params = families.map((f) => `family=${encodeURIComponent(f)}`).join("&");

  return `https://fonts.googleapis.com/css2?${params}&text=${encodeURIComponent(chars)}&display=swap`;
}
