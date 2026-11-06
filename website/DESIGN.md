# NamedRoutes by triooo

English-first developer package with Portuguese translation. The npm scope is @triooo; GitHub is https://github.com/trbros. These independent identities are intentional. Version comes from package.json through lib/release.ts. Public documentation describes usage and compatibility, with no publishing status or maintainer release procedure.

## Reference direction

Follow the latest graphite/lime reference: edge-to-edge pages with no rounded outer frame, restrained geometric borders, a left-aligned typographic hero paired with an original route-inference panel and an actual interactive preview. Dark is default: background #111312, panel #191c19, line #30372f, text #f1f4ed, lime #d5f43b. Light: background #fafbf8, panel #f1f4ec, line #dce3d4, text #20271d, readable olive #596d13; primary actions retain lime with dark text. Highlighted code stays dark in both themes. app/reference.css owns final tokens and layouts after globals.css and landing.css. Instrument Sans supplies display/body; JetBrains Mono supplies code. Body copy is 15–17px, code 12–14px, utility labels at least 11px.

The hero visualizes one actual page becoming user.profile, with a working destination link. Installation is immediately available through a copyable command. The working filesystem → name → code → URL preview follows with its own title and instructions. These two scales communicate the concept before users explore the details. Use a 1280px inner reading grid, generous vertical rhythm, 7–14px component radii and edge-to-edge page shells; no outer rounded frame. Router tabs change the demonstrated convention; they do not switch the running Next router. No invented metrics, endorsements or backend activity. SiteFooter is shared by all shells and includes official triooo SVG theme variants with attribution and real navigation.

## Logo

The original vector mark combines opposing route boundaries, endpoint dots and a northeast directional arrow. Canonical SVGs are in assets/; public/brand contains web copies; BrandMark owns inline geometry. Colors inherit the active theme. No copied marks or trademark-clearance claims.

## Shared ownership

Workspace owns the landing, documentation and playground shells and mobile navigation. ThemeProvider wraps next-themes, which owns the html data-theme attribute, localStorage persistence and pre-hydration theme selection. All light-theme CSS scopes from html[data-theme="light"]. next-intl owns the locale and UI translations through i18n/request.ts and messages/en.json + pt.json; useSiteLocale supplies shared controls using useTranslations. A validated Server Action writes an HttpOnly language cookie and router.refresh updates server content, metadata and html lang. English remains the default. Documentation owns the topic index, grouped sidebar and article layout; lib/docs.ts owns topic groups and shareable query links. DocsSearch owns local title/text search, empty states and keyboard navigation. DocsCode extends shared CodeBlock and CopyButton with line numbers and expansion. The installation panel keeps its filename/copy toolbar separate from its dark code surface in both themes. CodeBlock owns Shiki syntax highlighting, including readable highlighted code in both themes. CopyButton owns success/failure feedback.

Documentation content lives in docs/content.json; docs/groups.json defines the sidebar groups. scripts/sync-docs.py turns both into one short README per language plus one topic page per group in docs/<code>/*.md. The 25 public topics cover usage, integration, contribution and version upgrades. Maintainer publication instructions exist only in RELEASE.private.md, ignored by Git and excluded by the npm files whitelist. /documentation is the index; ?section=installation selects a topic. The sidebar scrolls only its own navigation area to reveal the current item. The right index tracks visible article headings. Previous/next links and search results use the same docHref helper.

Playground owns editable params/query/hash; Destination renders real server-received parameters. English is default; EN/PT changes interface and guide content and persists in a non-sensitive locale cookie. Native details disclose navigation groups and FAQ. Invalid inputs retain their values and hide invalid destination links. Clipboard errors provide inline recovery.

## Accessibility and motion

Finite entrance and route-trace motion highlight automatic naming. Reduced-motion disables decorative animations and smooth scrolling. Visible focus, semantic controls, combobox/listbox keyboard behavior and keyboard-scrollable code remain required. At narrow widths documentation navigation becomes a disclosure, the article uses one column, the right index hides, and code scrolls within its panel. Check 320–1440px, both themes, both locales, search empty/results/keyboard, code copy/expansion, active navigation and real route navigation before release.

## Transit layer (2026 redesign)

The site is the package's documentation, not a demo; runnable demos live in `examples/`. The visual metaphor is a transit system: every supported framework is a coloured line (`lib/transit.ts`, `--lc` per line; never reuse `--line`, the border token), `route()` is the interchange, URLs are destinations. Components: `DepartureBoard` (split-flap rows of real generator output), `TransitMap` (SVG lines, SMIL trains only while visible), `FlapText` (per-character flip; only changed cells animate), `MotionObserver` (scroll reveals for `[data-reveal]`, docs sections and release cards). `app/transit.css` loads last. Boards and maps stay dark in both themes. Every animation is finite, paused off screen or user-driven, and disabled under `prefers-reduced-motion`; hidden-until-revealed styles apply only under `@media (scripting: enabled)`.

The logo is a metro line drawn as an "N" (Named): origin station, accent diagonal (the resolved route) and a terminal ring. Canonical SVGs live in `assets/`; `public/brand` and `app/icon.svg` are copies.

## Languages

EN, PT, ES and JA come from docs/locales.json. Interface strings live in messages/<code>.json, documentation in ../docs/content.json. Run `pnpm locales` / `pnpm locales:check` at the repository root after editing English text. Japanese uses CJK fallback fonts, zero letter-spacing on headings and `word-break: auto-phrase` (app/transit.css).

## Page height and missing destinations

The shared `.workspace.site-shell` is a flex column with `min-height: 100dvh` (100svh fallback). Its content grows to fill short pages; document scrolling remains natural for long content. Header and footer keep their intrinsic height. Avoid fixed viewport heights or clipping page overflow. The shared 404 uses a broken transit rail and a typographic 404, translated recovery copy and links to playground, documentation and home. It stacks on narrow screens and inherits existing theme tokens.

## Tailwind CSS v4

`app/globals.css` is the single CSS entry point. It imports Tailwind theme/utilities and the existing foundation, landing, reference and transit styles in their established order inside the components layer. The existing reset is retained instead of Preflight to preserve the documentation layout. Utilities can override component rules. CSS-first `@theme inline` maps font and semantic color utilities to the runtime tokens; `dark:` follows next-themes' `data-theme="dark"`. PostCSS uses `@tailwindcss/postcss`; class discovery is scoped to website sources. Keep complex transit animation and diagram styles in CSS, and use utilities for component-level styling.
