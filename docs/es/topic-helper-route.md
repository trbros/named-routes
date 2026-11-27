# route()

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-helper-route.md) · [Português](../pt/topic-helper-route.md) · [Español](../es/topic-helper-route.md) · [日本語](../ja/topic-helper-route.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-route"></a>

route(nombre, params?, options?) devuelve una URL, sin navegar. Los parámetros son tipados y validados; query, hash y locale van en el tercer argumento. Para una URL pública usa route.url().

Usa route() para la navegación nativa de Next.js, Nuxt, Vue Router, React Router y TanStack Router. Astro, SvelteKit y la generación manual incluyen la base configurada por defecto. Usa route.url() para URL públicas. defaults.includeBasePath y basePath cambian el valor predeterminado; las URL absolutas incluyen la base.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

## Temas relacionados

- [route.url() — URL públicas](topic-public-url.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Cadenas de consulta](topic-query-hash.md)
- [Base path — URL interna y pública](topic-base-path.md)

---

[Todos los temas](build-with-routes.md) · Siguiente: [route.url() — URL públicas](topic-public-url.md) →
