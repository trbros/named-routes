# asset.has() / paths() / info()

Topic: `asset-metadata` · Named Routes v2.2.0

デプロイ先ではなく生成済みマニフェストを参照します。has は先頭スラッシュ、クエリ、ハッシュ付きローカルパスを扱い、paths はエンコード済みの名前を返します。info は path、拡張子、バイト数、version または null を返します。検出を無効にするとマニフェストは空です。

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
