# route.url() — public URLs

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-public-url.md) · [Português](../pt/topic-public-url.md) · [Español](../es/topic-public-url.md) · [日本語](../ja/topic-public-url.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="public-url"></a>

Signature: route.url(name, { params?, query?, hash?, locale?, absolute?, basePath? }). The options object is optional only when the path and query schema allow it. The configured base is included by default; pass basePath: false for an internal path. The function returns string, so use route() for a native typed Link.

Use route() for native router navigation in Next.js, Nuxt, Vue Router, React Router and TanStack Router. Generated Astro, SvelteKit and manual manifests include a configured base by default. Use route.url() for a public URL in every framework. Explicit defaults.includeBasePath and per-call basePath override the default; absolute URLs always include the configured base.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" });

route.url("entrar"); // /entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /users/42?tab=posts
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" }, { basePath: "/app" });

route.url("entrar"); // /app/entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /app/users/42?tab=posts
```

## Related topics

- [route()](topic-helper-route.md)
- [Base path — internal vs public URL](topic-base-path.md)
- [route.endpoint()](topic-helper-endpoint.md)

---

← Previous: [route()](topic-helper-route.md) · [All topics](build-with-routes.md) · Next: [Required parameters & encoding](topic-parameters.md) →
