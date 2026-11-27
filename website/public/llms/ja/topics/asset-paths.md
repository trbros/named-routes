# asset.paths()

Topic: `asset-paths` · Named Routes v2.2.0

マニフェスト内のエンコード済み公開パスを列挙します。未設定なら空配列です。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

Related topic IDs: typed-assets, assets, asset-versioning
