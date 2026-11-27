# asset.paths()

Topic: `asset-paths` · Named Routes v2.2.0

Enumera rutas públicas codificadas del manifiesto. Sin manifiesto devuelve una lista vacía.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

Related topic IDs: typed-assets, assets, asset-versioning
