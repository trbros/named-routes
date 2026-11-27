# route.forLocale()

Topic: `helper-for-locale` · Named Routes v2.2.0

`route.forLocale(locale)` は設定済みロケールに固定したヘルパーを作ります。後の呼び出しの locale オプションで上書きできます。元のヘルパーは変化せず、アセットにはロケールを付けません。特定言語の複数リンクに使えます。

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
