# Base path y despliegue

[Documentación](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-deployment.md) · [Português](../pt/topic-nuxt-deployment.md) · [Español](../es/topic-nuxt-deployment.md) · [日本語](../ja/topic-nuxt-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-deployment"></a>

Configura `app.baseURL` en Nuxt. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

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

← Anterior: [Navegación — navigateTo()](topic-nuxt-programmatic.md) · [Todos los temas](framework-nuxt.md) · Siguiente: [Archivos públicos](topic-nuxt-assets.md) →
