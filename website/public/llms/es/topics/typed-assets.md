# Assets tipados

Topic: `typed-assets` · Named Routes v2.2.0

Activa `assets` en named-routes.config. El generador escanea public/ (static/ en SvelteKit), ignora archivos ocultos y enlaces simbólicos, admite globs *, ** y ? en exclude y escribe un manifiesto de rutas relativas codificadas con hashes SHA-256. strict: true comprueba los literales del export asset generado; route.asset() valida en runtime. Se permiten URLs HTTP(S) remotas. No se suben archivos. Usa assets.directory para una carpeta pública personalizada. Build/check actualizan el manifiesto; watch de la CLI vigila la carpeta recursivamente.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```
