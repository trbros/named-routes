# route.url() — URL públicas

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-public-url.md) · [Português](../pt/topic-public-url.md) · [Español](../es/topic-public-url.md) · [日本語](../ja/topic-public-url.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="public-url"></a>

Firma: route.url(nombre, { params?, query?, hash?, locale?, absolute?, basePath? }). Las opciones son opcionales si la ruta y consulta lo permiten. Incluye la base; basePath: false devuelve la ruta interna. Devuelve string.

Usa route() para la navegación nativa de Next.js, Nuxt, Vue Router, React Router y TanStack Router. Astro, SvelteKit y la generación manual incluyen la base configurada por defecto. Usa route.url() para URL públicas. defaults.includeBasePath y basePath cambian el valor predeterminado; las URL absolutas incluyen la base.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" });

route.url("entrar"); // /entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /users/42?tab=posts
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" }, { basePath: "/app" });

route.url("entrar"); // /app/entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /app/users/42?tab=posts
```

## Temas relacionados

- [route()](topic-helper-route.md)
- [Base path — URL interna y pública](topic-base-path.md)
- [route.endpoint()](topic-helper-endpoint.md)

---

← Anterior: [route()](topic-helper-route.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Parámetros obligatorios y codificación](topic-parameters.md) →
