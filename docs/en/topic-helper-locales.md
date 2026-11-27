# route.locales()

[Documentation](index.md) / [Internationalization](internationalization.md)

[English](../en/topic-helper-locales.md) · [Português](../pt/topic-helper-locales.md) · [Español](../es/topic-helper-locales.md) · [日本語](../ja/topic-helper-locales.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-locales"></a>

`route.locales()` lists configured locales, or an empty array when i18n is absent. This is configuration, not browser or request language detection. Use it to populate a language selector.

## Example

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

---

← Previous: [route.localize()](topic-helper-localize.md) · [All topics](internationalization.md) · Next: [route.forLocale()](topic-helper-for-locale.md) →
