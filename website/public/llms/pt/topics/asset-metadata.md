# asset.has() / paths() / info()

Topic: `asset-metadata` · Named Routes v2.2.0

Consulte o manifesto gerado, não o servidor publicado. has aceita caminho local com barra inicial, query ou hash opcionais; paths retorna nomes codificados; info retorna path, extensão, tamanho em bytes e versão, ou null. Sem descoberta de assets, o manifesto é vazio.

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
