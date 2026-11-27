# formatPattern()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-format-pattern.md) · [Português](../pt/topic-helper-format-pattern.md) · [Español](../es/topic-helper-format-pattern.md) · [日本語](../ja/topic-helper-format-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-format-pattern"></a>

セグメントを正規のブラケット構文に戻します。具体的な URL ではありません。

## 例

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

## 関連トピック

- [createRoutes()](topic-helper-create-routes.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← 前へ: [parsePattern()](topic-helper-parse-pattern.md) · [全トピック](route-helpers.md) · 次へ: [patternParameters()](topic-helper-pattern-parameters.md) →
