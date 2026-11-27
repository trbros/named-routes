# route.match()

Topic: `helper-match` · Named Routes v2.2.0

`route.match(url, options?)` reconoce una ruta y devuelve un resultado discriminado con name, pattern, params, locale y query sin procesar, o null. Usa `{ basePath: true }` si la entrada incluye la base. Los parámetros se refinan por nombre; usa parseQuery para convertirlos mediante esquemas. No es autorización.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

Related topic IDs: helper-is, helper-breadcrumbs, helper-parse-query
