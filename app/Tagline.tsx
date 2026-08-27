"use client";

import { useEffect, useState } from "react";
import { PAIRS } from "./languages";

const HOLD = 2600;

/**
 * "Taking you from" and "to" stay put; only the two words change.
 *
 * There is deliberately no measuring code here. Every translation shares one
 * grid cell, but only the active one is in flow — the rest are taken out of
 * flow in CSS — so the browser sizes each slot to exactly the word on screen.
 * Earlier versions set an explicit pixel width instead, which fought the
 * grid's own sizing and pushed long words over the top of "to".
 */
export default function Tagline() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const step = window.setInterval(() => setI((v) => (v + 1) % PAIRS.length), HOLD);
    return () => window.clearInterval(step);
  }, []);

  return (
    <p className="tagline">
      <span className="sr-only">Taking you from impossible to possible.</span>

      <span aria-hidden="true">
        Taking you from <Slot kind="was" active={i} /> to <Slot kind="now" active={i} />
      </span>
    </p>
  );
}

function Slot({ kind, active }: { kind: "was" | "now"; active: number }) {
  return (
    <span className="slot">
      {PAIRS.map((p, idx) => (
        <span
          key={p.lang + idx}
          className={`w ${kind}`}
          data-shown={idx === active ? "" : undefined}
          data-script={p.script}
          lang={p.lang}
          dir={p.script === "arabic" ? "rtl" : undefined}
        >
          {kind === "was" ? p.no : p.yes}
        </span>
      ))}
    </span>
  );
}
