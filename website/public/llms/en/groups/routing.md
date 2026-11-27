# Build URLs & name routes

# route()

Topic: `helper-route` · Named Routes v2.2.0

route(name, params?, options?) returns a URL string for a known route; it does not navigate. Required path parameters are typed and validated. Query, hash and locale belong in the third argument. For a public URL or a named options object use route.url().

Use route() for native router navigation in Next.js, Nuxt, Vue Router, React Router and TanStack Router. Generated Astro, SvelteKit and manual manifests include a configured base by default. Use route.url() for a public URL in every framework. Explicit defaults.includeBasePath and per-call basePath override the default; absolute URLs always include the configured base.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

Related topic IDs: public-url, parameters, query-hash, base-path
---

# route.url() — public URLs

Topic: `public-url` · Named Routes v2.2.0

Signature: route.url(name, { params?, query?, hash?, locale?, absolute?, basePath? }). The options object is optional only when the path and query schema allow it. The configured base is included by default; pass basePath: false for an internal path. The function returns string, so use route() for a native typed Link.

Use route() for native router navigation in Next.js, Nuxt, Vue Router, React Router and TanStack Router. Generated Astro, SvelteKit and manual manifests include a configured base by default. Use route.url() for a public URL in every framework. Explicit defaults.includeBasePath and per-call basePath override the default; absolute URLs always include the configured base.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" });

route.url("entrar"); // /entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /users/42?tab=posts
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" }, { basePath: "/app" });

route.url("entrar"); // /app/entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /app/users/42?tab=posts
```

Related topic IDs: helper-route, base-path, helper-endpoint
---

# Required parameters & encoding

Topic: `parameters` · Named Routes v2.2.0

A [user] parameter accepts a nonempty string or finite number. Values are encoded as one URL segment: a slash inside a value is not a path separator. Missing, extra or invalid parameters are rejected. The helper validates URL construction, not resource existence.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

Related topic IDs: optional-parameters, catch-all-parameters, mixed-parameters, helper-route
---

# Optional route parameters

Topic: `optional-parameters` · Named Routes v2.2.0

Use [[id]] for an optional scalar. Omit the value to omit its segment. In a generated application, use the framework’s equivalent convention; support differs by router.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

Related topic IDs: parameters, catch-all-parameters, naming
---

# Catch-all parameters

Topic: `catch-all-parameters` · Named Routes v2.2.0

A required [...slug] takes a nonempty array; optional [[...slug]] accepts omitted or empty values. Each element is encoded as a distinct segment. Do not pass a slash-separated string as a catch-all.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

Related topic IDs: optional-parameters, parameters
---

# Mixed route segments

Topic: `mixed-parameters` · Named Routes v2.2.0

A mixed segment combines literal text and required parameters. Every dynamic parameter still has its own typed key.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

Related topic IDs: parameters, naming
---

# Query strings

Topic: `query-hash` · Named Routes v2.2.0

Pass query in options to append key/value pairs. Numbers and booleans are serialized; arrays repeat the key; null and undefined are omitted. Query fields are distinct from path params. Typed schemas are optional.

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

Related topic IDs: typed-query, helper-with-query, helper-parse-query, hash-fragments
---

# URL fragments (hash)

Topic: `hash-fragments` · Named Routes v2.2.0

Use hash to point to a section on a page. The helper removes an optional leading # and encodes the fragment. The browser does not send it to the server.

```ts
route.url("about", { hash: "team" }); // /about#team
```

Related topic IDs: query-hash, public-url
---

# Base path — internal vs public URL

Topic: `base-path` · Named Routes v2.2.0

Use route() for native router navigation in Next.js, Nuxt, Vue Router, React Router and TanStack Router. Generated Astro, SvelteKit and manual manifests include a configured base by default. Use route.url() for a public URL in every framework. Explicit defaults.includeBasePath and per-call basePath override the default; absolute URLs always include the configured base.

Use the framework-specific deployment guide to configure its router base. The CLI reuses the last successful framework base in .named-routes/ or accepts --base-path /app; --base-path / clears it. Do not treat an asset CDN as the navigation base.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" });

route("about"); // /about
route.url("about"); // /about
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app" });

route("about"); // /about
route.url("about"); // /app/about
route.withDefaults({ includeBasePath: true })("about"); // /app/about
```

Related topic IDs: public-url, absolute-urls, trailing-slash, asset-base, cli-generate
---

# Absolute URLs & origin

Topic: `absolute-urls` · Named Routes v2.2.0

Set defaults.origin to a trusted HTTP(S) origin without credentials, path, query or hash. absolute: true includes the base. The runtime never guesses the origin from window or request headers; public config must not contain secrets.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

Related topic IDs: base-path, helper-canonical, helper-with-defaults
---

# Trailing slashes

Topic: `trailing-slash` · Named Routes v2.2.0

trailingSlash changes generated path formatting, not server redirects. Configure the same policy in your framework. Next.js inherits this option from next.config.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

Related topic IDs: base-path, config-defaults
---

# Semantic route names and groups

Topic: `semantic-names` · Named Routes v2.2.0

Set naming.style to semantic to use index for parent pages and show for terminal required scalar parameters. Existing names remain the default. Static segment names are not translated or singularized. Set names to give individual URLs a stable semantic name (including create); update that map when the URL moves. Collisions fail generation rather than silently changing behavior.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: stable-names, naming, config-naming, generated-source
---

# Optional stable names

Topic: `stable-names` · Named Routes v2.2.0

Automatic names follow URL structure. If a refactor moves a public URL and you need a stable semantic name, update the optional names map. Every aliased path must exist. Unlisted routes keep automatic names. Duplicate names and typos fail generation instead of silently creating broken links.

A custom name replaces the automatic name for that path; it does not add a second alias automatically. This is useful for Laravel-style names such as posts.show, but it is not required for normal use.

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

Related topic IDs: semantic-names, config-naming, naming
---

# TypeScript and Next typedRoutes

Topic: `typescript` · Named Routes v2.2.0

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
