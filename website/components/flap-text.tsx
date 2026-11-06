import type { CSSProperties } from "react";
/**
 * Split-flap text: each character is a cell keyed by its value, so only the
 * cells that change remount and play the flip. Screen readers get plain text.
 */
export function FlapText({
  text,
  length,
  className = "",
}: {
  text: string;
  length?: number;
  className?: string;
}) {
  const shown = length ? text.slice(0, length).padEnd(length) : text;
  return (
    <span className={`flap ${className}`}>
      <span className="visually-hidden">{text}</span>
      <span className="flap-cells" aria-hidden="true">
        {[...shown].map((char, index) => (
          <span
            // Remount (and flip) only when this position's character changes.
            key={`${index}:${char}`}
            className={char === " " ? "flap-cell is-blank" : "flap-cell"}
            style={{ "--i": index } as CSSProperties}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  );
}
