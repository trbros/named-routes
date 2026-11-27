# Next.js

# Next.js: setup

Topic: `nextjs` · Named Routes v2.2.0

Wrap next.config with withNamedRoutes from @triooo/named-routes/next. The module is generated before next dev and next build, kept current by a watcher inside next dev, and never written during next start, so read-only deployments are safe. The wrapper inherits pageExtensions, basePath, trailingSlash and the Pages Router i18n config.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

Related topic IDs: nextjs-conventions, nextjs-navigation, installation, configuration
---

# File conventions & discovery

Topic: `nextjs-conventions` · Named Routes v2.2.0

Create `app/users/[user]/page.tsx` in your project. This produces the name `users.$user` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** app/ and pages/ (or src/app and src/pages) are scanned together. App Router: page files only; route groups and parallel slots are omitted, interceptions resolve to their canonical URL, _private folders are ignored and %5F becomes an underscore. Pages Router: index is removed and _app, _document and _error are skipped. Route Handlers and pages/api are opt-in with includeApi. appDir and pagesDir point to custom folders (or false to skip one).

**Verified.** Real Next 16 dev servers (App Router and Pages Router, with basePath and live page discovery) run in CI. Demos: examples/app-router and examples/pages-router. See also the App Router and Pages Router recipes.

```text
app/users/[user]/page.tsx
  → users.$user
  → /users/[user]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links & navigation

Topic: `nextjs-navigation` · Named Routes v2.2.0

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

## Without base path

Browser URL: `/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

## With base path

Browser URL: `/app/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url
---

# Base path & deployment

Topic: `nextjs-deployment` · Named Routes v2.2.0

Set `basePath` in Next.js. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Public assets

Topic: `nextjs-assets` · Named Routes v2.2.0

Place a file at `public/images/logo.svg`. Import asset from the same generated module as route. With /app as the effective base, asset("images/logo.svg") returns /app/images/logo.svg. CDN settings are independent of router navigation.

## Without base path

Public file URL: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## With base path

Public file URL: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Localized links

Topic: `nextjs-i18n` · Named Routes v2.2.0

Configure locales and matching pathname rules in named-routes.config. Your framework still owns locale selection and routing. Use route.url with locale for a complete public URL; when using a locale-aware native link, do not apply the same prefix twice.

## Without base path

Browser URL: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /pt/users/42
```

## With base path

Browser URL: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# HTTP endpoints

Topic: `nextjs-endpoints` · Named Routes v2.2.0

Enable includeApi: true in named-routes.config and create `app/api/admin/route.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
---

# App Router recipes

Topic: `app-router` · Named Routes v2.2.0

The helper returns a normal URL string. Use it with next/link, redirect or the App Router useRouter hook from next/navigation. Run redirects from the appropriate server or event flow; named routes do not change Next.js redirect semantics.

Each name in these snippets assumes the corresponding page exists: posts/page.tsx, posts/[post]/page.tsx and posts/[post]/edit/page.tsx.

**Base and localized URLs.** The wrapper inherits basePath. Keep Next Link and router navigation internal; add basePath: true for plain anchors. Use route.localize() with the already selected locale in your proxy or middleware when redirecting incoming translated aliases; see the i18n section.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

## Without base path

Browser URL: `/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

## With base path

Browser URL: `/app/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-router-push, nextjs-redirect, nextjs-deployment
---

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
---

# Typed hrefs for Next.js typedRoutes

Topic: `typed-hrefs` · Named Routes v2.2.0

route() returns template literal types instead of string (the default since 2.0): route("users.$user", { user: 42 }) is typed `/users/${string}`. Next.js typedRoutes accepts these values in <Link href>, router.push(), replace() and prefetch() in both routers without a cast, and other typed routers accept them as strings. The types are the only difference: the URLs are identical.

Calls with query or hash return the path plus `?${string}` or `#${string}`. absolute, basePath and locale calls return string, because Next adds basePath and locales itself and rejects absolute URLs in typed links. Optional segments become unions, so /shop/[[...path]] without parameters is typed "/shop"; Next.js typedRoutes itself rejects that bare base path of an optional catch-all, even as a literal, so pass a segment there.

A narrower return type can break code that stores a route in a variable later reassigned to another string, such as useState(route(...)) followed by setState(window.location.href): annotate the variable as string, or set hrefs: "string" to keep the 1.x type (named-routes migrate --to 2 does it). With hrefs: "string" and typedRoutes, withNamedRoutes() prints a warning and named-routes doctor reports one. Verified with the real next typegen and tsc on Next 16 (App Router and Pages Router, webpack and Turbopack).

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```
---

# App Router — programmatic navigation

Topic: `nextjs-router-push` · Named Routes v2.2.0

In a Client Component, use next/navigation useRouter and pass an internal typed route. The router applies basePath.

## Without base path

Browser URL: `/posts/42/edit`.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

## With base path

Browser URL: `/app/posts/42/edit`.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

Related topic IDs: app-router, nextjs-navigation, helper-route
---

# App Router — redirect()

Topic: `nextjs-redirect` · Named Routes v2.2.0

Use Next.js redirect in a supported server context. Named Routes builds the URL only; Next.js controls the redirect response. Do not catch the framework redirect as an ordinary error.

## Without base path

Browser URL: `/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## With base path

Browser URL: `/app/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

Related topic IDs: app-router, nextjs-router-push
