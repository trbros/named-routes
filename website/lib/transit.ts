/**
 * Showcase data for the transit metaphor. Every file → name → URL triple was
 * produced by the package's own generator (see tests/frameworks.test.mjs);
 * do not add a framework here unless an adapter for it exists.
 */
export interface Line {
  id: string;
  /** Documentation page id (/docs/<docId>). */
  docId: string;
  /** Departure board label (max 12 characters). */
  board: string;
  framework: string;
  convention: string;
  file: string;
  name: string;
  url: string;
  connect: "withNamedRoutes()" | "namedRoutes()" | "createRoutes()";
  connectWhere: string;
  scans: string;
  verified: "next" | "vite" | "demo" | "runtime";
  /** Params of the example call, as displayed. */
  params: string;
  /** URL with { locale: "pt" } (locales en/pt, as-needed). */
  localizedUrl: string;
  color: string;
}
export const lines: readonly Line[] = [
  { id: "next", docId: "nextjs", board: "NEXT.JS", framework: "Next.js", convention: "app/**/page.tsx · pages/**", file: "app/users/[user]/page.tsx", name: "users.$user", url: "/users/ana", connect: "withNamedRoutes()", connectWhere: "next.config", scans: "app/, pages/ (or src/)", verified: "next", params: "{ user: \"ana\" }", localizedUrl: "/pt/users/ana", color: "#d5f43b" },
  { id: "nuxt", docId: "nuxt", board: "NUXT", framework: "Nuxt", convention: "pages/**/*.vue", file: "app/pages/user/profile.vue", name: "user.profile", url: "/user/profile", connect: "namedRoutes()", connectWhere: "nuxt.config → vite.plugins", scans: "app/pages/ or pages/, server/api/", verified: "demo", params: "{}", localizedUrl: "/pt/user/profile", color: "#5fd3c8" },
  { id: "vue", docId: "vue", board: "VUE ROUTER", framework: "Vue Router", convention: "src/pages/**/*.vue", file: "src/pages/settings.vue", name: "settings", url: "/settings", connect: "namedRoutes()", connectWhere: "vite.config", scans: "src/pages/ (file-based routing)", verified: "vite", params: "{}", localizedUrl: "/pt/settings", color: "#7fe08f" },
  { id: "sveltekit", docId: "sveltekit", board: "SVELTEKIT", framework: "SvelteKit", convention: "src/routes/**/+page.svelte", file: "src/routes/blog/[slug]/+page.svelte", name: "blog.$slug", url: "/blog/hello", connect: "namedRoutes()", connectWhere: "vite.config", scans: "src/routes/", verified: "demo", params: "{ slug: \"hello\" }", localizedUrl: "/pt/blog/hello", color: "#ff7a50" },
  { id: "astro", docId: "astro", board: "ASTRO", framework: "Astro", convention: "src/pages/**/*.astro", file: "src/pages/docs/[...slug].astro", name: "docs.$slug", url: "/docs/guide/install", connect: "namedRoutes()", connectWhere: "astro.config → vite.plugins", scans: "src/pages/", verified: "demo", params: "{ slug: [\"guide\",\"install\"] }", localizedUrl: "/pt/docs/guide/install", color: "#f5b83d" },
  { id: "react-router", docId: "react-router", board: "REACT ROUTER", framework: "React Router", convention: "app/routes/*.tsx (flat routes)", file: "app/routes/concerts.$city.tsx", name: "concerts.$city", url: "/concerts/lisbon", connect: "namedRoutes()", connectWhere: "vite.config", scans: "app/routes/ (flat routes)", verified: "demo", params: "{ city: \"lisbon\" }", localizedUrl: "/pt/concerts/lisbon", color: "#6aa8ff" },
  { id: "tanstack", docId: "tanstack-router", board: "TANSTACK", framework: "TanStack Router", convention: "src/routes/**/*.tsx", file: "src/routes/posts/$postId.tsx", name: "posts.$postId", url: "/posts/42", connect: "namedRoutes()", connectWhere: "vite.config", scans: "src/routes/", verified: "demo", params: "{ postId: 42 }", localizedUrl: "/pt/posts/42", color: "#f28cc4" },
];
/** Extra board rows: Pages Router and an i18n route (pathnames { "/about": { pt: "/sobre" } }). */
export const departures = [
  lines[0],
  lines[1],
  lines[3],
  { ...lines[0], board: "NEXT · I18N", file: "app/[locale]/about/page.tsx", name: "about", url: "/pt/sobre" },
  lines[5],
  lines[2],
  lines[6],
  { ...lines[0], board: "PAGES ROUTER", file: "pages/index.tsx", name: "home", url: "/" },
  lines[4],
] as const;
