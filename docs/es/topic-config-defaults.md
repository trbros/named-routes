# Valores predeterminados de URL

[Documentación](index.md) / [Configuración y referencia del runtime](api-reference.md)

[English](../en/topic-config-defaults.md) · [Português](../pt/topic-config-defaults.md) · [Español](../es/topic-config-defaults.md) · [日本語](../ja/topic-config-defaults.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-defaults"></a>

defaults incluye basePath, includeBasePath, origin, trailingSlash y assetBase. Son valores públicos. Los explícitos prevalecen sobre los heredados.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

## Temas relacionados

- [Base path — URL interna y pública](topic-base-path.md)
- [assetBase y CDN](topic-asset-base.md)
- [URL absolutas y origin](topic-absolute-urls.md)

---

← Anterior: [Convenciones de nombres](topic-config-naming.md) · [Todos los temas](api-reference.md) · Siguiente: [Añadir rutas explícitas](topic-config-extra-routes.md) →
