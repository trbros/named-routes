# route()

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-helper-route.md) · [Português](../pt/topic-helper-route.md) · [Español](../es/topic-helper-route.md) · [日本語](../ja/topic-helper-route.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-route"></a>

route(name, params?, options?) returns a URL string for a known route; it does not navigate. Required path parameters are typed and validated. Query, hash and locale belong in the third argument. For a public URL or a named options object use route.url().

Use route() for native router navigation in Next.js, Nuxt, Vue Router, React Router and TanStack Router. Generated Astro, SvelteKit and manual manifests include a configured base by default. Use route.url() for a public URL in every framework. Explicit defaults.includeBasePath and per-call basePath override the default; absolute URLs always include the configured base.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

## Related topics

- [route.url() — public URLs](topic-public-url.md)
- [Required parameters & encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [Base path — internal vs public URL](topic-base-path.md)

---

[All topics](build-with-routes.md) · Next: [route.url() — public URLs](topic-public-url.md) →
