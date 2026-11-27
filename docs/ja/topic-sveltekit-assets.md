# 公開アセット

[ドキュメント](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-assets.md) · [Português](../pt/topic-sveltekit-assets.md) · [Español](../es/topic-sveltekit-assets.md) · [日本語](../ja/topic-sveltekit-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-assets"></a>

`static/images/logo.svg` にファイルを置き、生成モジュールから asset を import します。ベース /app の場合 /app/images/logo.svg が返ります。CDN は独立設定です。

<a id="without-base"></a>
## ベースパスなし

公開ファイルの URL: `/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## ベースパスあり

公開ファイルの URL: `/app/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## 関連トピック

- [asset() / route.asset()](topic-assets.md)
- [型付きアセット](topic-typed-assets.md)
- [assetBase と CDN](topic-asset-base.md)
- [アセットのバージョン管理](topic-asset-versioning.md)

---

← 前へ: [ベースパスとデプロイ](topic-sveltekit-deployment.md) · [全トピック](framework-sveltekit.md) · 次へ: [多言語リンク](topic-sveltekit-i18n.md) →
