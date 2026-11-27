# route.locales()

Topic: `helper-locales` · Named Routes v2.2.0

`route.locales()` lists configured locales, or an empty array when i18n is absent. This is configuration, not browser or request language detection. Use it to populate a language selector.

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
