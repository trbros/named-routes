# route.names()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-names.md) · [Português](../pt/topic-helper-names.md) · [Español](../es/topic-helper-names.md) · [日本語](../ja/topic-helper-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-names"></a>

`route.names()` は既知の名前を型付き配列で返します。デバッグや開発ツールに使えますが、権限や各ルートへのアクセス可能性は示しません。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

## 関連トピック

- [route.has()](topic-helper-has.md)
- [route.pattern()](topic-helper-pattern.md)

---

← 前へ: [route.has()](topic-helper-has.md) · [全トピック](route-helpers.md) · 次へ: [route.pattern()](topic-helper-pattern.md) →
