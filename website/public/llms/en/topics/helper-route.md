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
