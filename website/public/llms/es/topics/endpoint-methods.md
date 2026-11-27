# api generada — descriptores HTTP

Topic: `endpoint-methods` · Named Routes v2.2.0

Activa includeApi: true. Solo se incluyen métodos declarados estáticamente (exports de Next App Router, SvelteKit y Astro, o sufijos Nuxt). Los métodos desconocidos no se inventan. api.admin.post() devuelve {method, url}, sin realizar una petición. Usa claves planas para nombres anidados.

## Sin base path

URL en el navegador: `/api/admin`.

```ts
// app/api/admin/route.ts exports GET and POST; includeApi: true
// In a separate consumer module:
import { api } from "@/routes.generated";

const { method, url } = api.admin.post();
await fetch(url, { method, body: JSON.stringify({ name: "Ana" }),
  headers: { "Content-Type": "application/json" } });
```

## Con base path

URL en el navegador: `/app/api/admin`.

```ts
// app/api/admin/route.ts exports GET and POST; includeApi: true
// In a separate consumer module:
import { api } from "@/routes.generated";

const { method, url } = api.admin.post();
await fetch(url, { method, body: JSON.stringify({ name: "Ana" }),
  headers: { "Content-Type": "application/json" } });
```

Related topic IDs: config-api, helper-endpoint, endpoint-dynamic, nextjs-endpoints, nuxt-endpoints, sveltekit-endpoints, astro-endpoints
