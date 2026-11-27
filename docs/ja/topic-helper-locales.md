# route.locales()

[ドキュメント](index.md) / [国際化](internationalization.md)

[English](../en/topic-helper-locales.md) · [Português](../pt/topic-helper-locales.md) · [Español](../es/topic-helper-locales.md) · [日本語](../ja/topic-helper-locales.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-locales"></a>

`route.locales()` は設定されたロケールを一覧にし、i18n がなければ空配列を返します。ブラウザーやリクエストの言語検出ではありません。言語セレクターに使えます。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.locales(); // ["en", "pt"]
createRoutes({ home: "/" }).locales(); // []
```

---

← 前へ: [route.localize()](topic-helper-localize.md) · [全トピック](internationalization.md) · 次へ: [route.forLocale()](topic-helper-for-locale.md) →
