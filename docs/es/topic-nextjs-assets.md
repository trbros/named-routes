# Archivos públicos

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-assets.md) · [Português](../pt/topic-nextjs-assets.md) · [Español](../es/topic-nextjs-assets.md) · [日本語](../ja/topic-nextjs-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-assets"></a>

Coloca un archivo en `public/images/logo.svg`. Importa asset del módulo generado. Con base /app devuelve /app/images/logo.svg. El CDN es independiente del router.

<a id="without-base"></a>
## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## Temas relacionados

- [asset() / route.asset()](topic-assets.md)
- [Assets tipados](topic-typed-assets.md)
- [assetBase y CDN](topic-asset-base.md)
- [Versionado de assets](topic-asset-versioning.md)

---

← Anterior: [Base path y despliegue](topic-nextjs-deployment.md) · [Todos los temas](framework-nextjs.md) · Siguiente: [Enlaces localizados](topic-nextjs-i18n.md) →
