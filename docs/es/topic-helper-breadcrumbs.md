# route.breadcrumbs()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-breadcrumbs.md) · [Português](../pt/topic-helper-breadcrumbs.md) · [Español](../es/topic-helper-breadcrumbs.md) · [日本語](../ja/topic-helper-breadcrumbs.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-breadcrumbs"></a>

`route.breadcrumbs(url, options?)` devuelve coincidencias conocidas de los caminos ancestros, de raíz a hoja. No inventa rutas ni etiquetas; asigna los nombres a textos traducidos en la aplicación. Usa `{ basePath: true }` si la URL incluye la base.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.breadcrumbs("/app/users/42", { basePath: true }).map((item) => item.name);
// ["home", "users", "users.show"]
```

## Temas relacionados

- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)

---

← Anterior: [route.is()](topic-helper-is.md) · [Todos los temas](route-helpers.md) · Siguiente: [route.has()](topic-helper-has.md) →
