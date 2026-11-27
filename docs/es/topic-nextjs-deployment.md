# Base path y despliegue

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-deployment.md) · [Português](../pt/topic-nextjs-deployment.md) · [Español](../es/topic-nextjs-deployment.md) · [日本語](../ja/topic-nextjs-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-deployment"></a>

Configura `basePath` en Next.js. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

## Temas relacionados

- [Base path — URL interna y pública](topic-base-path.md)
- [route.url() — URL públicas](topic-public-url.md)
- [assetBase y CDN](topic-asset-base.md)

---

← Anterior: [Enlaces y navegación](topic-nextjs-navigation.md) · [Todos los temas](framework-nextjs.md) · Siguiente: [Archivos públicos](topic-nextjs-assets.md) →
