# 型付きアセット

[ドキュメント](index.md) / [アセットと CDN](public-assets.md)

[English](../en/topic-typed-assets.md) · [Português](../pt/topic-typed-assets.md) · [Español](../es/topic-typed-assets.md) · [日本語](../ja/topic-typed-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typed-assets"></a>

named-routes.config の `assets` を有効にすると public/（SvelteKit は static/）を走査します。隠しファイルとシンボリックリンクを除外し、exclude の *, **, ? グロブをサポートします。エンコードされた相対パスと SHA-256 ハッシュのマニフェストを生成します。strict: true で生成された asset のリテラルパスを型検査し、route.asset() は実行時に検証します。外部 HTTP(S) URL は許可され、ファイルのアップロードはしません。assets.directory で公開ディレクトリを変更できます。build/check で更新し、CLI watch で再帰的に監視できます。

## 例

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```

---

← 前へ: [アセットの絶対 URL](topic-asset-absolute.md) · [全トピック](public-assets.md) · 次へ: [asset.has() / paths() / info()](topic-asset-metadata.md) →
