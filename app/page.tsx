import Image from "next/image";
import logo from "@/public/mumkin-logo.png";
import Tagline from "./Tagline";
import { WORDS, type Word } from "./languages";

/** Each row shows the full set from a different starting point, so no two rows read alike. */
function rotate(offset: number): Word[] {
  return WORDS.map((_, i) => WORDS[(i + offset) % WORDS.length]);
}

/** The eight values from the Mumkin charter, in its order and line breaks. */
const CHARTER = [
  ["Customer", "Dignity First"],
  ["Education", "Before Product"],
  ["Transparency is", "Non-Negotiable"],
  ["Trust Earned", "Daily"],
  ["Enablement", "Over Charity"],
  ["Ownership &", "Urgency"],
  ["Innovation with", "Purpose"],
  ["We Grow", "Together"],
];

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
    <div className="page">
      <main>
        <section className="stage">
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

          <a className="cue" href="#charter" aria-label="Scroll to our charter" />
        </section>

        <section id="charter" className="charter" aria-labelledby="charter-title">
          <p className="eyebrow">Mumkin values</p>
          <h2 id="charter-title" className="charter-title">
            Our Charter
          </h2>

          <ol className="values">
            {CHARTER.map(([first, second], i) => (
              <li key={first} className="value">
                <span className="value-name">
                  <span>{first}</span> <span>{second}</span>
                </span>
                <span className="value-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="foot">
        <p className="eyebrow">Investor relations</p>
        <a className="foot-mail" href="mailto:admin@mumkin.me">
          admin@mumkin.me
        </a>
      </footer>

      <div className="grain" aria-hidden="true" />
    </div>
  );
}
