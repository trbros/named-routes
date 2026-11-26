# Route helpers · @triooo/named-routes

[← Back to README](../../README.md) · [English](../en/route-helpers.md) · [Português](../pt/route-helpers.md) · [Español](../es/route-helpers.md) · [日本語](../ja/route-helpers.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [route()](#helper-route)
- [route.localize()](#helper-localize)
- [route.match()](#helper-match)
- [route.parseQuery()](#helper-parse-query)
- [route.is()](#helper-is)
- [route.breadcrumbs()](#helper-breadcrumbs)
- [route.has()](#helper-has)
- [route.names()](#helper-names)
- [route.pattern()](#helper-pattern)
- [route.locales()](#helper-locales)
- [route.forLocale()](#helper-for-locale)

<a id="helper-route"></a>

## route()

`route(name, params?, options?)` generates a named URL. Names and required path parameters are typed. By default the result omits the navigation base and locale; set the options explicitly for plain links, fetch and external URLs. An absolute URL requires a configured origin. Unknown names or invalid parameters throw NamedRouteError. The helper does not navigate.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", "users.show": "/users/[id]" }, {
  basePath: "/app", origin: "https://example.com",
});
urls("home"); // /
urls("users.show", { id: 42 }); // /users/42
urls("users.show", { id: 42 }, { basePath: true, query: { tab: "posts" }, hash: "bio" });
// /app/users/42?tab=posts#bio
urls("users.show", { id: 42 }, { absolute: true });
// https://example.com/app/users/42
```

<a id="helper-localize"></a>

## route.localize()

`route.localize(url, locale?, options?)` translates an existing URL through the route table, preserving its query and fragment. Use it in language switchers and redirects. It returns null if no unambiguous localized route exists. For a public URL containing basePath, pass `{ basePath: true }`; use `sourceLocale` to disambiguate unprefixed translated paths when needed. It does not translate dynamic slug values or determine the visitor’s language.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.localize("/sobre", "en"); // /en/about
urls.localize("/pt/artigos/42?tab=comments#top", "en");
// /en/posts/42?tab=comments#top
urls.localize("/missing", "en"); // null
```

<a id="helper-match"></a>

## route.match()

`route.match(url, options?)` recognizes a known path and returns a discriminated result with name, pattern, params, locale and raw query, or null. Use `{ basePath: true }` when the input includes the configured base. Parameters narrow by route name; use parseQuery for schema-based conversion. Matching is not authorization.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
const found = urls.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") {
  console.log(found.params.id); // "42"
  console.log(found.query.tab); // "posts"
}
urls.match("/unknown"); // null
```

<a id="helper-parse-query"></a>

## route.parseQuery()

`route.parseQuery(name, input)` reads query parameters from a URL or query string and returns a result with `ok`. A runtime Standard Schema converts and validates values; type-only schemas return raw values instead. In generated modules use `query` and `validateQuery: true` to include schemas at runtime. Zod below is an optional consumer dependency. Do not assume a failed result contains a valid value.

```ts
import { createRoutes } from "@triooo/named-routes";
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";
const urls = createRoutes({ products: "/products" }, {}, {
  query: defineQuery({ products: z.object({ page: z.number().int().min(1) }) }),
});
const parsed = urls.parseQuery("products", "?page=2");
if (parsed.ok) {
  console.log(parsed.value.page); // 2 (number)
}
urls.parseQuery("products", "?page=0").ok; // false
```

<a id="helper-is"></a>

## route.is()

`route.is(name, url, options?)` tests whether a URL matches the named route. Use `exact: false` to include matching descendants and `{ basePath: true }` for public URLs containing the base. This is useful for active navigation, not access control. Unknown route names are rejected.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ users: "/users", "users.show": "/users/[id]" });
urls.is("users", "/users/42"); // false
urls.is("users", "/users/42", { exact: false }); // true
urls.is("users.show", "/users/42"); // true
```

<a id="helper-breadcrumbs"></a>

## route.breadcrumbs()

`route.breadcrumbs(url, options?)` returns known matches for ancestor paths, ordered from root to leaf. It does not invent missing routes or human-readable labels; map names to translated labels in your application. Supply `{ basePath: true }` for URLs containing the base.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });
urls.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

<a id="helper-has"></a>

## route.has()

`route.has(name)` checks the manifest and narrows an arbitrary string to a valid route name. It does not check whether a server currently serves the route. Use it before accessing routes selected from external input.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

<a id="helper-names"></a>

## route.names()

`route.names()` returns the known names as a typed array. Use it for debugging or development tools; it does not expose authorization rules or guarantee that every route is reachable by a given user.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

<a id="helper-pattern"></a>

## route.pattern()

`route.pattern(name, locale?)` returns the route template, not a generated URL. Passing a locale returns its localized template when configured. It does not substitute parameters or add a locale or base prefix. Use route() to create a navigable URL.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.pattern("posts.show"); // /posts/[id]
urls.pattern("posts.show", "pt"); // /artigos/[id]
urls("posts.show", { id: 42 }, { locale: "pt" }); // /pt/artigos/42
```

<a id="helper-locales"></a>

## route.locales()

`route.locales()` lists configured locales, or an empty array when i18n is absent. This is configuration, not browser or request language detection. Use it to populate a language selector.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.locales(); // ["en", "pt"]
createRoutes({ home: "/" }).locales(); // []
```

<a id="helper-for-locale"></a>

## route.forLocale()

`route.forLocale(locale)` creates a helper bound to a configured locale. An explicit locale option on a later call can override it. The original helper is unchanged and assets never inherit the locale. Use this for a set of links in a known language.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
const pt = urls.forLocale("pt");
pt("about"); // /pt/sobre
pt("posts.show", { id: 42 }); // /pt/artigos/42
urls("about"); // /about
pt.asset("logo.svg"); // /logo.svg
```

---

← Previous: [Build with routes](build-with-routes.md) · [Back to README](../../README.md) · Next: [Public assets](public-assets.md) →
