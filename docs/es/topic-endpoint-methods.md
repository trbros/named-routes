# api generada — descriptores HTTP

[Documentación](index.md) / [Endpoints HTTP](http-endpoints.md)

[English](../en/topic-endpoint-methods.md) · [Português](../pt/topic-endpoint-methods.md) · [Español](../es/topic-endpoint-methods.md) · [日本語](../ja/topic-endpoint-methods.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="endpoint-methods"></a>

Activa includeApi: true. Solo se incluyen métodos declarados estáticamente (exports de Next App Router, SvelteKit y Astro, o sufijos Nuxt). Los métodos desconocidos no se inventan. api.admin.post() devuelve {method, url}, sin realizar una petición. Usa claves planas para nombres anidados.

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## Temas relacionados

- [Activar descubrimiento de API](topic-config-api.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Parámetros dinámicos de endpoints](topic-endpoint-dynamic.md)
- [Endpoints HTTP](topic-nextjs-endpoints.md)
- [Endpoints HTTP](topic-nuxt-endpoints.md)
- [Endpoints HTTP](topic-sveltekit-endpoints.md)
- [Endpoints HTTP](topic-astro-endpoints.md)

---

[Todos los temas](http-endpoints.md) · Siguiente: [route.endpoint()](topic-helper-endpoint.md) →
