# asset.info()

[ドキュメント](index.md) / [アセットと CDN](public-assets.md)

[English](../en/topic-asset-info.md) · [Português](../pt/topic-asset-info.md) · [Español](../es/topic-asset-info.md) · [日本語](../ja/topic-asset-info.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-info"></a>

既知のファイルのメタデータを返します。不明なパスには null を返します。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
const logo = asset.info("images/logo.svg");
console.log(logo?.size); // 64
asset.info("missing.svg"); // null
```

## 関連トピック

- [型付きアセット](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [アセットのバージョン管理](topic-asset-versioning.md)

---

← 前へ: [asset.paths()](topic-asset-paths.md) · [全トピック](public-assets.md) · 次へ: [アセットのバージョン管理](topic-asset-versioning.md) →
