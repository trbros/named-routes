import type { CSSProperties } from "react";
export function Icon({
  name,
  size = 18,
}: {
  name:
    | "search"
    | "book"
    | "chevron"
    | "expand"
    | "collapse"
    | "route"
    | "arrow"
    | "code"
    | "folder"
    | "check"
    | "copy"
    | "sun"
    | "moon"
    | "grid"
    | "terminal";
  size?: number;
}) {
  const paths = {
    search: "M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    book: "M3 4h7a3 3 0 0 1 2 1 3 3 0 0 1 2-1h7v16h-7a3 3 0 0 0-2 1 3 3 0 0 0-2-1H3zM12 5v16",
    chevron: "m8 10 4 4 4-4",
    expand: "M9 3H3v6m0-6 7 7m5 11h6v-6m0 6-7-7",
    collapse: "M3 9h6V3m0 6-7-7m19 13h-6v6m0-6 7 7",
    route: "M4 5h10a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8h10M4 2v6M20 18v6",
    arrow: "M5 12h14M13 6l6 6-6 6",
    code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18",
    folder: "M3 6h7l2 2h9v12H3z",
    check: "m5 12 4 4L19 6",
    copy: "M9 9h12v12H9zM15 5V3H3v12h2",
    sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    moon: "M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10",
    grid: "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z",
    terminal: "m4 5 6 7-6 7m9 0h7",
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 } as CSSProperties}
    >
      <path d={paths[name]} />
    </svg>
  );
}
