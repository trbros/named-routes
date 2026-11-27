# route.locales()

Topic: `helper-locales` · Named Routes v2.2.0

`route.locales()` lista os idiomas configurados ou um array vazio sem i18n. Trata-se da configuração, não da detecção de idioma do navegador ou da requisição. Use em seletores de idioma.

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
