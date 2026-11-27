# Base path y despliegue

[Documentación](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-deployment.md) · [Português](../pt/topic-sveltekit-deployment.md) · [Español](../es/topic-sveltekit-deployment.md) · [日本語](../ja/topic-sveltekit-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-deployment"></a>

Configura `paths.base` en SvelteKit. route() incluye la base.

Configura el mismo prefijo en namedRoutes({ routerBase: "/app" }). La base de Vite no es automáticamente la del router; inheritViteBase: true es una alternativa si coinciden.

En SvelteKit 2 usa kit.paths.base en svelte.config.js y comparte el valor; el ejemplo de configuración usa SvelteKit 3.

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

← Anterior: [Navegación — goto()](topic-sveltekit-programmatic.md) · [Todos los temas](framework-sveltekit.md) · Siguiente: [Archivos públicos](topic-sveltekit-assets.md) →
