# asset.paths()

Topic: `asset-paths` · Named Routes v2.2.0

Liste caminhos públicos codificados do manifesto. Sem manifesto configurado retorna lista vazia.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

Related topic IDs: typed-assets, assets, asset-versioning
