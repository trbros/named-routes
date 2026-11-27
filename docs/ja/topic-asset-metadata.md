# asset.has() / paths() / info()

[ドキュメント](index.md) / [アセットと CDN](public-assets.md)

[English](../en/topic-asset-metadata.md) · [Português](../pt/topic-asset-metadata.md) · [Español](../es/topic-asset-metadata.md) · [日本語](../ja/topic-asset-metadata.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-metadata"></a>

デプロイ先ではなく生成済みマニフェストを参照します。has は先頭スラッシュ、クエリ、ハッシュ付きローカルパスを扱い、paths はエンコード済みの名前を返します。info は path、拡張子、バイト数、version または null を返します。検出を無効にするとマニフェストは空です。

## 例

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

## 関連トピック

- [asset.has()](topic-asset-has.md)
- [asset.paths()](topic-asset-paths.md)
- [asset.info()](topic-asset-info.md)
- [型付きアセット](topic-typed-assets.md)

---

← 前へ: [型付きアセット](topic-typed-assets.md) · [全トピック](public-assets.md) · 次へ: [asset.has()](topic-asset-has.md) →
