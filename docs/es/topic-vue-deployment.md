# Base path y despliegue

[Documentación](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-deployment.md) · [Português](../pt/topic-vue-deployment.md) · [Español](../es/topic-vue-deployment.md) · [日本語](../ja/topic-vue-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-deployment"></a>

Configura `history base` en Vue Router. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

Configura el mismo prefijo en namedRoutes({ routerBase: "/app" }). La base de Vite no es automáticamente la del router; inheritViteBase: true es una alternativa si coinciden.

En src/main.ts configura createWebHistory(import.meta.env.BASE_URL).

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

## Temas relacionados

- [Base path — URL interna y pública](topic-base-path.md)
- [route.url() — URL públicas](topic-public-url.md)
- [assetBase y CDN](topic-asset-base.md)

---

← Anterior: [Navegación — router.push()](topic-vue-programmatic.md) · [Todos los temas](framework-vue.md) · Siguiente: [Archivos públicos](topic-vue-assets.md) →
