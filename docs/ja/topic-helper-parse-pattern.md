# parsePattern()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-parse-pattern.md) · [Português](../pt/topic-helper-parse-pattern.md) · [Español](../es/topic-helper-parse-pattern.md) · [日本語](../ja/topic-helper-parse-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-parse-pattern"></a>

パターンを検証しセグメントに変換します。ツール向けの関数です。

## 例

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

## 関連トピック

- [createRoutes()](topic-helper-create-routes.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← 前へ: [route.withDefaults()](topic-helper-with-defaults.md) · [全トピック](route-helpers.md) · 次へ: [formatPattern()](topic-helper-format-pattern.md) →
