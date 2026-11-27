# Pages Router recipes

Topic: `pages-router` · Named Routes v2.2.0

Use the same generated helper. The router hook comes from next/router in Pages Router applications. Link does not need a custom adapter. The discovery process can scan both router directories during migration, but conflicting canonical URLs fail generation.

**Base and i18n.** Next Link and next/router use the configured basePath and locale themselves. Keep route() internal for those consumers. Use basePath: true and, when applicable, locale for plain public URLs; route.localize() requires configured i18n and does not install redirects automatically.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

## Without base path

Browser URL: `/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

## With base path

Browser URL: `/app/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-deployment, nextjs-i18n
