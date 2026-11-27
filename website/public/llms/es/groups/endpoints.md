# Endpoints HTTP

# api generada — descriptores HTTP

Topic: `endpoint-methods` · Named Routes v2.2.0

Activa includeApi: true. Solo se incluyen métodos declarados estáticamente (exports de Next App Router, SvelteKit y Astro, o sufijos Nuxt). Los métodos desconocidos no se inventan. api.admin.post() devuelve {method, url}, sin realizar una petición. Usa claves planas para nombres anidados.

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

Related topic IDs: config-api, helper-endpoint, endpoint-dynamic, nextjs-endpoints, nuxt-endpoints, sveltekit-endpoints, astro-endpoints
---

# route.endpoint()

Topic: `helper-endpoint` · Named Routes v2.2.0

Vincula un método explícito a una ruta. Devuelve un descriptor de método y URL, sin realizar peticiones. Prefiere api generada si se conocen los métodos.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/api/users/42" }
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" }, { basePath: "/app" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/app/api/users/42" }
```

Related topic IDs: endpoint-methods, public-url
---

# Parámetros dinámicos de endpoints

Topic: `endpoint-dynamic` · Named Routes v2.2.0

Las claves de api son nombres planos sin el prefijo api. Para puntos usa corchetes. /api/admin/alunos/[aluno] produce admin.alunos.$aluno en api.

## Sin base path

URL en el navegador: `/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## Con base path

URL en el navegador: `/app/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

Related topic IDs: endpoint-methods, helper-endpoint, semantic-names
