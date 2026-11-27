# route.has()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-has.md) · [Português](../pt/topic-helper-has.md) · [Español](../es/topic-helper-has.md) · [日本語](../ja/topic-helper-has.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-has"></a>

`route.has(name)` はマニフェストを調べ、任意の文字列を有効なルート名に絞り込みます。サーバーが現在そのルートを配信しているかは確認しません。外部入力から選んだ名前を使う前に利用します。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

## 関連トピック

- [route.names()](topic-helper-names.md)
- [route.pattern()](topic-helper-pattern.md)

---

← 前へ: [route.breadcrumbs()](topic-helper-breadcrumbs.md) · [全トピック](route-helpers.md) · 次へ: [route.names()](topic-helper-names.md) →
