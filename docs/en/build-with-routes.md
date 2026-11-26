# Build with routes · @triooo/named-routes

[← Back to README](../../README.md) · [English](../en/build-with-routes.md) · [Português](../pt/build-with-routes.md) · [Español](../es/build-with-routes.md) · [日本語](../ja/build-with-routes.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [App Router recipes](#app-router)
- [Pages Router recipes](#pages-router)
- [Parameters and encoding](#parameters)
- [Query strings and fragments](#query-hash)
- [Typed query parameters](#typed-query)
- [Reverse routing and active routes](#reverse-routing)
- [basePath, trailing slashes and origins](#base-path)
- [Locales and i18n](#i18n)
- [TypeScript and Next typedRoutes](#typescript)
- [Typed hrefs for Next.js typedRoutes](#typed-hrefs)

<a id="app-router"></a>

## App Router recipes

The helper returns a normal URL string. Use it with next/link, redirect or the App Router useRouter hook from next/navigation. Run redirects from the appropriate server or event flow; named routes do not change Next.js redirect semantics.

Each name in these snippets assumes the corresponding page exists: posts/page.tsx, posts/[post]/page.tsx and posts/[post]/edit/page.tsx.

**Base and localized URLs.** The wrapper inherits basePath. Keep Next Link and router navigation internal; add basePath: true for plain anchors. Use route.localize() with the already selected locale in your proxy or middleware when redirecting incoming translated aliases; see the i18n section.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

```tsx
// Server Component (next.config.ts has basePath: "/app")
import Link from "next/link";
import { asset, route } from "@/routes.generated";
export default function PostLink() {
  return <>
    <Link href={route("posts.$post", { post: 42 })}>Post</Link>
    <a href={route("posts.$post", { post: 42 }, { basePath: true })}>Public URL</a>
    <img src={asset("images/logo.svg")} alt="Logo" />
  </>;
}

// A separate Client Component file:
"use client";
import { useRouter } from "next/navigation";
import { asset, route } from "@/routes.generated";
export function EditPost({ post }: { post: number }) {
  const router = useRouter();
  // Next's router applies the base itself.
  return <button onClick={() => router.push(
    route("posts.$post.edit", { post })
  )}>Edit</button>;
}

// In a server-side redirect flow:
// import { redirect } from "next/navigation";
// redirect(route("posts"));
// File: public/images/logo.svg
```

<a id="pages-router"></a>

## Pages Router recipes

Use the same generated helper. The router hook comes from next/router in Pages Router applications. Link does not need a custom adapter. The discovery process can scan both router directories during migration, but conflicting canonical URLs fail generation.

**Base and i18n.** Next Link and next/router use the configured basePath and locale themselves. Keep route() internal for those consumers. Use basePath: true and, when applicable, locale for plain public URLs; route.localize() requires configured i18n and does not install redirects automatically.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

```tsx
// With basePath: "/app" in next.config.ts
import Link from "next/link";
import { useRouter } from "next/router";
import { asset, route } from "@/routes.generated";
export default function Page() {
  const router = useRouter();
  return <>
    {/* Next Link adds the base and the configured locale. */}
    <Link href={route("users.$user", { user: 42 })}>User</Link>
    <button onClick={() => router.replace(route("user.profile"))}>
      Profile
    </button>
    <img src={asset("images/logo.svg")} alt="Logo" />
    {/* Plain HTML URL needs the base explicitly. */}
    <a href={route("users.$user", { user: 42 }, { basePath: true })}>Public URL</a>
  </>;
}
// File: public/images/logo.svg
```

<a id="parameters"></a>

## Parameters and encoding

[id] requires a nonempty string or finite number. [[id]] (Nuxt, Vue, SvelteKit, React Router, TanStack) is an optional scalar; omitting it removes the segment. [...slug] requires a nonempty array of strings/numbers. [[...slug]] accepts an optional array; an omitted value, null or [] removes the catch-all portion. Mixed segments require every parameter they contain.

Each parameter segment is encoded individually. A slash inside a scalar is encoded, while a catch-all array produces separate path segments. Extra parameters, empty required values, NaN, Infinity, objects and standalone . or .. segments fail. These checks validate URL construction, not your application’s business identifiers.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" });       // /users/a%2Fb
// app/docs/[[...slug]]/page.tsx:
route("docs.$slug");                         // /docs
route("docs.$slug", { slug: ["guide", "install"] });
// /docs/guide/install
// pages/[[lang]]/about.vue and pages/v[major]-[minor].vue:
route("$lang.about");                        // /about
route("v$major-$minor", { major: 2, minor: 1 }); // /v2-1
```

<a id="query-hash"></a>

## Query strings and fragments

Pass query and hash in the third argument. Query values can be strings, finite numbers, booleans or readonly arrays of these values. null and undefined are omitted, including array entries. Arrays repeat the key; they do not use bracket notation.

The hash is a string without the leading # and is encoded by the helper. It stays in the browser and is not sent to the server. Hash strings and query objects are validated at runtime.

```ts
route("users.$user", { user: 42 }, {
  query: { page: 2, tag: ["next", "react"], draft: false, omit: null },
  hash: "activity",
});
// /users/42?page=2&tag=next&tag=react&draft=false#activity
```

<a id="typed-query"></a>

## Typed query parameters

Declare per-route query schemas in a module whose default export is defineQuery({...}) and point the query option to it. Keys are route names; values are Standard Schema validators (Zod 3.24+, Valibot 1+, ArkType and others) or defineQuery.type<T>() for TypeScript-only types. Routes without a schema keep the 1.0 query.

With a schema, TypeScript rejects unknown keys and incompatible values, and required keys make options.query required. No schema library becomes a dependency: TypeScript outputs import the module as types only, so nothing is bundled and nothing is validated at runtime.

Set validateQuery: true to bundle the schemas and validate every query object when a URL is built; failures throw INVALID_QUERY with the issues. Validation never changes the URL: values are serialized as you pass them, without the schema's defaults or transforms. Asynchronous schemas are rejected because route() is synchronous. JavaScript outputs import the module as a value to infer its types. Zod 4 and Valibot 1 require TypeScript 5.4+.

route.parseQuery(name, url) reads a URL's query back with the route's schema when it is available at runtime (validateQuery: true, or schemas passed to createRoutes) and returns { ok: true, value } with the schema's output type, or { ok: false, issues }. Values arrive as strings; for keys the schema rejects, the strings route() writes for numbers and true/false are converted back and a single value becomes an array, so one schema both builds and parses. Routes without a runtime schema (no schema, defineQuery.type() or schemas imported as types only) return the raw query, and their type says so.

```ts
// src/route-query.ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({
  products: z.object({
    page: z.number().int().min(1).optional(),
    sort: z.enum(["newest", "price"]).optional(),
  }),
  search: defineQuery.type<{ q: string }>(),
});

// named-routes.config.ts: defineConfig({ query: "src/route-query.ts" })
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required

// With validateQuery: true
const parsed = route.parseQuery("products", "/products?page=2&sort=newest");
if (parsed.ok) parsed.value.page; // 2 (number | undefined)
```

<a id="reverse-routing"></a>

## Reverse routing and active routes

route.match(url) returns the named route a path points to, with decoded params, the query (repeated keys become arrays), the hash and the locale, or null. It accepts a root-relative path such as /users/42?tab=posts#bio or a URL object; absolute URLs match only on the configured origin or an i18n domain. route.is(name, url) compares a URL with a route; { exact: false } also accepts descendants, for active navigation sections. route.breadcrumbs(url) returns the matches of every ancestor path.

Static segments win, then mixed, dynamic, optional, catch-all and optional catch-all segments, compared from left to right; equally specific patterns resolve by declaration order. Segments are split before they are decoded, so %2F stays inside a parameter; malformed percent-encoding, empty segments and relative or protocol-relative URLs return null. Pass { basePath: true } when the URL includes basePath (window.location.pathname). Locale prefixes, custom prefixes and localized pathnames are recognized.

Matching describes your route table only: it is not authorization, does not prove a resource exists or that a navigation will succeed, and does not replace the framework router. The query is returned as strings; parse it with your own schema, for example schema.parse(found.query) with coercion.

```ts
const found = route.match("/users/42?tab=posts");
// { name: "users.$user", params: { user: "42" }, query: { tab: "posts" }, hash: "", locale: undefined, ... }
if (found?.name === "users.$user") found.params.user; // string

route.is("users.$user", "/users/new"); // false when /users/new is its own page
route.is("users", pathname, { exact: false }); // active section
route.breadcrumbs("/users/42/edit").map((item) => item.name);
// ["home", "users", "users.$user", "users.$user.edit"]
```

<a id="base-path"></a>

## basePath, trailing slashes and origins

Next Link and router navigation add basePath themselves. Relative helper URLs omit it by default to prevent duplicate prefixes. For plain anchors, fetch or other consumers, request basePath: true. absolute: true always includes basePath and requires defaults.origin.

withNamedRoutes inherits basePath and trailingSlash from Next configuration. An explicit defaults option overrides inherited values. Origin must be an HTTP(S) origin without credentials, a non-root path, query or hash; it is never guessed from a request or window.

All defaults are serialized into the public generated module. Never put secrets in them. trailingSlash formats generated paths; Next remains responsible for redirects and final normalization.

**Framework base paths.** Next.js inherits basePath and Nuxt inherits app.baseURL. For Astro, register the native integration from @triooo/named-routes/astro in integrations; it reads the final Astro base, not the Vite asset path. For Vue Router, React Router/Remix, TanStack Router and SvelteKit, pass the same navigation prefix to the framework and namedRoutes({ routerBase: base }); do not infer it from CDN assets. Use inheritViteBase: true only when Vite's base is also the navigation base. Explicit defaults.basePath takes precedence.

**Standalone CLI.** After a successful framework generation, .named-routes/ stores the effective public prefix per framework. The CLI and doctor reuse it unless defaults.basePath or --base-path is supplied. Run the framework again after changing its config; the CLI does not execute framework configs itself. In a clean checkout or CI before the first framework run, put defaults.basePath in the shared named-routes config or pass --base-path. Use --base-path / to clear it. Ignore .named-routes/ in Git. The ordinary route() still omits the prefix; pass { basePath: true } for public URLs and plain anchors.

`defaults.assetBase` overrides only the asset URL prefix. Omit it to inherit the effective `basePath`; use `"/"` or `""` for domain-root assets, or an HTTP(S) CDN URL. Navigation, localization and reverse matching remain unchanged.

```ts
// next.config.ts
export default withNamedRoutes({ basePath: "/admin" }, {
  defaults: { origin: "https://triooo.com.br" },
});
route("users.$user", { user: 42 }); // /users/42 (Next Link/router)
route("users.$user", { user: 42 }, { basePath: true }); // /admin/users/42
route("users.$user", { user: 42 }, { absolute: true });
// https://triooo.com.br/admin/users/42

// In any framework: named-routes.config.mjs (alternative shared config)
export default defineConfig({ defaults: { basePath: "/admin" } });

// Public assets are separate from navigation; configure a CDN if needed.
route.asset("images/logo.svg"); // /admin/images/logo.svg
// defaults: { basePath: "/admin", assetBase: "https://cdn.example.com/public" }
// route.asset("images/logo.svg") → https://cdn.example.com/public/images/logo.svg
```

<a id="i18n"></a>

## Locales and i18n

Configure i18n with locales, defaultLocale and optionally localePrefix, pathnames and domains. The shape matches next-intl's defineRouting(), so you can pass that routing object directly; next-intl-only keys such as localeCookie are accepted and ignored. In Next.js Pages Router projects, withNamedRoutes inherits next.config i18n automatically (localePrefix as-needed, domains included).

A dynamic first folder named locale or lang (app/[locale]/…, pages/[lang]/…, change it with localeParam) is removed from names and patterns: app/[locale]/about/page.tsx becomes about → /about. Physical locale folders (src/pages/pt/about.astro) merge into the same route. Without a locale folder (Pages Router i18n, @nuxtjs/i18n, middleware rewrites), every page is localized. Endpoints and routes outside [locale] are listed as unlocalized and never get a prefix.

route(name, params) without a locale returns the internal path, which is what next-intl's Link, Pages Router Link and @nuxtjs/i18n's localePath expect. Pass { locale } for plain anchors, redirects, sitemaps, emails or language switchers. route.forLocale(locale) returns a helper bound to that locale, and route.locales() lists the configured locales.

localePrefix: always (default) prefixes every locale; as-needed omits the default locale; never omits all prefixes; { mode, prefixes: { "en-US": "/us" } } customizes them. pathnames maps an internal pattern to localized patterns with the same parameters. With absolute: true, a locale served by a configured domain uses that domain as the origin. Locales are typed: the generated module exports RouteLocale and unknown locales are type and runtime errors.

**Translate incoming URLs.** route.localize('/sobre', 'en') returns /en/about when /sobre is the Portuguese pathname of /about and localePrefix is always. route.localize('/pt/produtos/42?tab=info#details', 'en') can return /en/products/42?tab=info#details. The method searches all configured languages, preserves path parameters and the original query/fragment, and returns null for unknown, ambiguous or unlocalized routes. Existing route.match() behavior does not change. A recognized source prefix, or sourceLocale for unprefixed aliases, disambiguates equally specific patterns. With no target locale, forLocale() supplies the bound locale, otherwise the configured default is used.

**Redirecting requests.** The runtime does not intercept requests. Resolve the preferred locale with your existing i18n middleware, call route.localize(pathAndQuery, locale, { basePath: true }) for a browser URL containing the base, and issue a temporary redirect only when the returned path differs. Let the existing framework handle its internal rewrites. For a raw internal path use includeBasePath: true to include the prefix in the result without requiring it in the input. For domain-based locale routing use absolute: true with configured domains and compare the entire URL. Do not redirect API/assets, non-GET/HEAD requests or an unresolved path. A ready Next.js proxy recipe is in examples/app-router/recipes/localized-redirect.ts.example.

```ts
// next.config.ts — next-intl with app/[locale]/…
import { routing } from "./src/i18n/routing";
export default withNamedRoutes(withNextIntl({}), { i18n: routing });

// or named-routes.config.mjs (any framework)
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "always",
    pathnames: { "/about": { en: "/about", pt: "/sobre" } },
  },
});

// Results with the always-prefix configuration above:
route("about"); // /about (internal pathname)
route("about", {}, { locale: "pt" }); // /pt/sobre
route("about", {}, { locale: "en" }); // /en/about
route.localize("/sobre", "en"); // /en/about
route.localize("/en/about?tab=info#details", "pt"); // /pt/sobre?tab=info#details
route.forLocale("en").localize("/sobre"); // /en/about
const pt = route.forLocale("pt");
pt("users.$user", { user: 42 }); // /pt/users/42
```

<a id="typescript"></a>

## TypeScript and Next typedRoutes

Literal patterns infer name unions and parameter objects. Required parameters are checked at compile time; optional catch-all routes can be called without parameters. The runtime still validates JavaScript callers.

Since 2.0 route() returns typed hrefs (see Typed hrefs): template literal types that Next.js typedRoutes, <Link> and router.push() accept without asserting Route. hrefs: "string" returns string as in 1.x. The exported types need TypeScript 5.4+. Do not assert untrusted arbitrary input to a route name to bypass validation.

```ts
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes (typed hrefs are the default):
// <Link href={route(name)}>Profile</Link>   // no cast
```

<a id="typed-hrefs"></a>

## Typed hrefs for Next.js typedRoutes

route() returns template literal types instead of string (the default since 2.0): route("users.$user", { user: 42 }) is typed `/users/${string}`. Next.js typedRoutes accepts these values in <Link href>, router.push(), replace() and prefetch() in both routers without a cast, and other typed routers accept them as strings. The types are the only difference: the URLs are identical.

Calls with query or hash return the path plus `?${string}` or `#${string}`. absolute, basePath and locale calls return string, because Next adds basePath and locales itself and rejects absolute URLs in typed links. Optional segments become unions, so /shop/[[...path]] without parameters is typed "/shop"; Next.js typedRoutes itself rejects that bare base path of an optional catch-all, even as a literal, so pass a segment there.

A narrower return type can break code that stores a route in a variable later reassigned to another string, such as useState(route(...)) followed by setState(window.location.href): annotate the variable as string, or set hrefs: "string" to keep the 1.x type (named-routes migrate --to 2 does it). With hrefs: "string" and typedRoutes, withNamedRoutes() prints a warning and named-routes doctor reports one. Verified with the real next typegen and tsc on Next 16 (App Router and Pages Router, webpack and Turbopack).

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```

---

← Previous: [Frameworks](frameworks.md) · [Back to README](../../README.md) · Next: [Route helpers](route-helpers.md) →
