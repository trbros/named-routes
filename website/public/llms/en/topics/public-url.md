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
