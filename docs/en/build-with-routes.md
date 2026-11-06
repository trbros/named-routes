# Build with routes · @triooo/named-routes

[← Back to README](../../README.md) · [English](../en/build-with-routes.md) · [Português](../pt/build-with-routes.md) · [Español](../es/build-with-routes.md) · [日本語](../ja/build-with-routes.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [App Router recipes](#app-router)
- [Pages Router recipes](#pages-router)
- [Parameters and encoding](#parameters)
- [Query strings and fragments](#query-hash)
- [basePath, trailing slashes and origins](#base-path)
- [Locales and i18n](#i18n)
- [TypeScript and Next typedRoutes](#typescript)

<a id="app-router"></a>

## App Router recipes

The helper returns a normal URL string. Use it with next/link, redirect or the App Router useRouter hook from next/navigation. Run redirects from the appropriate server or event flow; named routes do not change Next.js redirect semantics.

Each name in these snippets assumes the corresponding page exists: posts/page.tsx, posts/[post]/page.tsx and posts/[post]/edit/page.tsx.

```tsx
// Server Component
import Link from "next/link";
import { route } from "@/routes.generated";
export default function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}

// A separate Client Component file:
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function EditPost({ post }: { post: number }) {
  const router = useRouter();
  return <button onClick={() => router.push(
    route("posts.$post.edit", { post })
  )}>Edit</button>;
}

// In a server-side redirect flow:
// import { redirect } from "next/navigation";
// redirect(route("posts"));
```

<a id="pages-router"></a>

## Pages Router recipes

Use the same generated helper. The router hook comes from next/router in Pages Router applications. Link does not need a custom adapter. The discovery process can scan both router directories during migration, but conflicting canonical URLs fail generation.

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "@/routes.generated";
export default function Page() {
  const router = useRouter();
  return <>
    <Link href={route("users.$user", { user: 42 })}>User</Link>
    <button onClick={() => router.replace(route("user.profile"))}>
      Profile
    </button>
  </>;
}
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

<a id="base-path"></a>

## basePath, trailing slashes and origins

Next Link and router navigation add basePath themselves. Relative helper URLs omit it by default to prevent duplicate prefixes. For plain anchors, fetch or other consumers, request basePath: true. absolute: true always includes basePath and requires defaults.origin.

withNamedRoutes inherits basePath and trailingSlash from Next configuration. An explicit defaults option overrides inherited values. Origin must be an HTTP(S) origin without credentials, a non-root path, query or hash; it is never guessed from a request or window.

All defaults are serialized into the public generated module. Never put secrets in them. trailingSlash formats generated paths; Next remains responsible for redirects and final normalization.

```ts
// next.config.ts
export default withNamedRoutes({ basePath: "/admin" }, {
  defaults: { origin: "https://triooo.com.br" },
});
route("users.$user", { user: 42 }); // /users/42 (Next Link/router)
route("users.$user", { user: 42 }, { basePath: true });
// /admin/users/42 (plain anchor/fetch)
route("users.$user", { user: 42 }, { absolute: true });
// https://triooo.com.br/admin/users/42
```

<a id="i18n"></a>

## Locales and i18n

Configure i18n with locales, defaultLocale and optionally localePrefix, pathnames and domains. The shape matches next-intl's defineRouting(), so you can pass that routing object directly; next-intl-only keys such as localeCookie are accepted and ignored. In Next.js Pages Router projects, withNamedRoutes inherits next.config i18n automatically (localePrefix as-needed, domains included).

A dynamic first folder named locale or lang (app/[locale]/…, pages/[lang]/…, change it with localeParam) is removed from names and patterns: app/[locale]/about/page.tsx becomes about → /about. Physical locale folders (src/pages/pt/about.astro) merge into the same route. Without a locale folder (Pages Router i18n, @nuxtjs/i18n, middleware rewrites), every page is localized. Endpoints and routes outside [locale] are listed as unlocalized and never get a prefix.

route(name, params) without a locale returns the internal path, which is what next-intl's Link, Pages Router Link and @nuxtjs/i18n's localePath expect. Pass { locale } for plain anchors, redirects, sitemaps, emails or language switchers. route.forLocale(locale) returns a helper bound to that locale, and route.locales() lists the configured locales.

localePrefix: always (default) prefixes every locale; as-needed omits the default locale; never omits all prefixes; { mode, prefixes: { "en-US": "/us" } } customizes them. pathnames maps an internal pattern to localized patterns with the same parameters. With absolute: true, a locale served by a configured domain uses that domain as the origin. Locales are typed: the generated module exports RouteLocale and unknown locales are type and runtime errors.

```ts
// next.config.ts — next-intl with app/[locale]/…
import { routing } from "./src/i18n/routing"; // defineRouting({...})
export default withNamedRoutes(withNextIntl({}), { i18n: routing });

// or named-routes.config.mjs (any framework)
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "as-needed",
    pathnames: { "/about": { pt: "/sobre" } },
  },
});

route("about");                     // /about (next-intl Link adds the locale)
route("about", {}, { locale: "pt" }); // /pt/sobre
route("about", {}, { locale: "en" }); // /about
const pt = route.forLocale("pt");
pt("users.$user", { user: 42 });      // /pt/users/42
```

<a id="typescript"></a>

## TypeScript and Next typedRoutes

Literal patterns infer name unions and parameter objects. Required parameters are checked at compile time; optional catch-all routes can be called without parameters. The runtime still validates JavaScript callers.

route() returns string, not Next’s generated Route type. When Next typedRoutes is enabled, its separate Link validation may require a Route assertion. The package still checks the route name and parameters. Do not assert untrusted arbitrary input to a route name to bypass validation.

```ts
import type { Route } from "next";
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes:
// <Link href={route(name) as Route}>Profile</Link>
```

---

← Previous: [Frameworks](frameworks.md) · [Back to README](../../README.md) · Next: [API reference](api-reference.md) →
