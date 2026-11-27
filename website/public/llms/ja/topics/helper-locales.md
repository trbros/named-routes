# route.locales()

Topic: `helper-locales` · Named Routes v2.2.0

`route.locales()` は設定されたロケールを一覧にし、i18n がなければ空配列を返します。ブラウザーやリクエストの言語検出ではありません。言語セレクターに使えます。

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
