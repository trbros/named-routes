# route.alternates()

[Documentation](index.md) / [SEO & metadata](seo.md)

[English](../en/topic-helper-alternates.md) · [Português](../pt/topic-helper-alternates.md) · [Español](../es/topic-helper-alternates.md) · [日本語](../ja/topic-helper-alternates.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-alternates"></a>

Build a map of locale URLs using existing pathnames, domains, params and query options. Absolute by default, with the base included. For nonlocalized routes or no i18n, returns an empty map. Use for hreflang and multilingual sitemaps; provide actual dynamic parameters. Locale slugs are not automatically translated.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/en/about", pt: "https://example.com/pt/sobre" }
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/app/en/about", pt: "https://example.com/app/pt/sobre" }
```

---

← Previous: [route.canonical()](topic-helper-canonical.md) · [All topics](seo.md)
