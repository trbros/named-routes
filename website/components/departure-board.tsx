"use client";
import { type CSSProperties, useEffect, useState } from "react";
import { departures } from "../lib/transit";
import { FlapText } from "./flap-text";
import { BrandMark } from "./brand-mark";
import { useSiteLocale } from "./use-site-locale";

const ROWS = 4;
/** An airport-style board where every row is real generator output. */
export function DepartureBoard() {
  const { t } = useSiteLocale();
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clock, setClock] = useState("");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () =>
      setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const clockTimer = window.setInterval(tick, 15000);
    if (reduce || paused || hovered) return () => window.clearInterval(clockTimer);
    const timer = window.setInterval(() => {
      if (!document.hidden) setOffset((value) => (value + 1) % departures.length);
    }, 3200);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(clockTimer);
    };
  }, [paused, hovered]);
  const rows = Array.from({ length: ROWS }, (_, index) => departures[(offset + index) % departures.length]);
  return (
    <section
      className="board"
      aria-label={t("departures_8f2a1c")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <header className="board-head">
        <span className="board-title">
          <BrandMark size={22} animated />
          {t("departures_8f2a1c")}
        </span>
        <code className="board-call">route()</code>
        <span className="board-clock" suppressHydrationWarning>
          {clock}
        </span>
      </header>
      <div className="board-columns" aria-hidden="true">
        <span>{t("line_3b9e0d")}</span>
        <span>
          {t("route_name_4c1a7e")} → {t("destination_2d8f55")}
        </span>
      </div>
      <ol className="board-rows">
        {rows.map((row, index) => (
          <li key={index} style={{ "--lc": row.color } as CSSProperties}>
            <span className="board-line">
              <span className="line-dot" aria-hidden="true" />
              <FlapText text={row.board} length={12} />
            </span>
            <span className="board-name">
              <FlapText text={row.name} length={14} />
              <small>{row.file}</small>
            </span>
            <span className="board-url">
              <FlapText text={row.url} length={19} />
            </span>
          </li>
        ))}
      </ol>
      <footer className="board-foot">
        <span>{t("board_caption_6e0b93")}</span>
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>
          {paused ? t("resume_departures_1f7c2b") : t("pause_departures_0e5d4a")}
        </button>
      </footer>
    </section>
  );
}
