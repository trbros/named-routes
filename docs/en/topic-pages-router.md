# Pages Router recipes

[Documentation](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-pages-router.md) · [Português](../pt/topic-pages-router.md) · [Español](../es/topic-pages-router.md) · [日本語](../ja/topic-pages-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="pages-router"></a>

Use the same generated helper. The router hook comes from next/router in Pages Router applications. Link does not need a custom adapter. The discovery process can scan both router directories during migration, but conflicting canonical URLs fail generation.

**Base and i18n.** Next Link and next/router use the configured basePath and locale themselves. Keep route() internal for those consumers. Use basePath: true and, when applicable, locale for plain public URLs; route.localize() requires configured i18n and does not install redirects automatically.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

<a id="without-base"></a>
## Without base path

Browser URL: `/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

## Related topics

- [Links & navigation](topic-nextjs-navigation.md)
- [Base path & deployment](topic-nextjs-deployment.md)
- [Localized links](topic-nextjs-i18n.md)

---

← Previous: [App Router recipes](topic-app-router.md) · [All topics](framework-nextjs.md) · Next: [Typed hrefs for Next.js typedRoutes](topic-typed-hrefs.md) →
