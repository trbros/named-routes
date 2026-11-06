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
const manualCode = [
  'import { createRoutes } from "@triooo/named-routes";',
  '',
  'const route = createRoutes({',
  '  "users.$user": "/users/[user]"',
  '}, {',
  '  i18n: { locales: ["en", "pt"], defaultLocale: "en" }',
  '});',
  '',
  'route("users.$user", { user: "ana" }, { locale: "pt" });',
] as const;
const URL_X = LOOP.right + RADIUS;
const loopStops: { x: number; y: number; station: Station; label: string }[] = [
  { x: 630, y: LOOP.top, station: "install", label: "install" },
  { x: 740, y: LOOP.top, station: "configure", label: "configure" },
  { x: 850, y: LOOP.top, station: "name", label: "name" },
  { x: URL_X, y: HUB.y, station: "locale", label: "locale" },
  { x: 850, y: LOOP.bottom, station: "params", label: "params" },
  { x: 740, y: LOOP.bottom, station: "render", label: "render" },
  { x: 630, y: LOOP.bottom, station: "browser", label: "browser" },
];
const mapEntries = [
  ...lines,
  { id: "manual", framework: "createRoutes()", convention: "routes.ts", color: "#f4f6ee" },
];
const geometry = mapEntries.map((line, index) => {
  const y = 34 + index * 62;
  const entry = HUB.x - HUB.r;
  return { line, y, d: `M230 ${y} H270 C390 ${y} 390 ${HUB.y} ${entry} ${HUB.y}` };
});

/**
 * Seven framework lines and the manual helper fan into the route() roundel. From there one circuit
 * runs through installation, configuration, naming, locale, params, render and browser, then
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
  const manual = active === lines.length;
  const current = lines[active] ?? lines[0];
  const reached = station ? loopStops.findIndex((stop) => stop.station === station) : -1;
  const next = useCallback(() => {
    if (pinned || !visible) return;
    setActive((value) => (value + 1) % mapEntries.length);
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
      style={{ "--active": manual ? "var(--night-ink)" : current.color } as CSSProperties}
    >
      <div className="transit-map-viewport" tabIndex={0} role="region" aria-labelledby="network-title">
      <svg className="transit-svg" viewBox="0 0 1050 520" role="img" aria-labelledby="transit-desc">
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
        <rect width="1050" height="520" fill="url(#transit-grid)" />

        {/* The circuit follows setup, URL generation, render and the browser preview. */}
        <path className="loop-track" d={loopPath} />
        <path id="loop-path" className="loop-active" d={loopPath} pathLength={1} />
        <text className="map-label map-loop" x={(LOOP.left + LOOP.right) / 2} y={LOOP.bottom + 66} textAnchor="middle">
          ↺ {t("next_route_loop_3d9a71")}
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
            <circle className="stop-dot" cx={stop.x} cy={stop.y} r={stop.station === "browser" ? 13 : 8} />
            <text
              className="map-label map-stop"
              x={stop.x === URL_X ? stop.x + 24 : stop.x}
              y={stop.x === URL_X ? stop.y + 4 : stop.y === LOOP.bottom ? stop.y + 32 : stop.y - 20}
              textAnchor={stop.x === URL_X ? "start" : "middle"}
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
      </div>
      <RouteStoryboard
        story={manual ? {
          file: "routes.ts",
          code: manualCode,
          lifecycle: { install: "npm i @triooo/named-routes", configure: "createRoutes(routes, { i18n })", render: "<a href={route(...)}>…</a>" },
          name: "users.$user",
          locale: "pt",
          params: '{ user: "ana" }',
          url: "/pt/users/ana",
          color: "var(--night-ink)",
        } : {
          file: current.localizedFile,
          lifecycle: {
            install: "npm i @triooo/named-routes",
            configure: `${current.connect} · ${current.connectWhere}`,
            configureCode: current.id === "next"
              ? 'import { withNamedRoutes } from "@triooo/named-routes/next";\n\nexport default withNamedRoutes({\n  reactStrictMode: true\n});'
              : `import { namedRoutes } from "@triooo/named-routes/vite";\n\nconst plugin = namedRoutes({\n  framework: "${current.id === "tanstack" ? "tanstack-router" : current.id}"\n});`,
            render: current.id === "nuxt" ? "<NuxtPage />" : current.id === "vue" ? "<RouterView />" : current.id === "astro" ? "<Page /> → HTML" : current.id === "sveltekit" ? "+page.svelte → HTML" : "<Page />",
          },
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
        {mapEntries.map((line, index) => (
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
          <button type="button" className="legend-resume" onClick={() => { setPinned(false); setRun((value) => value + 1); }}>
            {t("resume_departures_1f7c2b")}
          </button>
        )}
      </div>
    </div>
  );
}
