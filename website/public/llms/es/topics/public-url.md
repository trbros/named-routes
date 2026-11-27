# route.url() — URL públicas

Topic: `public-url` · Named Routes v2.2.0

Firma: route.url(nombre, { params?, query?, hash?, locale?, absolute?, basePath? }). Las opciones son opcionales si la ruta y consulta lo permiten. Incluye la base; basePath: false devuelve la ruta interna. Devuelve string.

Usa route() para la navegación nativa de Next.js, Nuxt, Vue Router, React Router y TanStack Router. Astro, SvelteKit y la generación manual incluyen la base configurada por defecto. Usa route.url() para URL públicas. defaults.includeBasePath y basePath cambian el valor predeterminado; las URL absolutas incluyen la base.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" });

route.url("entrar"); // /entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /users/42?tab=posts
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" }, { basePath: "/app" });

route.url("entrar"); // /app/entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /app/users/42?tab=posts
```

Related topic IDs: helper-route, base-path, helper-endpoint
