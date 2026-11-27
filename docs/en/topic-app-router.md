# App Router recipes

[Documentation](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-app-router.md) · [Português](../pt/topic-app-router.md) · [Español](../es/topic-app-router.md) · [日本語](../ja/topic-app-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="app-router"></a>

The helper returns a normal URL string. Use it with next/link, redirect or the App Router useRouter hook from next/navigation. Run redirects from the appropriate server or event flow; named routes do not change Next.js redirect semantics.

Each name in these snippets assumes the corresponding page exists: posts/page.tsx, posts/[post]/page.tsx and posts/[post]/edit/page.tsx.

**Base and localized URLs.** The wrapper inherits basePath. Keep Next Link and router navigation internal; add basePath: true for plain anchors. Use route.localize() with the already selected locale in your proxy or middleware when redirecting incoming translated aliases; see the i18n section.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

<a id="without-base"></a>
## Without base path

Browser URL: `/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

## Related topics

- [Links & navigation](topic-nextjs-navigation.md)
- [App Router — programmatic navigation](topic-nextjs-router-push.md)
- [App Router — redirect()](topic-nextjs-redirect.md)
- [Base path & deployment](topic-nextjs-deployment.md)

---

← Previous: [HTTP endpoints](topic-nextjs-endpoints.md) · [All topics](framework-nextjs.md) · Next: [Pages Router recipes](topic-pages-router.md) →
