# route.pattern()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-pattern.md) · [Português](../pt/topic-helper-pattern.md) · [Español](../es/topic-helper-pattern.md) · [日本語](../ja/topic-helper-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-pattern"></a>

`route.pattern(name, locale?)` は生成済み URL ではなくテンプレートを返します。ロケールを指定すると設定済みの翻訳テンプレートを返します。パラメーター置換やプレフィックス追加は行いません。URL の生成には route() を使います。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.pattern("posts.show"); // /posts/[id]
urls.pattern("posts.show", "pt"); // /artigos/[id]
urls("posts.show", { id: 42 }, { locale: "pt" }); // /pt/artigos/42
```

## 関連トピック

- [parsePattern()](topic-helper-parse-pattern.md)
- [formatPattern()](topic-helper-format-pattern.md)

---

← 前へ: [route.names()](topic-helper-names.md) · [全トピック](route-helpers.md) · 次へ: [createRoutes()](topic-helper-create-routes.md) →
