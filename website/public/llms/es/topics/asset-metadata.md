# asset.has() / paths() / info()

Topic: `asset-metadata` · Named Routes v2.2.0

Consulta el manifiesto generado, no el servidor publicado. has acepta una ruta local con barra inicial, query o hash opcionales; paths devuelve nombres codificados; info devuelve path, extensión, tamaño en bytes y versión, o null. Sin descubrimiento de assets, el manifiesto está vacío.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.paths(); // ["images/logo.svg"]
asset.info("images/logo.svg"); // { path, extension, size, version }
asset.info("missing.svg"); // null
```

Related topic IDs: asset-has, asset-paths, asset-info, typed-assets
