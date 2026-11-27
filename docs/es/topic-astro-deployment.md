# Base path y despliegue

[Documentación](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-deployment.md) · [Português](../pt/topic-astro-deployment.md) · [Español](../es/topic-astro-deployment.md) · [日本語](../ja/topic-astro-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-deployment"></a>

Configura `base` en Astro. route() incluye la base.

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
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

## Temas relacionados

- [Base path — URL interna y pública](topic-base-path.md)
- [route.url() — URL públicas](topic-public-url.md)
- [assetBase y CDN](topic-asset-base.md)

---

← Anterior: [Navegación — Astro.redirect()](topic-astro-programmatic.md) · [Todos los temas](framework-astro.md) · Siguiente: [Archivos públicos](topic-astro-assets.md) →
