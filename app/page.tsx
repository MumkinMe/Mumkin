import Image from "next/image";
import logo from "@/public/mumkin-logo.png";
import Tagline from "./Tagline";
import { WORDS, type Word } from "./languages";

/** Each row shows the full set from a different starting point, so no two rows read alike. */
function rotate(offset: number): Word[] {
  return WORDS.map((_, i) => WORDS[(i + offset) % WORDS.length]);
}

const ROWS = [
  { offset: 0, duration: 96, reverse: false },
  { offset: 3, duration: 124, reverse: true },
  { offset: 6, duration: 82, reverse: false },
  { offset: 9, duration: 140, reverse: true },
  { offset: 11, duration: 104, reverse: false },
  { offset: 14, duration: 132, reverse: true },
  { offset: 17, duration: 90, reverse: false },
];

export default function Home() {
  return (
    <main className="stage">
      {/* Decorative: "possible" in the languages Mumkin's customers speak. */}
      <div className="marquee" aria-hidden="true">
        {ROWS.map((row, i) => {
          const words = rotate(row.offset);
          return (
            <div
              key={i}
              className="row"
              data-reverse={row.reverse ? "" : undefined}
              style={{ ["--dur" as string]: `${row.duration}s` }}
            >
              {/* Rendered twice so translateX(-50%) loops seamlessly. */}
              <div className="track">
                {[...words, ...words].map((w, j) => (
                  <span key={j} className="word" data-script={w.script} lang={w.lang}>
                    {w.word}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="scrim" aria-hidden="true" />

      <div className="content">
        <h1 className="logo">
          <Image
            src={logo}
            alt="Mumkin"
            priority
            sizes="(max-width: 640px) 78vw, 460px"
          />
        </h1>

        <Tagline />
      </div>

      <div className="grain" aria-hidden="true" />
    </main>
  );
}
