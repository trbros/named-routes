/**
 * A metro line drawn as an "N" (Named) with two stations: the origin page and
 * the terminal URL. The accent diagonal is the route the package resolves.
 * `animated` draws the line once, then the terminal station pulses.
 */
export function BrandMark({
  size = 32,
  animated = false,
}: {
  size?: number;
  animated?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={animated ? "brand-mark is-animated" : "brand-mark"}
    >
      <path
        className="brand-line"
        pathLength={1}
        d="M16 52V16l32 32V18"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="brand-route"
        pathLength={1}
        d="M16 16l32 32"
        stroke="var(--accent)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle className="brand-origin" cx="16" cy="52" r="5.5" fill="currentColor" />
      <circle
        className="brand-terminal"
        cx="48"
        cy="11"
        r="5"
        stroke="var(--accent)"
        strokeWidth="4"
      />
    </svg>
  );
}
