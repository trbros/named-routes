# 混合セグメント

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-mixed-parameters.md) · [Português](../pt/topic-mixed-parameters.md) · [Español](../es/topic-mixed-parameters.md) · [日本語](../ja/topic-mixed-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mixed-parameters"></a>

混合セグメントは固定文字列と必須パラメータを組み合わせます。各パラメータには固有のキーがあります。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

## 関連トピック

- [必須パラメータとエンコード](topic-parameters.md)
- [自動命名のルール](topic-naming.md)

---

← 前へ: [キャッチオールパラメータ](topic-catch-all-parameters.md) · [全トピック](build-with-routes.md) · 次へ: [クエリ文字列](topic-query-hash.md) →
