# App Router — programmatic navigation

[Documentation](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-router-push.md) · [Português](../pt/topic-nextjs-router-push.md) · [Español](../es/topic-nextjs-router-push.md) · [日本語](../ja/topic-nextjs-router-push.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-router-push"></a>

In a Client Component, use next/navigation useRouter and pass an internal typed route. The router applies basePath.

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## Related topics

- [App Router recipes](topic-app-router.md)
- [Links & navigation](topic-nextjs-navigation.md)
- [route()](topic-helper-route.md)

---

← Previous: [Typed hrefs for Next.js typedRoutes](topic-typed-hrefs.md) · [All topics](framework-nextjs.md) · Next: [App Router — redirect()](topic-nextjs-redirect.md) →
