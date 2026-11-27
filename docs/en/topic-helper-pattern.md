# route.pattern()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-pattern.md) · [Português](../pt/topic-helper-pattern.md) · [Español](../es/topic-helper-pattern.md) · [日本語](../ja/topic-helper-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-pattern"></a>

`route.pattern(name, locale?)` returns the route template, not a generated URL. Passing a locale returns its localized template when configured. It does not substitute parameters or add a locale or base prefix. Use route() to create a navigable URL.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.pattern("posts.show"); // /posts/[id]
urls.pattern("posts.show", "pt"); // /artigos/[id]
urls("posts.show", { id: 42 }, { locale: "pt" }); // /pt/artigos/42
```

## Related topics

- [parsePattern()](topic-helper-parse-pattern.md)
- [formatPattern()](topic-helper-format-pattern.md)

---

← Previous: [route.names()](topic-helper-names.md) · [All topics](route-helpers.md) · Next: [createRoutes()](topic-helper-create-routes.md) →
