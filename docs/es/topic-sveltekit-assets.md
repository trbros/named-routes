# Archivos públicos

[Documentación](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-assets.md) · [Português](../pt/topic-sveltekit-assets.md) · [Español](../es/topic-sveltekit-assets.md) · [日本語](../ja/topic-sveltekit-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-assets"></a>

Coloca un archivo en `static/images/logo.svg`. Importa asset del módulo generado. Con base /app devuelve /app/images/logo.svg. El CDN es independiente del router.

<a id="without-base"></a>
## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## Temas relacionados

- [asset() / route.asset()](topic-assets.md)
- [Assets tipados](topic-typed-assets.md)
- [assetBase y CDN](topic-asset-base.md)
- [Versionado de assets](topic-asset-versioning.md)

---

← Anterior: [Base path y despliegue](topic-sveltekit-deployment.md) · [Todos los temas](framework-sveltekit.md) · Siguiente: [Enlaces localizados](topic-sveltekit-i18n.md) →
