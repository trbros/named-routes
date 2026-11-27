# Versionado de assets

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-asset-versioning.md) · [Português](../pt/topic-asset-versioning.md) · [Español](../es/topic-asset-versioning.md) · [日本語](../ja/topic-asset-versioning.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-versioning"></a>

Usa `{ version: true }` para añadir o reemplazar v con los primeros 12 dígitos hexadecimales del SHA-256 del contenido. Conserva query y fragmento. Activa el descubrimiento y regenera al cambiar el contenido. URLs remotas y entradas ausentes no se pueden versionar. Es cache busting, no garantía criptográfica ni purga de CDN.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /css/custom.css?theme=dark&v=a8f32c910123#top
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  basePath: "/app",
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /app/css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /app/css/custom.css?theme=dark&v=a8f32c910123#top
```

---

← Anterior: [asset.info()](topic-asset-info.md) · [Todos los temas](public-assets.md)
