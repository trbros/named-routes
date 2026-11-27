# route.withDefaults()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-with-defaults.md) · [Português](../pt/topic-helper-with-defaults.md) · [Español](../es/topic-helper-with-defaults.md) · [日本語](../ja/topic-helper-with-defaults.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-with-defaults"></a>

Create an isolated helper with origin, basePath, assetBase or trailingSlash overrides. Routes, locale rules, bound locale, manifest and query schemas remain available. The original helper is unchanged; use a trusted tenant configuration on the server, not arbitrary Host headers. The returned helper conservatively types generated hrefs as string.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

## Related topics

- [Base path — internal vs public URL](topic-base-path.md)
- [Absolute URLs & origin](topic-absolute-urls.md)
- [createRoutes()](topic-helper-create-routes.md)

---

← Previous: [createRoutes()](topic-helper-create-routes.md) · [All topics](route-helpers.md) · Next: [parsePattern()](topic-helper-parse-pattern.md) →
