# Archivos públicos

[Documentación](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-assets.md) · [Português](../pt/topic-nuxt-assets.md) · [Español](../es/topic-nuxt-assets.md) · [日本語](../ja/topic-nuxt-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-assets"></a>

Coloca un archivo en `public/images/logo.svg`. Importa asset del módulo generado. Con base /app devuelve /app/images/logo.svg. El CDN es independiente del router.

<a id="without-base"></a>
## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## Temas relacionados

- [asset() / route.asset()](topic-assets.md)
- [Assets tipados](topic-typed-assets.md)
- [assetBase y CDN](topic-asset-base.md)
- [Versionado de assets](topic-asset-versioning.md)

---

← Anterior: [Base path y despliegue](topic-nuxt-deployment.md) · [Todos los temas](framework-nuxt.md) · Siguiente: [Enlaces localizados](topic-nuxt-i18n.md) →
