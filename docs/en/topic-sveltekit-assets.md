# Public assets

[Documentation](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-assets.md) · [Português](../pt/topic-sveltekit-assets.md) · [Español](../es/topic-sveltekit-assets.md) · [日本語](../ja/topic-sveltekit-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-assets"></a>

Place a file at `static/images/logo.svg`. Import asset from the same generated module as route. With /app as the effective base, asset("images/logo.svg") returns /app/images/logo.svg. CDN settings are independent of router navigation.

<a id="without-base"></a>
## Without base path

Public file URL: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## With base path

Public file URL: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## Related topics

- [asset() / route.asset()](topic-assets.md)
- [Typed assets](topic-typed-assets.md)
- [assetBase & CDN](topic-asset-base.md)
- [Asset versioning](topic-asset-versioning.md)

---

← Previous: [Base path & deployment](topic-sveltekit-deployment.md) · [All topics](framework-sveltekit.md) · Next: [Localized links](topic-sveltekit-i18n.md) →
