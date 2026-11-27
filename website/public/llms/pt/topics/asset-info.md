# asset.info()

Topic: `asset-info` · Named Routes v2.2.0

Leia metadados (path, extensão, tamanho e versão) de um arquivo conhecido; caminho desconhecido retorna null.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
const logo = asset.info("images/logo.svg");
console.log(logo?.size); // 64
asset.info("missing.svg"); // null
```

Related topic IDs: typed-assets, assets, asset-versioning
