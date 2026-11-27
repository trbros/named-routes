# route.localize()

[Documentation](index.md) / [Internationalization](internationalization.md)

[English](../en/topic-helper-localize.md) · [Português](../pt/topic-helper-localize.md) · [Español](../es/topic-helper-localize.md) · [日本語](../ja/topic-helper-localize.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-localize"></a>

`route.localize(url, locale?, options?)` translates an existing URL through the route table, preserving its query and fragment. Use it in language switchers and redirects. It returns null if no unambiguous localized route exists. For a public URL containing basePath, pass `{ basePath: true }`; use `sourceLocale` to disambiguate unprefixed translated paths when needed. It does not translate dynamic slug values or determine the visitor’s language.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/pt/sobre?tab=info#top", "en");
// /en/about?tab=info#top
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/app/pt/sobre?tab=info#top", "en", { basePath: true });
// /app/en/about?tab=info#top
```

---

← Previous: [Generate a localized URL](topic-localized-url.md) · [All topics](internationalization.md) · Next: [route.locales()](topic-helper-locales.md) →
