# route.asset()

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-helper-route-asset.md) · [Português](../pt/topic-helper-route-asset.md) · [Español](../es/topic-helper-route-asset.md) · [日本語](../ja/topic-helper-route-asset.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-route-asset"></a>

The bound asset helper is exposed as route.asset on every runtime helper, including typed helpers. A generated module normally also exports asset directly; both share the same defaults and manifest.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" });
route.asset("logo.svg"); // /logo.svg
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" }, { basePath: "/app" });
route.asset("logo.svg"); // /app/logo.svg
```

## Related topics

- [asset() / route.asset()](topic-assets.md)
- [assetBase & CDN](topic-asset-base.md)

---

← Previous: [asset() / route.asset()](topic-assets.md) · [All topics](public-assets.md) · Next: [assetBase & CDN](topic-asset-base.md) →
