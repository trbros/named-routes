"use client";
import { type CSSProperties, useEffect, useState } from "react";
import { FlapText } from "./flap-text";
import { Icon } from "./icon";

export interface Story {
  /** Project-relative file, e.g. app/users/[user]/page.tsx. */
  file: string;
  name: string;
  /** Display form of the params object, e.g. { user: "ana" }. */
  params: string;
  /** Omit when the site is not localized by URL. */
  locale?: string;
  url: string;
  color?: string;
}
export const STATIONS = ["name", "locale", "params", "url"] as const;
export type Station = (typeof STATIONS)[number];

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
export function RouteStoryboard({
  story,
  playKey,
  onStation,
  onDone,
  compact = false,
}: {
  story: Story;
  playKey?: string | number;
  onStation?: (station: Station | null) => void;
  onDone?: () => void;
  compact?: boolean;
}) {
  const parts = story.file.split("/");
  const segments = parts.map((part, index) => (index < parts.length - 1 ? `${part}/` : part));
  const stations = STATIONS.filter((station) => station !== "locale" || story.locale);
  const values: Record<Station, string> = {
    name: story.name,
    params: story.params,
    locale: story.locale ?? "",
    url: story.url,
  };
  const total = segments.length + stations.length;
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
      at += index <= segments.length ? 430 : 620;
      timers.push(
        window.setTimeout(() => {
          setStep(index);
          if (index > segments.length) onStation?.(stations[index - segments.length - 1]);
        }, at),
      );
    }
    timers.push(window.setTimeout(() => onDone?.(), at + 2200));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
    // Replays when the story (or its key) changes; callbacks are not deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story.file, story.url, story.name, story.params, playKey]);
  const reached = Math.max(0, step - segments.length);
  const progress = stations.length > 1 ? Math.max(0, reached - 1) / (stations.length - 1) : 1;
  return (
    <div
      className={compact ? "storyboard is-compact" : "storyboard"}
      style={{ "--lc": story.color ?? "var(--accent)", "--progress": progress } as CSSProperties}
    >
      <p className="visually-hidden">
        {story.file} → {story.name}
        {story.locale ? ` → ${story.locale}` : ""} → {story.params} → {story.url}
      </p>
      <ol className="story-tree" aria-hidden="true">
        {segments.map((segment, index) => {
          const file = index === segments.length - 1;
          return (
            <li
              key={`${story.file}:${index}`}
              className={step > index ? "is-on" : undefined}
              style={{ "--depth": index } as CSSProperties}
            >
              <Icon name={file ? "code" : "folder"} size={14} />
              <span>{segment}</span>
              {file && step > index && <span className="story-new">new</span>}
            </li>
          );
        })}
      </ol>
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
