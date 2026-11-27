# route.asset()

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-helper-route-asset.md) · [Português](../pt/topic-helper-route-asset.md) · [Español](../es/topic-helper-route-asset.md) · [日本語](../ja/topic-helper-route-asset.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-route-asset"></a>

route.asset está disponible en todos los helpers. El módulo generado también exporta asset directamente; comparten configuración y manifiesto.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" });
route.asset("logo.svg"); // /logo.svg
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" }, { basePath: "/app" });
route.asset("logo.svg"); // /app/logo.svg
```

## Temas relacionados

- [asset() / route.asset()](topic-assets.md)
- [assetBase y CDN](topic-asset-base.md)

---

← Anterior: [asset() / route.asset()](topic-assets.md) · [Todos los temas](public-assets.md) · Siguiente: [assetBase y CDN](topic-asset-base.md) →
