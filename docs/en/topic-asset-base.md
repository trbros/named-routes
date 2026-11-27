# assetBase & CDN

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-asset-base.md) · [Português](../pt/topic-asset-base.md) · [Español](../es/topic-asset-base.md) · [日本語](../ja/topic-asset-base.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-base"></a>

`defaults.assetBase` overrides the public file prefix independently of `basePath`. Use an HTTP(S) CDN URL, a root-relative prefix, or `/` to opt out of the navigation base. It does not deploy files or configure a CDN. Keep secrets out of defaults; they are serialized to the generated module. In named-routes.config use the same defaults object.

<a id="without-base"></a>
## Without base path

Public file URL: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

<a id="with-base"></a>
## With base path

Public file URL: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /app/about
const rootAssets = route.withDefaults({ assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```

---

← Previous: [route.asset()](topic-helper-route-asset.md) · [All topics](public-assets.md) · Next: [Absolute asset URLs](topic-asset-absolute.md) →
