# Public assets

[Documentation](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-assets.md) · [Português](../pt/topic-tanstack-router-assets.md) · [Español](../es/topic-tanstack-router-assets.md) · [日本語](../ja/topic-tanstack-router-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-assets"></a>

Place a file at `public/images/logo.svg`. Import asset from the same generated module as route. With /app as the effective base, asset("images/logo.svg") returns /app/images/logo.svg. CDN settings are independent of router navigation.

<a id="without-base"></a>
## Without base path

Public file URL: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## With base path

Public file URL: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## Related topics

- [asset() / route.asset()](topic-assets.md)
- [Typed assets](topic-typed-assets.md)
- [assetBase & CDN](topic-asset-base.md)
- [Asset versioning](topic-asset-versioning.md)

---

← Previous: [Base path & deployment](topic-tanstack-router-deployment.md) · [All topics](framework-tanstack-router.md) · Next: [Localized links](topic-tanstack-router-i18n.md) →
