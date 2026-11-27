# HTTP endpoints

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
---

# route.endpoint()

Topic: `helper-endpoint` · Named Routes v2.2.0

Bind an explicit HTTP method to a known route. Calling the returned function produces a readonly descriptor with method and URL; it does not validate server capabilities or execute a request. Prefer generated api descriptors when discovery knows the methods.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/api/users/42" }
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" }, { basePath: "/app" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/app/api/users/42" }
```

Related topic IDs: endpoint-methods, public-url
---

# Dynamic endpoint parameters

Topic: `endpoint-dynamic` · Named Routes v2.2.0

Generated api keys are flat names without a leading api. A key with dots or special characters uses brackets. In path naming mode /api/admin/alunos/[aluno] becomes api.admin.alunos.$aluno in the route manifest and admin.alunos.$aluno in the api export.

## Without base path

Browser URL: `/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## With base path

Browser URL: `/app/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

Related topic IDs: endpoint-methods, helper-endpoint, semantic-names
