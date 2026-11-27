# route.forLocale()

Topic: `helper-for-locale` · Named Routes v2.2.0

`route.forLocale(locale)` cria um helper vinculado ao idioma configurado. Uma opção locale explícita em uma chamada posterior pode sobrescrevê-lo. O helper original não muda e assets nunca recebem o idioma. Use para gerar vários links em um idioma conhecido.

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
