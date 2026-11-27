# 末尾スラッシュ

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-trailing-slash.md) · [Português](../pt/topic-trailing-slash.md) · [Español](../es/topic-trailing-slash.md) · [日本語](../ja/topic-trailing-slash.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="trailing-slash"></a>

trailingSlash は URL の形式のみ変更し、サーバーのリダイレクトは変更しません。フレームワークの設定と揃えてください。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

## 関連トピック

- [ベースパス — 内部と公開 URL](topic-base-path.md)
- [URL の既定値](topic-config-defaults.md)

---

← 前へ: [絶対 URL と origin](topic-absolute-urls.md) · [全トピック](build-with-routes.md) · 次へ: [意味的なルート名とグループ](topic-semantic-names.md) →
