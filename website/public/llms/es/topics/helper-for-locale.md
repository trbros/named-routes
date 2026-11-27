# route.forLocale()

Topic: `helper-for-locale` · Named Routes v2.2.0

`route.forLocale(locale)` crea un helper ligado al idioma configurado. Una opción locale explícita posterior puede reemplazarlo. El helper original no cambia y los assets nunca heredan el idioma. Úsalo para varios enlaces de un idioma conocido.

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
