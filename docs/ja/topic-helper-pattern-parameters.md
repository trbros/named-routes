# patternParameters()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-pattern-parameters.md) · [Português](../pt/topic-helper-pattern-parameters.md) · [Español](../es/topic-helper-pattern-parameters.md) · [日本語](../ja/topic-helper-pattern-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-pattern-parameters"></a>

解析済みセグメントからパラメータ名を列挙します。

## 例

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

## 関連トピック

- [createRoutes()](topic-helper-create-routes.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← 前へ: [formatPattern()](topic-helper-format-pattern.md) · [全トピック](route-helpers.md)
