# Absolute asset URLs

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-asset-absolute.md) · [Português](../pt/topic-asset-absolute.md) · [Español](../es/topic-asset-absolute.md) · [日本語](../ja/topic-asset-absolute.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-absolute"></a>

Pass absolute: true to combine the trusted origin with the asset path. If assetBase is an absolute CDN URL, it is already absolute. Locale does not affect asset URLs.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/images/logo.svg
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/app/images/logo.svg
```

## Related topics

- [asset() / route.asset()](topic-assets.md)
- [assetBase & CDN](topic-asset-base.md)
- [Absolute URLs & origin](topic-absolute-urls.md)

---

← Previous: [assetBase & CDN](topic-asset-base.md) · [All topics](public-assets.md) · Next: [Typed assets](topic-typed-assets.md) →
