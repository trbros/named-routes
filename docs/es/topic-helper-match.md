# route.match()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-match.md) · [Português](../pt/topic-helper-match.md) · [Español](../es/topic-helper-match.md) · [日本語](../ja/topic-helper-match.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-match"></a>

`route.match(url, options?)` reconoce una ruta y devuelve un resultado discriminado con name, pattern, params, locale y query sin procesar, o null. Usa `{ basePath: true }` si la entrada incluye la base. Los parámetros se refinan por nombre; usa parseQuery para convertirlos mediante esquemas. No es autorización.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## Temas relacionados

- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Anterior: [Enrutamiento inverso y ruta activa](topic-reverse-routing.md) · [Todos los temas](route-helpers.md) · Siguiente: [route.is()](topic-helper-is.md) →
