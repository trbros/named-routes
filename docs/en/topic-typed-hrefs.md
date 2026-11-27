# Typed hrefs for Next.js typedRoutes

[Documentation](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-typed-hrefs.md) · [Português](../pt/topic-typed-hrefs.md) · [Español](../es/topic-typed-hrefs.md) · [日本語](../ja/topic-typed-hrefs.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typed-hrefs"></a>

route() returns template literal types instead of string (the default since 2.0): route("users.$user", { user: 42 }) is typed `/users/${string}`. Next.js typedRoutes accepts these values in <Link href>, router.push(), replace() and prefetch() in both routers without a cast, and other typed routers accept them as strings. The types are the only difference: the URLs are identical.

Calls with query or hash return the path plus `?${string}` or `#${string}`. absolute, basePath and locale calls return string, because Next adds basePath and locales itself and rejects absolute URLs in typed links. Optional segments become unions, so /shop/[[...path]] without parameters is typed "/shop"; Next.js typedRoutes itself rejects that bare base path of an optional catch-all, even as a literal, so pass a segment there.

A narrower return type can break code that stores a route in a variable later reassigned to another string, such as useState(route(...)) followed by setState(window.location.href): annotate the variable as string, or set hrefs: "string" to keep the 1.x type (named-routes migrate --to 2 does it). With hrefs: "string" and typedRoutes, withNamedRoutes() prints a warning and named-routes doctor reports one. Verified with the real next typegen and tsc on Next 16 (App Router and Pages Router, webpack and Turbopack).

## Example

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```

---

← Previous: [Pages Router recipes](topic-pages-router.md) · [All topics](framework-nextjs.md) · Next: [App Router — programmatic navigation](topic-nextjs-router-push.md) →
