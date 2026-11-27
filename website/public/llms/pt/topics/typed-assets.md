# Assets tipados

Topic: `typed-assets` · Named Routes v2.2.0

Ative `assets` em named-routes.config. O gerador escaneia public/ (static/ no SvelteKit), ignora arquivos ocultos e links simbólicos, aceita globs *, ** e ? em exclude e grava um manifesto de caminhos relativos codificados com hashes SHA-256. strict: true tipa caminhos literais da exportação asset gerada; route.asset() valida o manifesto em runtime. URLs HTTP(S) remotas continuam permitidas. Nenhum arquivo é enviado. Use assets.directory para uma pasta pública personalizada. Build/check atualizam o manifesto; o watch da CLI acompanha a pasta recursivamente.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```
