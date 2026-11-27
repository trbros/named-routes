# asset.has()

[ドキュメント](index.md) / [アセットと CDN](public-assets.md)

[English](../en/topic-asset-has.md) · [Português](../pt/topic-asset-has.md) · [Español](../es/topic-asset-has.md) · [日本語](../ja/topic-asset-has.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-has"></a>

生成マニフェスト内のパスを確認します。デプロイ先への通信は行いません。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.has("missing.svg"); // false
```

## 関連トピック

- [型付きアセット](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [アセットのバージョン管理](topic-asset-versioning.md)

---

← 前へ: [asset.has() / paths() / info()](topic-asset-metadata.md) · [全トピック](public-assets.md) · 次へ: [asset.paths()](topic-asset-paths.md) →
