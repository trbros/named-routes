/**
 * File-system routing conventions. Each adapter converts a file path into the
 * canonical pattern syntax used by the runtime (`/users/[id]`, `[...slug]`,
 * `[[...slug]]`, `[[id]]`, mixed `v[major]-[minor]`). Adapters never execute
 * or parse source files; they only read paths.
 */
import { NamedRouteError } from "./index.js";

export type FrameworkId =
  | "next"
  | "nuxt"
  | "vue"
  | "sveltekit"
  | "astro"
  | "react-router"
  | "tanstack-router"
  | "manual";
export const frameworks: readonly FrameworkId[] = [
  "next",
  "nuxt",
  "vue",
  "sveltekit",
  "astro",
  "react-router",
  "tanstack-router",
  "manual",
];

/** A directory the adapter scans and how its files become URLs. */
export interface SourceKind {
  /** Reported as `router` on discovered entries (e.g. app, pages, routes, api). */
  kind: string;
  /** Candidate directories relative to the project root, first existing wins. */
  candidates: readonly string[];
  /** Static URL prefix for every route found here (e.g. Nitro server/api -> /api). */
  prefix?: string;
  /** Only scanned when includeApi is enabled. */
  api?: boolean;
}
export interface FileContext {
  kind: string;
  /** Directory names between the source directory and the file. */
  parts: readonly string[];
  /** File name without the matched extension. */
  stem: string;
  extension: string;
  includeApi: boolean;
}
export interface MappedRoute {
  /** Canonical URL pattern. */
  path: string;
  /** A layout/interception/alias that shares a URL with a primary route. */
  variant?: boolean;
  /** An endpoint (Route Handler, API route, server route); never localized. */
  api?: boolean;
}
export interface Adapter {
  id: FrameworkId;
  label: string;
  sources: readonly SourceKind[];
  extensions: readonly string[];
  /** Next.js reports duplicate URLs as errors; nested-layout routers merge them. */
  strictDuplicates: boolean;
  skipDirectory(name: string, context: { kind: string; parts: readonly string[] }): boolean;
  map(file: FileContext): MappedRoute | null;
}

const fail = (message: string): never => {
  throw new NamedRouteError("GENERATION_ERROR", message);
};
const isGroup = (value: string) => /^\([^()]*\)$/.test(value);
const join = (segments: readonly string[]) => `/${segments.filter(Boolean).join("/")}`;
const hidden = (name: string) => name.startsWith(".");

/** Split on dots that are not inside [] (escapes or parameters) or {} (TanStack). */
function splitDots(value: string) {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of value) {
    if (char === "[" || char === "{") depth++;
    else if ((char === "]" || char === "}") && depth > 0) depth--;
    if (char === "." && depth === 0) {
      parts.push(current);
      current = "";
    } else current += char;
  }
  parts.push(current);
  return parts;
}

// ---------------------------------------------------------------- Next.js
function canonicalApp(parts: readonly string[]) {
  const url: string[] = [];
  let variant = false;
  for (let part of parts) {
    if (part.startsWith("@")) {
      variant = true;
      continue;
    }
    const markers = part.match(/^(?:\(\.\)|\(\.\.\)|\(\.\.\.\))+/)?.[0];
    if (markers) {
      variant = true;
      for (const marker of markers.match(/\([^)]*\)/g) ?? []) {
        if (marker === "(...)") url.length = 0;
        else if (marker === "(..)") {
          if (!url.length) fail(`Interception above app root: ${parts.join("/")}`);
          url.pop();
        }
      }
      part = part.slice(markers.length);
    } else if (isGroup(part)) continue;
    if (part) url.push(part.replace(/%5f/gi, "_"));
  }
  return { path: join(url), variant };
}
const next: Adapter = {
  id: "next",
  label: "Next.js",
  sources: [
    { kind: "app", candidates: ["app", "src/app"] },
    { kind: "pages", candidates: ["pages", "src/pages"] },
  ],
  extensions: ["tsx", "ts", "jsx", "js"],
  strictDuplicates: true,
  skipDirectory: (name, { kind }) => kind === "app" && name.startsWith("_"),
  map({ kind, parts, stem, includeApi }) {
    if (kind === "app") {
      if (stem !== "page" && !(stem === "route" && includeApi)) return null;
      return { ...canonicalApp(parts), ...(stem === "route" ? { api: true } : {}) };
    }
    if (!parts.length && ["_app", "_document", "_error"].includes(stem)) return null;
    if (parts[0] === "api" && !includeApi) return null;
    return {
      path: join([...parts, ...(stem === "index" ? [] : [stem])]),
      ...(parts[0] === "api" ? { api: true } : {}),
    };
  },
};

// ------------------------------------------------- Vue-family conventions
/** Nuxt / unplugin-vue-router / Vue Router file-based token conversion. */
function vueToken(token: string, repeatable: boolean) {
  if (isGroup(token)) return "";
  if (repeatable) {
    const plus = token.match(/^\[(\[)?([^[\]]+)\]?\]\+$/);
    if (plus) return plus[1] ? `[[...${plus[2]}]]` : `[...${plus[2]}]`;
  }
  // vue-router `/:slug(.*)*` and `/:path(.*)` also match an empty remainder.
  const rest = token.match(/^\[\.\.\.([^[\]]*)\]$/);
  if (rest) return `[[...${rest[1] || "pathMatch"}]]`;
  return token;
}
function vueFamily(id: "nuxt" | "vue"): Adapter {
  const nuxt = id === "nuxt";
  return {
    id,
    label: nuxt ? "Nuxt" : "Vue Router (file-based)",
    sources: nuxt
      ? [
          { kind: "pages", candidates: ["app/pages", "pages", "src/pages"] },
          { kind: "api", candidates: ["server/api"], prefix: "/api", api: true },
          { kind: "server", candidates: ["server/routes"], api: true },
        ]
      : [{ kind: "pages", candidates: ["src/pages", "pages"] }],
    extensions: nuxt ? ["vue", "tsx", "ts", "jsx", "js", "mjs"] : ["vue"],
    strictDuplicates: false,
    skipDirectory: (name) => hidden(name) || (nuxt && name.startsWith("-")),
    map({ kind, parts, stem }) {
      if (nuxt && stem.startsWith("-")) return null;
      if (kind !== "pages") {
        // Nitro: server/api/users/[id].get.ts -> /api/users/[id]
        const base = stem.replace(
          /\.(get|post|put|patch|delete|head|options|connect|trace)$/i,
          "",
        );
        const tokens = [...parts, ...(base === "index" ? [] : [base])].map(
          (token) => (token === "[...]" ? "[[..._]]" : vueToken(token, false)),
        );
        return { path: join(tokens), api: true };
      }
      // unplugin-vue-router: dots nest (users.edit.vue); (name).vue is an index.
      const fileTokens = nuxt ? [stem] : splitDots(stem);
      if (fileTokens.at(-1) === "index") fileTokens.pop();
      const tokens = [...parts, ...fileTokens].map((token) => vueToken(token, !nuxt));
      return { path: join(tokens) };
    },
  };
}

// ------------------------------------------------------------- SvelteKit
function svelteToken(token: string) {
  if (isGroup(token)) return "";
  const decoded = token
    .replace(/\[x\+([0-9a-f]{2})\]/gi, (_, hex: string) =>
      String.fromCharCode(Number.parseInt(hex, 16)),
    )
    .replace(/\[u\+([0-9a-f]{4,6})\]/gi, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    // [id=integer] -> [id]; matchers only constrain the router.
    .replace(/=[A-Za-z0-9_]+(?=\]+)/g, "");
  const rest = decoded.match(/^\[\.\.\.([^[\]]+)\]$/);
  return rest ? `[[...${rest[1]}]]` : decoded;
}
const sveltekit: Adapter = {
  id: "sveltekit",
  label: "SvelteKit",
  sources: [{ kind: "routes", candidates: ["src/routes"] }],
  extensions: ["svelte", "ts", "js"],
  strictDuplicates: false,
  skipDirectory: hidden,
  map({ parts, stem, extension, includeApi }) {
    const page = /^\+page(?:@[^.]*)?(?:\.server)?$/.test(stem);
    const endpoint = stem === "+server" && extension !== "svelte";
    if (!page && !(endpoint && includeApi)) return null;
    if (page && stem.endsWith(".server") && extension === "svelte") return null;
    return { path: join(parts.map(svelteToken)), ...(endpoint ? { api: true } : {}) };
  },
};

// ----------------------------------------------------------------- Astro
const astroPages = new Set(["astro", "md", "mdx", "markdown", "html"]);
const astro: Adapter = {
  id: "astro",
  label: "Astro",
  sources: [{ kind: "pages", candidates: ["src/pages"] }],
  extensions: ["astro", "md", "mdx", "markdown", "html", "ts", "js"],
  strictDuplicates: false,
  skipDirectory: (name) => hidden(name) || name.startsWith("_"),
  map({ parts, stem, extension, includeApi }) {
    if (stem.startsWith("_")) return null;
    if (!astroPages.has(extension) && !includeApi) return null;
    const tokens = [...parts, ...(stem === "index" ? [] : [stem])].map((token) => {
      const rest = token.match(/^\[\.\.\.([^[\]]+)\]$/);
      return rest ? `[[...${rest[1]}]]` : token;
    });
    return { path: join(tokens), ...(astroPages.has(extension) ? {} : { api: true }) };
  },
};

// --------------------------------------------- React Router / Remix v2
function literal(token: string) {
  // [.] [_] [$] escapes keep their characters literally.
  return token.replace(/\[([^\]]*)\]/g, "$1");
}
/** `posts_` opts out of layout nesting; an escaped `[_]` stays literal. */
const unnest = (token: string) =>
  token.length > 1 && token.endsWith("_") && !token.endsWith("[_]")
    ? token.slice(0, -1)
    : token;
function reactRouterToken(raw: string, last: boolean, file: string) {
  if (raw === "_index" && last) return "";
  const token = unnest(raw);
  if (token === "$") return "[[...splat]]";
  const optional = token.match(/^\(\$([^()]+)\)$/);
  if (optional) return `[[${optional[1]}]]`;
  if (/^\(.*\)$/.test(token))
    fail(
      `Optional static segment ${token} in ${file} cannot be named; exclude the file or add extraRoutes`,
    );
  if (token.startsWith("$")) return `[${token.slice(1)}]`;
  if (token.startsWith("_")) return ""; // pathless layout
  return literal(token);
}
const reactRouter: Adapter = {
  id: "react-router",
  label: "React Router / Remix (flat routes)",
  sources: [{ kind: "routes", candidates: ["app/routes"] }],
  extensions: ["tsx", "ts", "jsx", "js", "mdx", "md"],
  strictDuplicates: false,
  skipDirectory: (name, { parts }) => hidden(name) || parts.length > 0,
  map({ parts, stem }) {
    let name: string;
    if (parts.length === 0) name = stem;
    else if (stem === "route" || stem === "index") name = parts[0];
    else return null;
    const tokens = splitDots(name);
    return {
      path: join(tokens.map((token, index) => reactRouterToken(token, index === tokens.length - 1, name))),
    };
  },
};

// -------------------------------------------------------- TanStack Router
function tanstackToken(raw: string, last: boolean) {
  if (isGroup(raw)) return "";
  if (last && (raw === "index" || raw === "route")) return "";
  const token = unnest(raw);
  if (token === "$") return "[[..._splat]]";
  const optional = token.match(/^\{-\$([^{}]+)\}$/);
  if (optional) return `[[${optional[1]}]]`;
  if (/^\$[^{}[\]]+$/.test(token)) return `[${token.slice(1)}]`;
  if (token.startsWith("_")) return ""; // pathless layout
  if (/\{-\$/.test(token))
    fail(`Optional parameters inside a segment are not supported: ${raw}`);
  return literal(token).replace(/\{\$([^{}]+)\}/g, "[$1]");
}
const tanstack: Adapter = {
  id: "tanstack-router",
  label: "TanStack Router",
  sources: [{ kind: "routes", candidates: ["src/routes", "app/routes"] }],
  extensions: ["tsx", "ts", "jsx", "js"],
  strictDuplicates: false,
  skipDirectory: (name) => hidden(name) || name.startsWith("-"),
  map({ parts, stem }) {
    if (stem.startsWith("-") || stem === "__root") return null;
    const fileTokens = splitDots(stem);
    if (fileTokens.at(-1) === "lazy") fileTokens.pop();
    const tokens = [...parts, ...fileTokens];
    return {
      path: join(tokens.map((token, index) => tanstackToken(token, index === tokens.length - 1))),
    };
  },
};

const manual: Adapter = {
  id: "manual",
  label: "Manual manifest",
  sources: [],
  extensions: ["ts"],
  strictDuplicates: true,
  skipDirectory: () => true,
  map: () => null,
};

export const adapters: Readonly<Record<FrameworkId, Adapter>> = {
  next,
  nuxt: vueFamily("nuxt"),
  vue: vueFamily("vue"),
  sveltekit,
  astro,
  "react-router": reactRouter,
  "tanstack-router": tanstack,
  manual,
};

/** Infer the framework from package.json dependencies. */
export function detectFramework(
  dependencies: Readonly<Record<string, unknown>>,
): FrameworkId | undefined {
  const has = (name: string) => Object.hasOwn(dependencies, name);
  if (has("nuxt") || has("nuxt-nightly")) return "nuxt";
  if (has("next")) return "next";
  if (has("@sveltejs/kit")) return "sveltekit";
  if (has("astro")) return "astro";
  if (has("@react-router/fs-routes") || has("@react-router/dev") || has("@remix-run/dev"))
    return "react-router";
  if (
    ["@tanstack/router-plugin", "@tanstack/router-cli", "@tanstack/react-start", "@tanstack/solid-start", "@tanstack/router-vite-plugin"].some(has)
  )
    return "tanstack-router";
  if (has("unplugin-vue-router") || has("vue-router")) return "vue";
  return undefined;
}
