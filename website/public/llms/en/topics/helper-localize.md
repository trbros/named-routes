# route.localize()

Topic: `helper-localize` · Named Routes v2.2.0

`route.localize(url, locale?, options?)` translates an existing URL through the route table, preserving its query and fragment. Use it in language switchers and redirects. It returns null if no unambiguous localized route exists. For a public URL containing basePath, pass `{ basePath: true }`; use `sourceLocale` to disambiguate unprefixed translated paths when needed. It does not translate dynamic slug values or determine the visitor’s language.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/pt/sobre?tab=info#top", "en");
// /en/about?tab=info#top
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/app/pt/sobre?tab=info#top", "en", { basePath: true });
// /app/en/about?tab=info#top
```
