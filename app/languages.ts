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
  { no: "impossible", yes: "possible", lang: "en", script: "latin" },
  { no: "مش ممكن", yes: "ممكن", lang: "ar", script: "arabic" },
  { no: "नामुमकिन", yes: "मुमकिन", lang: "hi", script: "devanagari" },
  { no: "ناممکن", yes: "ممکن", lang: "ur", script: "arabic" },
  { no: "അസാധ്യം", yes: "സാധ്യം", lang: "ml", script: "malayalam" },
  { no: "अशक्य", yes: "शक्य", lang: "mr", script: "devanagari" },
  { no: "অসম্ভব", yes: "সম্ভব", lang: "bn", script: "bengali" },
  { no: "முடியாது", yes: "முடியும்", lang: "ta", script: "tamil" },
  { no: "Haiwezekani", yes: "Inawezekana", lang: "sw", script: "latin" },
  { no: "አይቻልም", yes: "ይቻላል", lang: "am", script: "ethiopic" },
  { no: "imkânsız", yes: "mümkün", lang: "tr", script: "latin" },
  { no: "mustahil", yes: "mungkin", lang: "id", script: "latin" },
  { no: "imposible", yes: "posible", lang: "tl", script: "latin" },
  { no: "असम्भव", yes: "सम्भव", lang: "ne", script: "devanagari" },
  { no: "නොහැකි", yes: "හැකි", lang: "si", script: "sinhala" },
  { no: "ناممکن", yes: "ممکن", lang: "fa", script: "arabic" },
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
