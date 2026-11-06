"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { CodeBlock } from "./code-block";
import { Icon } from "./icon";
import { LIFECYCLE_STATIONS, type StoryboardProps } from "./route-storyboard";

const BEAT = 850;
const HOLD = 650;
const DURATION = BEAT * 4 + HOLD;

export function RouteJourney({ story, playKey, onStation, onDone }: StoryboardProps) {
  const t = useTranslations("ui");
  const [elapsed, setElapsed] = useState(0);
  const codeViewport = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const callbacks = useRef({ onStation, onDone });
  callbacks.current = { onStation, onDone };
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    setElapsed(reduce ? DURATION * 7 - HOLD : 0);
    if (reduce) {
      callbacks.current.onStation?.("browser");
      const timer = window.setTimeout(() => callbacks.current.onDone?.(), 4000);
      return () => window.clearTimeout(timer);
    }
    const start = performance.now();
    let previous = -1;
    const timer = window.setInterval(() => {
      const time = performance.now() - start;
      const index = Math.min(6, Math.floor(time / DURATION));
      setElapsed(Math.min(time, DURATION * 7 - 1));
      if (index !== previous) {
        previous = index;
        callbacks.current.onStation?.(LIFECYCLE_STATIONS[index]);
      }
      if (time >= DURATION * 7) {
        window.clearInterval(timer);
        callbacks.current.onDone?.();
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [story.file, story.name, story.url, playKey]);

  const index = Math.min(6, Math.floor(elapsed / DURATION));
  const stage = LIFECYCLE_STATIONS[index];
  const time = reduced ? DURATION : elapsed % DURATION;
  const count = Math.min(4, Math.floor(time / BEAT) + 1);
  const done = time >= BEAT * 4;
  const setup = story.lifecycle!;
  const code = stage === "install" ? setup.install
    : stage === "configure" ? (story.code?.join("\n") ?? setup.configureCode ?? setup.configure)
      : stage === "name" ? `// ${story.file}\nconst name = ${JSON.stringify(story.name)};`
        : stage === "locale" ? `const locale = ${JSON.stringify(story.locale)};\nconst localized = route.forLocale(locale);`
          : stage === "params" ? `const params = ${story.params};\nconst href = route(${JSON.stringify(story.name)}, params, { locale: ${JSON.stringify(story.locale)} });\n// ${story.url}`
            : setup.render;
  const visibleLines = reduced ? code.split("\n").length : Math.floor(time / 240) + 1;
  useEffect(() => {
    const viewport = codeViewport.current;
    const line = viewport?.querySelector(".code-line.is-on:last-of-type") ?? viewport?.querySelectorAll(".code-line.is-on").item(visibleLines - 1);
    if (!viewport || !line) return;
    const overflow = line.getBoundingClientRect().bottom - viewport.getBoundingClientRect().bottom;
    if (overflow > 0) viewport.scrollTop += overflow;
  }, [stage, visibleLines]);
  return (
    <div className="storyboard is-lifecycle is-sequential is-narrated" style={{ "--lc": story.color ?? "var(--accent)" } as CSSProperties}>
      <div className="story-stage-header">
        <span className="story-label">{index + 1} / 7 · {t(`journey_${stage}_title`)}</span>
        <span className="journey-demo">DEMO</span>
        {done ? <span className="story-stage-check"><Icon name="check" size={20} /></span> : <span className="story-stage-working" aria-hidden="true" />}
      </div>
      <div className="story-stage-progress" aria-hidden="true">
        {LIFECYCLE_STATIONS.map((s, i) => <span key={s} className={i < index || (i === index && done) ? "is-done" : i === index ? "is-current" : undefined} />)}
      </div>
      <div className="story-stage-content" key={stage}>
        {stage === "browser" ? (
          <div className="story-browser is-on">
            <div className="story-browser-bar"><span aria-hidden="true">● ● ●</span><code>{story.url}</code></div>
            <div className="story-browser-page"><Icon name="check" size={22} /><code>{story.name}</code></div>
          </div>
        ) : <div className="journey-code" ref={codeViewport}><CodeBlock code={code} language={stage === "install" ? "bash" : "tsx"} label={t(`journey_${stage}_title`)} lineNumbers visibleLines={visibleLines} /></div>}
        {stage === "configure" && !story.code && (
          <ol className="journey-tree" aria-label={story.file}>
            {story.file.split("/").map((part, i, parts) => <li key={i} style={{ paddingLeft: i * 10, visibility: i < visibleLines ? "visible" : "hidden" }}><Icon name={i === parts.length - 1 ? "code" : "folder"} size={13} /><code>{part}{i < parts.length - 1 ? "/" : ""}</code></li>)}
          </ol>
        )}
      </div>
      <ol className="journey-log" aria-label={t(`journey_${stage}_title`)}>
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className={i < count - 1 || done ? "is-done" : "is-working"}>
            {i < count - 1 || done ? <Icon name="check" size={14} /> : <span className="journey-log-dot" />}
            <span>{t(`journey_${stage}_step${i}`)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
