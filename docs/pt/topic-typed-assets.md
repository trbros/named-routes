# Assets tipados

[Documentação](index.md) / [Assets e CDN](public-assets.md)

[English](../en/topic-typed-assets.md) · [Português](../pt/topic-typed-assets.md) · [Español](../es/topic-typed-assets.md) · [日本語](../ja/topic-typed-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typed-assets"></a>

Ative `assets` em named-routes.config. O gerador escaneia public/ (static/ no SvelteKit), ignora arquivos ocultos e links simbólicos, aceita globs *, ** e ? em exclude e grava um manifesto de caminhos relativos codificados com hashes SHA-256. strict: true tipa caminhos literais da exportação asset gerada; route.asset() valida o manifesto em runtime. URLs HTTP(S) remotas continuam permitidas. Nenhum arquivo é enviado. Use assets.directory para uma pasta pública personalizada. Build/check atualizam o manifesto; o watch da CLI acompanha a pasta recursivamente.

## Exemplo

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```

---

← Anterior: [URLs absolutas de assets](topic-asset-absolute.md) · [Todos os tópicos](public-assets.md) · Próximo: [asset.has() / paths() / info()](topic-asset-metadata.md) →
