# route.forLocale()

[Documentation](index.md) / [Internationalization](internationalization.md)

[English](../en/topic-helper-for-locale.md) · [Português](../pt/topic-helper-for-locale.md) · [Español](../es/topic-helper-for-locale.md) · [日本語](../ja/topic-helper-for-locale.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-for-locale"></a>

`route.forLocale(locale)` creates a helper bound to a configured locale. An explicit locale option on a later call can override it. The original helper is unchanged and assets never inherit the locale. Use this for a set of links in a known language.

## Example

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

← Previous: [route.locales()](topic-helper-locales.md) · [All topics](internationalization.md)
