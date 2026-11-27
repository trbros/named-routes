# Rutas manuales (React, Vue, cualquier router)

[Documentación](index.md) / [Rutas manuales](framework-manual.md)

[English](../en/topic-manual-routes.md) · [Português](../pt/topic-manual-routes.md) · [Español](../es/topic-manual-routes.md) · [日本語](../ja/topic-manual-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="manual-routes"></a>

Cuando las rutas se declaran en código (<Route> de React Router, un array de rutas de vue-router, servidores tipo Express), escribe tú mismo el manifiesto con createRoutes. Obtienes la misma inferencia de nombres, comprobación de parámetros, codificación, query/hash, basePath e i18n; solo el descubrimiento es manual.

Los patrones usan la sintaxis de corchetes sin importar la sintaxis del router: /users/:id se convierte en /users/[id], un :id? opcional en [[id]] y un splat * en [...splat] o [[...splat]]. Mantén el objeto literal (o as const) para que se infieran los nombres y los parámetros.

Con createRoutes() directo, includeBasePath es false por defecto. Los manifiestos manuales generados incluyen la base; configura defaults.includeBasePath: false si el router la añade.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /users/42
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /app/users/42
```

## Temas relacionados

- [createRoutes()](topic-helper-create-routes.md)
- [route.url() — URL públicas](topic-public-url.md)
- [Descubrimiento y directorios](topic-config-discovery.md)
- [Añadir rutas explícitas](topic-config-extra-routes.md)
- [asset() / route.asset()](topic-assets.md)

---

[Todos los temas](framework-manual.md)
