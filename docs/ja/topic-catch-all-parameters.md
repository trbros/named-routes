# キャッチオールパラメータ

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-catch-all-parameters.md) · [Português](../pt/topic-catch-all-parameters.md) · [Español](../es/topic-catch-all-parameters.md) · [日本語](../ja/topic-catch-all-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="catch-all-parameters"></a>

[...slug] は空でない配列、[[...slug]] は省略または空配列を受け付けます。各要素は別々のセグメントになります。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

## 関連トピック

- [任意パラメータ](topic-optional-parameters.md)
- [必須パラメータとエンコード](topic-parameters.md)

---

← 前へ: [任意パラメータ](topic-optional-parameters.md) · [全トピック](build-with-routes.md) · 次へ: [混合セグメント](topic-mixed-parameters.md) →
