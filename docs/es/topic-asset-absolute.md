# URL absolutas de assets

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-asset-absolute.md) · [Português](../pt/topic-asset-absolute.md) · [Español](../es/topic-asset-absolute.md) · [日本語](../ja/topic-asset-absolute.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-absolute"></a>

Pasa absolute: true para combinar el origen con la ruta. Un assetBase de CDN ya es absoluto. El idioma no afecta assets.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/images/logo.svg
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/app/images/logo.svg
```

## Temas relacionados

- [asset() / route.asset()](topic-assets.md)
- [assetBase y CDN](topic-asset-base.md)
- [URL absolutas y origin](topic-absolute-urls.md)

---

← Anterior: [assetBase y CDN](topic-asset-base.md) · [Todos los temas](public-assets.md) · Siguiente: [Assets tipados](topic-typed-assets.md) →
