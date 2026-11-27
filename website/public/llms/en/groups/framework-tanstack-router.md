# TanStack Router

# TanStack Router: setup

Topic: `tanstack-router` · Named Routes v2.2.0

Add namedRoutes() next to tanstackRouter() from @tanstack/router-plugin in vite.config. The plugin scans src/routes (or app/routes) and writes src/routes.generated.ts by default, outside the routes folder, so it never becomes a route.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react" }), namedRoutes(), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes. In the existing router setup use createRouter({ routeTree, basepath: "/app" }).

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [tanstackRouter({ target: "react" }), namedRoutes({ routerBase: "/app" }), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

Related topic IDs: tanstack-router-conventions, tanstack-router-navigation, installation, configuration
---

# File conventions & discovery

Topic: `tanstack-router-conventions` · Named Routes v2.2.0

Create `src/routes/users/$id.tsx` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** __root is skipped; index and route.tsx are the folder's route; flat (posts.$postId.tsx) and directory files mix; $param; {-$locale} is optional ([[locale]]); prefix{$id}suffix becomes a mixed segment; a lone $ is a splat named _splat ([[..._splat]]); _layout is pathless; posts_ opts out of nesting; -prefixed files and (group) folders are ignored; .lazy files belong to the same route.

**Verified.** Names come from the routeTree.gen.ts the TanStack Router plugin or CLI generates (its navigable paths); before it exists, the files are scanned. Convention tests plus examples/tanstack-router, which builds and runs with the TanStack router plugin.

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links & navigation

Topic: `tanstack-router-navigation` · Named Routes v2.2.0

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

**When to use it.** TanStack Router already types its own <Link to> by route id. Use route() where a plain string is needed: <a href>, redirects to other apps, emails, sitemaps, analytics, locale-prefixed URLs and names shared with other frameworks in a monorepo.

## Without base path

Browser URL: `/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## With base path

Browser URL: `/app/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, tanstack-router-programmatic
---

# Navigation — window.location.assign()

Topic: `tanstack-router-programmatic` · Named Routes v2.2.0

Use this only for full-document navigation in the browser. For SPA navigation, use TanStack Router’s own typed navigate/Link with its native route ID and params; a generated public URL is not a TanStack route ID.

## Without base path

Browser URL: `/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## With base path

Browser URL: `/app/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

Related topic IDs: tanstack-router-navigation, tanstack-router-deployment, public-url
---

# Base path & deployment

Topic: `tanstack-router-deployment` · Named Routes v2.2.0

Set `basepath` in TanStack Router. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

Configure the same navigation prefix in namedRoutes({ routerBase: "/app" }); Vite base is not automatically the router base. If you deliberately use the same Vite base, inheritViteBase: true is an alternative. The framework itself must also serve the subpath.

Use createRouter({ routeTree, basepath: "/app" }) in your existing router setup. Use native typed Link for its own route IDs.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Public assets

Topic: `tanstack-router-assets` · Named Routes v2.2.0

Place a file at `public/images/logo.svg`. Import asset from the same generated module as route. With /app as the effective base, asset("images/logo.svg") returns /app/images/logo.svg. CDN settings are independent of router navigation.

## Without base path

Public file URL: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## With base path

Public file URL: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Localized links

Topic: `tanstack-router-i18n` · Named Routes v2.2.0

Configure locales and matching pathname rules in named-routes.config. Your framework still owns locale selection and routing. Use route.url with locale for a complete public URL; when using a locale-aware native link, do not apply the same prefix twice.

## Without base path

Browser URL: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## With base path

Browser URL: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# HTTP boundaries

Topic: `tanstack-router-endpoints` · Named Routes v2.2.0

TanStack Router client routes do not establish HTTP method contracts. Named Routes does not infer verbs from client components, loaders, actions or server functions. Use your server API or generated OpenAPI client; for a known named URL use route.url().

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
