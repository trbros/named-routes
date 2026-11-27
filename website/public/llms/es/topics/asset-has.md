# asset.has()

Topic: `asset-has` · Named Routes v2.2.0

Comprueba la ruta en el manifiesto local; no verifica el despliegue.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.has("missing.svg"); // false
```

Related topic IDs: typed-assets, assets, asset-versioning
