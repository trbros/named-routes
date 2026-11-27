# route.locales()

Topic: `helper-locales` · Named Routes v2.2.0

`route.locales()` lista los idiomas configurados o un array vacío sin i18n. Es configuración, no detección del navegador o la petición. Úsalo en selectores de idioma.

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
