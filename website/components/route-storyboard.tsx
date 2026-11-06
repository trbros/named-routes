"use client";
import { type CSSProperties, useEffect, useState } from "react";
import { FlapText } from "./flap-text";
import { Icon } from "./icon";
import { RouteJourney } from "./route-journey";

export interface Story {
  /** Project-relative file, e.g. app/users/[user]/page.tsx. */
  file: string;
  /** Manual definitions animate source code instead of a directory tree. */
  code?: readonly string[];
  name: string;
  /** Display form of the params object, e.g. { user: "ana" }. */
  params: string;
  /** Omit when the site is not localized by URL. */
  locale?: string;
  url: string;
  color?: string;
  lifecycle?: { install: string; configure: string; render: string; configureCode?: string };
}
export const STATIONS = ["name", "locale", "params", "url"] as const;
export const LIFECYCLE_STATIONS = ["install", "configure", "name", "locale", "params", "render", "browser"] as const;
export type Station = (typeof STATIONS)[number] | (typeof LIFECYCLE_STATIONS)[number];

/** Formats real params as a compact object literal for display. */
export function formatParams(params: Record<string, unknown>) {
  const entries = Object.entries(params).filter(([, value]) => value !== undefined);
  if (!entries.length) return "{}";
  return `{ ${entries.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(", ")} }`;
}

/**
 * Plays how a route is born: folders and the page file are created one by
 * one, then the name, locale, params and URL stations light up along a thin
 * line. Reduced motion shows the finished story at once.
 */
export interface StoryboardProps {
  story: Story;
  playKey?: string | number;
  onStation?: (station: Station | null) => void;
  onDone?: () => void;
  compact?: boolean;
}

export function RouteStoryboard(props: StoryboardProps) {
  return props.story.lifecycle ? <RouteJourney {...props} /> : <RouteStorySteps {...props} />;
}

function RouteStorySteps({ story, playKey, onStation, onDone, compact = false }: StoryboardProps) {
  const parts = story.file.split("/");
  const segments = story.code ?? parts.map((part, index) => (index < parts.length - 1 ? `${part}/` : part));
  const stations = STATIONS.filter((station) => station !== "locale" || story.locale);
  const timeline = [...segments.map(() => null), ...stations];
  const values: Record<Station, string> = {
    name: story.name,
    params: story.params,
    locale: story.locale ?? "",
    url: story.url,
    install: story.lifecycle?.install ?? "",
    configure: story.lifecycle?.configure ?? "",
    render: story.lifecycle?.render ?? "",
    browser: story.url,
  };
  const total = timeline.length;
  const [step, setStep] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(total);
      onStation?.(stations.at(-1) ?? null);
      const timer = window.setTimeout(() => onDone?.(), 4000);
      return () => window.clearTimeout(timer);
    }
    setStep(0);
    onStation?.(null);
    const timers: number[] = [];
    let at = 250;
    for (let index = 1; index <= total; index++) {
      at += timeline[index - 1] === null ? 430 : 620;
      timers.push(
        window.setTimeout(() => {
          setStep(index);
          if (timeline[index - 1]) onStation?.(timeline[index - 1]);
        }, at),
      );

    }
    timers.push(window.setTimeout(() => onDone?.(), at + 2200));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
    // Replays when the story (or its key) changes; callbacks are not deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story.file, story.url, story.name, story.params, story.code, story.lifecycle?.install, story.lifecycle?.configure, story.lifecycle?.render, playKey]);
  const sourceStep = step;
  const reached = stations.filter((station) => timeline.indexOf(station) < step).length;
  const progress = stations.length > 1 ? Math.max(0, reached - 1) / (stations.length - 1) : 1;
  const source = (story.code ? (
        <div className="story-code" aria-hidden="true">
          <div className="story-source"><Icon name="code" size={14} />{story.file}</div>
          <pre><code>{story.code.map((line, index) => (
            <span key={index} className={sourceStep > index ? "is-on" : undefined}>
              <span className="story-code-number">{index + 1}</span>{line || " "}
            </span>
          ))}</code></pre>
        </div>
      ) : <ol className="story-tree" aria-hidden="true">
        {segments.map((segment, index) => {
          const file = index === segments.length - 1;
          return (
            <li
              key={`${story.file}:${index}`}
              className={sourceStep > index ? "is-on" : undefined}
              style={{ "--depth": index } as CSSProperties}
            >
              <Icon name={file ? "code" : "folder"} size={14} />
              <span>{segment}</span>
              {file && sourceStep > index && <span className="story-new">new</span>}
            </li>
          );
        })}
      </ol>);
  return (
    <div
      className={`storyboard${compact ? " is-compact" : ""}${story.lifecycle ? " is-lifecycle" : ""}`}
      style={{ "--lc": story.color ?? "var(--accent)", "--progress": progress } as CSSProperties}
    >
      <p className="visually-hidden">
        {story.code ? story.code.join("\n") : story.file} → {story.name}
        {story.locale ? ` → ${story.locale}` : ""} → {story.params} → {story.url}
      </p>
      {source}
      <ol className="story-line" aria-hidden="true" style={{ "--count": stations.length } as CSSProperties}>
        {stations.map((station, index) => (
          <li key={station} className={reached > index ? "is-on" : undefined}>
            <span className="story-dot" />
            <span className="story-label">{station === "url" ? "URL" : station}</span>
            <span className="story-value">
              {reached > index ? <FlapText text={values[station]} /> : <span className="story-pending">···</span>}
            </span>
          </li>
        ))}
      </ol>

    </div>
  );
}
