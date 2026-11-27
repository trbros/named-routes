# Generated api — HTTP descriptors

Topic: `endpoint-methods` · Named Routes v2.2.0

Enable includeApi: true. The generated api export contains only statically declared method names. Next App Router, SvelteKit and Astro use explicit named exports; Nuxt uses method suffixes. Next Pages API, generic handlers, Vue client routes, React Router actions/loaders and TanStack client routes cannot reliably declare HTTP methods this way. Unknown methods are not guessed. api.admin.post() returns {method, url}; it does not perform a request. Nested route names are flat keys such as api["admin.alunos"].get().

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

Related topic IDs: config-api, helper-endpoint, endpoint-dynamic, nextjs-endpoints, nuxt-endpoints, sveltekit-endpoints, astro-endpoints
