# Mumkin

The site at [mumkin.me](https://mumkin.me).

## Running it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## What's here

Next.js 16 with the App Router, Tailwind and TypeScript. Every route is
static, so `npm run build` produces prerendered output and there is no server
to run.

- `app/page.tsx` — the page: logo, tagline and background marquee, then the
  charter (the eight Mumkin values) and the investor relations footer
- `app/Tagline.tsx` — cycles the tagline through languages
- `app/languages.ts` — the translations, and the font request built from them
- `public/mumkin-logo.png` — the logo lockup, trimmed from `mumkin logo.png`
- `next.config.ts` — `mumkin.me/login` redirects to the team email sign-in at
  `email.mumkin.me`

## Translations

`app/languages.ts` holds "possible" in 19 languages for the background
marquee, and 16 impossible/possible pairs for the tagline. The Google Fonts
URL is generated from that data, so adding a language automatically requests
the glyphs it needs and nothing renders as empty boxes.

Each font is subset to only the characters actually used, which is why eight
scripts cost about 18KB in total rather than several hundred.

Two things worth knowing before editing it:

- The tagline pairs need both halves to be idiomatic in the language, not a
  literal negation. Some are unverified by a native speaker — the Sinhala,
  Tamil and Amharic negatives especially.
- The logo has no vector version. The PNG is sharp at the sizes used, but an
  SVG would be better.

## Design constraints

The page is light because the wordmark is pure black and there is no reversed
version of the lockup.

The tagline animates each word's slot to its measured width, so the sentence
frame stays still and nothing jumps as the languages change. Widths are
measured after the webfonts load; measuring earlier gives wrong numbers for
every non-Latin script.
