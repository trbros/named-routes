"use client";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { lines } from "../lib/transit";
import { RouteStoryboard, type Station } from "./route-storyboard";
import { useSiteLocale } from "./use-site-locale";

/** Hub = route(). It sits on the left end of a closed loop (an infinite circuit). */
const HUB = { x: 510, y: 250, r: 44 };
const LOOP = { top: 150, bottom: 350, left: 610, right: 850 };
const RADIUS = (LOOP.bottom - LOOP.top) / 2;
const loopPath = `M${HUB.x} ${HUB.y} A${RADIUS} ${RADIUS} 0 0 1 ${LOOP.left} ${LOOP.top} H${LOOP.right} A${RADIUS} ${RADIUS} 0 0 1 ${LOOP.right} ${LOOP.bottom} H${LOOP.left} A${RADIUS} ${RADIUS} 0 0 1 ${HUB.x} ${HUB.y} Z`;
const URL_X = LOOP.right + RADIUS;
const loopStops: { x: number; y: number; station: Station; label: string }[] = [
  { x: 660, y: LOOP.top, station: "name", label: "name" },
  { x: 735, y: LOOP.top, station: "params", label: "params" },
  { x: 810, y: LOOP.top, station: "locale", label: "locale" },
  { x: URL_X, y: HUB.y, station: "url", label: "URL" },
];
const geometry = lines.map((line, index) => {
  const y = 34 + index * 72;
  const entry = HUB.x - HUB.r;
  return { line, y, d: `M230 ${y} H270 C390 ${y} 390 ${HUB.y} ${entry} ${HUB.y}` };
});

/**
 * Seven framework lines fan into the route() roundel. From there one circuit
 * runs through the name, params and locale stations, turns at the URL and
 * returns to route(): a train circulates forever while the storyboard below
 * builds the active line's page.
 */
export function TransitMap() {
  const { t } = useSiteLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [visible, setVisible] = useState(false);
  const [station, setStation] = useState<Station | null>(null);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const current = lines[active];
  const reached = station ? loopStops.findIndex((stop) => stop.station === station) : -1;
  const next = useCallback(() => {
    if (pinned || !visible) return;
    setActive((value) => (value + 1) % lines.length);
  }, [pinned, visible]);
  const choose = (index: number) => {
    setPinned(true);
    setActive(index);
    setRun((value) => value + 1);
  };
  return (
    <div
      ref={ref}
      className={visible ? "transit is-running" : "transit"}
      style={{ "--active": current.color } as CSSProperties}
    >
      <svg className="transit-svg" viewBox="0 0 1000 520" role="img" aria-labelledby="transit-desc">
        <desc id="transit-desc">{t("map_description_51ab3e")}</desc>
        <defs>
          <pattern id="transit-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="transit-dot" />
          </pattern>
          <radialGradient id="hub-glow">
            <stop offset="0%" style={{ stopColor: "var(--active)", stopOpacity: 0.35 }} />
            <stop offset="100%" style={{ stopColor: "var(--active)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <rect width="1000" height="520" fill="url(#transit-grid)" />

        {/* The circuit: route() → name → params → locale → URL → back to route() */}
        <path className="loop-track" d={loopPath} />
        <path id="loop-path" className="loop-active" d={loopPath} pathLength={1} />
        <text className="map-label map-loop" x={(LOOP.left + LOOP.right) / 2} y={LOOP.bottom + 30} textAnchor="middle">
          ↺ {t("next_route_loop_3d9a71")}
        </text>

        <path className="transit-manual" d={`M330 505 C430 505 ${HUB.x} 440 ${HUB.x} ${HUB.y + HUB.r}`} pathLength={1} />
        <text className="map-label map-manual" x="232" y="500" textAnchor="end">
          createRoutes()
        </text>

        {geometry.map(({ line, y, d }, index) => (
          <g
            key={line.id}
            className={index === active ? "transit-line is-active" : "transit-line"}
            style={{ "--lc": line.color, "--n": index } as CSSProperties}
          >
            <path id={`line-${line.id}`} className="line-path" d={d} pathLength={1} />
            <circle className="line-origin" cx="250" cy={y} r="7" />
            <text className="map-label map-framework" x="228" y={y - 2} textAnchor="end">
              {line.framework}
            </text>
            <text className="map-label map-convention" x="228" y={y + 15} textAnchor="end">
              {line.convention}
            </text>
            {visible && index === active && (
              <circle key={`${run}-${active}`} className="train" r="5">
                <animateMotion dur="1.6s" repeatCount="indefinite" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.4 0 0.2 1">
                  <mpath href={`#line-${line.id}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        ))}

        {loopStops.map((stop, index) => (
          <g
            key={stop.station}
            className={`loop-stop${index <= reached ? " is-on" : ""}${index === reached ? " is-current" : ""}`}
          >
            <circle className="stop-dot" cx={stop.x} cy={stop.y} r={stop.station === "url" ? 13 : 8} />
            <text
              className="map-label map-stop"
              x={stop.station === "url" ? stop.x + 24 : stop.x}
              y={stop.station === "url" ? stop.y + 4 : stop.y - 20}
              textAnchor={stop.station === "url" ? "start" : "middle"}
            >
              {stop.label}
            </text>
          </g>
        ))}

        {visible && (
          <>
            <circle className="loop-train" r="6">
              <animateMotion dur="5.6s" repeatCount="indefinite">
                <mpath href="#loop-path" />
              </animateMotion>
            </circle>
            <circle className="loop-train is-tail" r="3.5">
              <animateMotion dur="5.6s" begin="-0.18s" repeatCount="indefinite">
                <mpath href="#loop-path" />
              </animateMotion>
            </circle>
          </>
        )}

        <circle className="hub-glow" cx={HUB.x} cy={HUB.y} r={HUB.r + 34} fill="url(#hub-glow)" />
        <circle className="hub-orbit" cx={HUB.x} cy={HUB.y} r={HUB.r + 10} />
        <circle className="hub" cx={HUB.x} cy={HUB.y} r={HUB.r} />
        <text className="hub-label" x={HUB.x} y={HUB.y + 5} textAnchor="middle">
          route()
        </text>
      </svg>
      <RouteStoryboard
        story={{
          file: current.file,
          name: current.name,
          params: current.params,
          locale: "pt",
          url: current.localizedUrl,
          color: current.color,
        }}
        playKey={visible ? `${run}-${active}` : "paused"}
        onStation={setStation}
        onDone={next}
      />
      <div className="transit-legend" role="group" aria-label={t("map_select_9d2e71")}>
        {lines.map((line, index) => (
          <button
            key={line.id}
            type="button"
            aria-pressed={index === active}
            style={{ "--lc": line.color } as CSSProperties}
            onClick={() => choose(index)}
          >
            <span className="line-dot" aria-hidden="true" />
            {line.framework}
          </button>
        ))}
        {pinned && (
          <button type="button" className="legend-resume" onClick={() => setPinned(false)}>
            {t("resume_departures_1f7c2b")}
          </button>
        )}
      </div>
    </div>
  );
}
