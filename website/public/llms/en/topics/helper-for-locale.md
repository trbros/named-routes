# route.forLocale()

Topic: `helper-for-locale` · Named Routes v2.2.0

`route.forLocale(locale)` creates a helper bound to a configured locale. An explicit locale option on a later call can override it. The original helper is unchanged and assets never inherit the locale. Use this for a set of links in a known language.

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
