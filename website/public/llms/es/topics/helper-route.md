# route()

Topic: `helper-route` · Named Routes v2.2.0

route(nombre, params?, options?) devuelve una URL, sin navegar. Los parámetros son tipados y validados; query, hash y locale van en el tercer argumento. Para una URL pública usa route.url().

Usa route() para la navegación nativa de Next.js, Nuxt, Vue Router, React Router y TanStack Router. Astro, SvelteKit y la generación manual incluyen la base configurada por defecto. Usa route.url() para URL públicas. defaults.includeBasePath y basePath cambian el valor predeterminado; las URL absolutas incluyen la base.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

Related topic IDs: public-url, parameters, query-hash, base-path
