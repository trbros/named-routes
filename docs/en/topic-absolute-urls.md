# Absolute URLs & origin

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-absolute-urls.md) · [Português](../pt/topic-absolute-urls.md) · [Español](../es/topic-absolute-urls.md) · [日本語](../ja/topic-absolute-urls.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="absolute-urls"></a>

Set defaults.origin to a trusted HTTP(S) origin without credentials, path, query or hash. absolute: true includes the base. The runtime never guesses the origin from window or request headers; public config must not contain secrets.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

## Related topics

- [Base path — internal vs public URL](topic-base-path.md)
- [route.canonical()](topic-helper-canonical.md)
- [route.withDefaults()](topic-helper-with-defaults.md)

---

← Previous: [Base path — internal vs public URL](topic-base-path.md) · [All topics](build-with-routes.md) · Next: [Trailing slashes](topic-trailing-slash.md) →
