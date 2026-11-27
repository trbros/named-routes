# 公開アセット

[ドキュメント](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-assets.md) · [Português](../pt/topic-react-router-assets.md) · [Español](../es/topic-react-router-assets.md) · [日本語](../ja/topic-react-router-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-assets"></a>

`public/images/logo.svg` にファイルを置き、生成モジュールから asset を import します。ベース /app の場合 /app/images/logo.svg が返ります。CDN は独立設定です。

<a id="without-base"></a>
## ベースパスなし

公開ファイルの URL: `/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## ベースパスあり

公開ファイルの URL: `/app/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## 関連トピック

- [asset() / route.asset()](topic-assets.md)
- [型付きアセット](topic-typed-assets.md)
- [assetBase と CDN](topic-asset-base.md)
- [アセットのバージョン管理](topic-asset-versioning.md)

---

← 前へ: [ベースパスとデプロイ](topic-react-router-deployment.md) · [全トピック](framework-react-router.md) · 次へ: [多言語リンク](topic-react-router-i18n.md) →
