# route.is()

Topic: `helper-is` · Named Routes v2.2.0

`route.is(name, url, options?)` verifica si una URL coincide con la ruta nombrada. Usa `exact: false` para incluir descendientes y `{ basePath: true }` para URLs con base. Sirve para navegación activa, no para controlar acceso. Rechaza nombres desconocidos.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

Related topic IDs: helper-match, helper-breadcrumbs
