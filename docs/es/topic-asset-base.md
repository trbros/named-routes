# assetBase y CDN

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-asset-base.md) · [Português](../pt/topic-asset-base.md) · [Español](../es/topic-asset-base.md) · [日本語](../ja/topic-asset-base.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-base"></a>

`defaults.assetBase` reemplaza el prefijo público independientemente de `basePath`. Usa una URL HTTP(S) de CDN, un prefijo relativo a la raíz o `/` para omitir la base de navegación. No despliega archivos ni configura un CDN. No incluyas secretos en defaults: se serializan en el módulo generado. En named-routes.config usa el mismo objeto defaults.

<a id="without-base"></a>
## Sin base path

URL del archivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

<a id="with-base"></a>
## Con base path

URL del archivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /app/about
const rootAssets = route.withDefaults({ assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```

---

← Anterior: [route.asset()](topic-helper-route-asset.md) · [Todos los temas](public-assets.md) · Siguiente: [URL absolutas de assets](topic-asset-absolute.md) →
