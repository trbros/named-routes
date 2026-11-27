# route.endpoint()

[Documentación](index.md) / [Endpoints HTTP](http-endpoints.md)

[English](../en/topic-helper-endpoint.md) · [Português](../pt/topic-helper-endpoint.md) · [Español](../es/topic-helper-endpoint.md) · [日本語](../ja/topic-helper-endpoint.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-endpoint"></a>

Vincula un método explícito a una ruta. Devuelve un descriptor de método y URL, sin realizar peticiones. Prefiere api generada si se conocen los métodos.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/api/users/42" }
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" }, { basePath: "/app" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/app/api/users/42" }
```

## Temas relacionados

- [api generada — descriptores HTTP](topic-endpoint-methods.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [api generada — descriptores HTTP](topic-endpoint-methods.md) · [Todos los temas](http-endpoints.md) · Siguiente: [Parámetros dinámicos de endpoints](topic-endpoint-dynamic.md) →
