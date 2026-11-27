# route.is()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-is.md) · [Português](../pt/topic-helper-is.md) · [Español](../es/topic-helper-is.md) · [日本語](../ja/topic-helper-is.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-is"></a>

`route.is(name, url, options?)` verifica si una URL coincide con la ruta nombrada. Usa `exact: false` para incluir descendientes y `{ basePath: true }` para URLs con base. Sirve para navegación activa, no para controlar acceso. Rechaza nombres desconocidos.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

## Temas relacionados

- [route.match()](topic-helper-match.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)

---

← Anterior: [route.match()](topic-helper-match.md) · [Todos los temas](route-helpers.md) · Siguiente: [route.breadcrumbs()](topic-helper-breadcrumbs.md) →
