# asset.has()

Topic: `asset-has` · Named Routes v2.2.0

生成マニフェスト内のパスを確認します。デプロイ先への通信は行いません。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.has("missing.svg"); // false
```

Related topic IDs: typed-assets, assets, asset-versioning
