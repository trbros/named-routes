# Route reference & inspection

# Reverse routing and active routes

Topic: `reverse-routing` · Named Routes v2.2.0

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

Related topic IDs: helper-match, helper-is, helper-breadcrumbs
---

# route.match()

Topic: `helper-match` · Named Routes v2.2.0

`route.match(url, options?)` recognizes a known path and returns a discriminated result with name, pattern, params, locale and raw query, or null. Use `{ basePath: true }` when the input includes the configured base. Parameters narrow by route name; use parseQuery for schema-based conversion. Matching is not authorization.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

Related topic IDs: helper-is, helper-breadcrumbs, helper-parse-query
---

# route.is()

Topic: `helper-is` · Named Routes v2.2.0

`route.is(name, url, options?)` tests whether a URL matches the named route. Use `exact: false` to include matching descendants and `{ basePath: true }` for public URLs containing the base. This is useful for active navigation, not access control. Unknown route names are rejected.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

Related topic IDs: helper-match, helper-breadcrumbs
---

# route.breadcrumbs()

Topic: `helper-breadcrumbs` · Named Routes v2.2.0

`route.breadcrumbs(url, options?)` returns known matches for ancestor paths, ordered from root to leaf. It does not invent missing routes or human-readable labels; map names to translated labels in your application. Supply `{ basePath: true }` for URLs containing the base.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.breadcrumbs("/app/users/42", { basePath: true }).map((item) => item.name);
// ["home", "users", "users.show"]
```

Related topic IDs: helper-match, helper-is
---

# route.has()

Topic: `helper-has` · Named Routes v2.2.0

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

Related topic IDs: helper-names, helper-pattern
---

# route.names()

Topic: `helper-names` · Named Routes v2.2.0

`route.names()` returns the known names as a typed array. Use it for debugging or development tools; it does not expose authorization rules or guarantee that every route is reachable by a given user.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

Related topic IDs: helper-has, helper-pattern
---

# route.pattern()

Topic: `helper-pattern` · Named Routes v2.2.0

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

Related topic IDs: helper-parse-pattern, helper-format-pattern
---

# createRoutes()

Topic: `helper-create-routes` · Named Routes v2.2.0

Create an independent, frozen helper from a name-to-pattern manifest. Keep literal types for autocomplete. Defaults apply to the returned helper; no filesystem or framework imports are required in the browser.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

Related topic IDs: manual-routes, helper-route, helper-with-defaults
---

# route.withDefaults()

Topic: `helper-with-defaults` · Named Routes v2.2.0

Create an isolated helper with origin, basePath, assetBase or trailingSlash overrides. Routes, locale rules, bound locale, manifest and query schemas remain available. The original helper is unchanged; use a trusted tenant configuration on the server, not arbitrary Host headers. The returned helper conservatively types generated hrefs as string.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

Related topic IDs: base-path, absolute-urls, helper-create-routes
---

# parsePattern()

Topic: `helper-parse-pattern` · Named Routes v2.2.0

Parse and validate a canonical pattern into segment records. Use it in tooling, not instead of route() for navigation.

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
---

# formatPattern()

Topic: `helper-format-pattern` · Named Routes v2.2.0

Serialize segment records back into the canonical bracket syntax. This is a pattern, not a concrete URL.

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
---

# patternParameters()

Topic: `helper-pattern-parameters` · Named Routes v2.2.0

List parameter names from parsed segments. This is useful when inspecting a manifest or generating tooling.

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
