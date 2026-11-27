# Generated api — HTTP descriptors

[Documentation](index.md) / [HTTP endpoints](http-endpoints.md)

[English](../en/topic-endpoint-methods.md) · [Português](../pt/topic-endpoint-methods.md) · [Español](../es/topic-endpoint-methods.md) · [日本語](../ja/topic-endpoint-methods.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="endpoint-methods"></a>

Enable includeApi: true. The generated api export contains only statically declared method names. Next App Router, SvelteKit and Astro use explicit named exports; Nuxt uses method suffixes. Next Pages API, generic handlers, Vue client routes, React Router actions/loaders and TanStack client routes cannot reliably declare HTTP methods this way. Unknown methods are not guessed. api.admin.post() returns {method, url}; it does not perform a request. Nested route names are flat keys such as api["admin.alunos"].get().

<a id="without-base"></a>
## Without base path

Browser URL: `/api/admin`.

```ts
// app/api/admin/route.ts exports GET and POST; includeApi: true
// In a separate consumer module:
import { api } from "@/routes.generated";

const { method, url } = api.admin.post();
await fetch(url, { method, body: JSON.stringify({ name: "Ana" }),
  headers: { "Content-Type": "application/json" } });
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/api/admin`.

```ts
// app/api/admin/route.ts exports GET and POST; includeApi: true
// In a separate consumer module:
import { api } from "@/routes.generated";

const { method, url } = api.admin.post();
await fetch(url, { method, body: JSON.stringify({ name: "Ana" }),
  headers: { "Content-Type": "application/json" } });
```

## Related topics

- [Enable API discovery](topic-config-api.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Dynamic endpoint parameters](topic-endpoint-dynamic.md)
- [HTTP endpoints](topic-nextjs-endpoints.md)
- [HTTP endpoints](topic-nuxt-endpoints.md)
- [HTTP endpoints](topic-sveltekit-endpoints.md)
- [HTTP endpoints](topic-astro-endpoints.md)

---

[All topics](http-endpoints.md) · Next: [route.endpoint()](topic-helper-endpoint.md) →
