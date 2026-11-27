# route.canonical()

[Documentation](index.md) / [SEO & metadata](seo.md)

[English](../en/topic-helper-canonical.md) · [Português](../pt/topic-helper-canonical.md) · [Español](../es/topic-helper-canonical.md) · [日本語](../ja/topic-helper-canonical.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-canonical"></a>

Generate an absolute URL for metadata, using the explicit, bound or default locale (if configured). Canonical URLs always include the navigation base. Query and hash are included only if explicitly provided. It does not decide which content is canonical or remove tracking parameters automatically.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/pt/sobre
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/app/pt/sobre
```

---

[All topics](seo.md) · Next: [route.alternates()](topic-helper-alternates.md) →
