# Assets tipados

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-typed-assets.md) · [Português](../pt/topic-typed-assets.md) · [Español](../es/topic-typed-assets.md) · [日本語](../ja/topic-typed-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typed-assets"></a>

Activa `assets` en named-routes.config. El generador escanea public/ (static/ en SvelteKit), ignora archivos ocultos y enlaces simbólicos, admite globs *, ** y ? en exclude y escribe un manifiesto de rutas relativas codificadas con hashes SHA-256. strict: true comprueba los literales del export asset generado; route.asset() valida en runtime. Se permiten URLs HTTP(S) remotas. No se suben archivos. Usa assets.directory para una carpeta pública personalizada. Build/check actualizan el manifiesto; watch de la CLI vigila la carpeta recursivamente.

## Ejemplo

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```

---

← Anterior: [URL absolutas de assets](topic-asset-absolute.md) · [Todos los temas](public-assets.md) · Siguiente: [asset.has() / paths() / info()](topic-asset-metadata.md) →
