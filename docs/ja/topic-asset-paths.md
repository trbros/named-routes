# asset.paths()

[ドキュメント](index.md) / [アセットと CDN](public-assets.md)

[English](../en/topic-asset-paths.md) · [Português](../pt/topic-asset-paths.md) · [Español](../es/topic-asset-paths.md) · [日本語](../ja/topic-asset-paths.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-paths"></a>

マニフェスト内のエンコード済み公開パスを列挙します。未設定なら空配列です。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

## 関連トピック

- [型付きアセット](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [アセットのバージョン管理](topic-asset-versioning.md)

---

← 前へ: [asset.has()](topic-asset-has.md) · [全トピック](public-assets.md) · 次へ: [asset.info()](topic-asset-info.md) →
