# route.forLocale()

[ドキュメント](index.md) / [国際化](internationalization.md)

[English](../en/topic-helper-for-locale.md) · [Português](../pt/topic-helper-for-locale.md) · [Español](../es/topic-helper-for-locale.md) · [日本語](../ja/topic-helper-for-locale.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-for-locale"></a>

`route.forLocale(locale)` は設定済みロケールに固定したヘルパーを作ります。後の呼び出しの locale オプションで上書きできます。元のヘルパーは変化せず、アセットにはロケールを付けません。特定言語の複数リンクに使えます。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
const pt = urls.forLocale("pt");
pt("about"); // /pt/sobre
pt("posts.show", { id: 42 }); // /pt/artigos/42
urls("about"); // /about
pt.asset("logo.svg"); // /logo.svg
```

---

← 前へ: [route.locales()](topic-helper-locales.md) · [全トピック](internationalization.md)
