"use client";

import { useEffect, useRef, useState } from "react";
import { PAIRS } from "./languages";

const HOLD = 2400;
const FADE_OUT = 180;

type Size = { no: number; yes: number };

/**
 * Cycles only the two words; "Taking you from" and "to" never move or fade.
 *
 * Each word sits in a slot whose width is animated to that translation's
 * measured width, so "to" glides to its new position instead of jumping, and
 * no word is left floating in dead space. Widths for all languages are
 * measured once from a hidden copy after the webfonts settle.
 *
 * English is server-rendered, so it is what shows before hydration and what
 * stays put when reduced motion is requested.
 */
export default function Tagline() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(true);
  const [sizes, setSizes] = useState<Size[] | null>(null);
  const probe = useRef<HTMLSpanElement>(null);

  // Measure every translation once, after the webfonts have loaded.
  useEffect(() => {
    let cancelled = false;
    const measure = () => {
      const el = probe.current;
      if (!el || cancelled) return;
      const next = PAIRS.map((_, idx) => {
        const no = el.querySelector<HTMLElement>(`[data-m="no-${idx}"]`);
        const yes = el.querySelector<HTMLElement>(`[data-m="yes-${idx}"]`);
        return {
          no: no ? no.getBoundingClientRect().width : 0,
          yes: yes ? yes.getBoundingClientRect().width : 0,
        };
      });
      setSizes(next);
    };
    document.fonts.ready.then(measure).catch(measure);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let swap: number | undefined;
    const step = window.setInterval(() => {
      setShown(false);
      swap = window.setTimeout(() => {
        setI((v) => (v + 1) % PAIRS.length);
        setShown(true);
      }, FADE_OUT);
    }, HOLD + FADE_OUT);

    return () => {
      window.clearInterval(step);
      if (swap) window.clearTimeout(swap);
    };
  }, []);

  const p = PAIRS[i];
  const dir = p.script === "arabic" ? "rtl" : undefined;
  const size = sizes?.[i];

  return (
    <p className="tagline">
      <span className="sr-only">Taking you from impossible to possible.</span>

      <span aria-hidden="true">
        Taking you from{" "}
        <span
          className="slot"
          style={size ? { width: `${Math.ceil(size.no)}px` } : undefined}
        >
          <span
            className="was"
            data-shown={shown ? "" : undefined}
            data-script={p.script}
            lang={p.lang}
            dir={dir}
          >
            {p.no}
          </span>
        </span>{" "}
        to{" "}
        <span
          className="slot"
          style={size ? { width: `${Math.ceil(size.yes)}px` } : undefined}
        >
          <span
            className="now"
            data-shown={shown ? "" : undefined}
            data-script={p.script}
            lang={p.lang}
            dir={dir}
          >
            {p.yes}
          </span>
        </span>
      </span>

      {/* Hidden copy used only for measurement; never painted. */}
      <span className="probe" ref={probe} aria-hidden="true">
        {PAIRS.map((pair, idx) => (
          <span key={pair.lang + idx}>
            <span className="was" data-m={`no-${idx}`} data-script={pair.script} lang={pair.lang}>
              {pair.no}
            </span>
            <span className="now" data-m={`yes-${idx}`} data-script={pair.script} lang={pair.lang}>
              {pair.yes}
            </span>
          </span>
        ))}
      </span>
    </p>
  );
}
