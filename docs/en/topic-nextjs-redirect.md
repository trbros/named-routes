# App Router — redirect()

[Documentation](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-redirect.md) · [Português](../pt/topic-nextjs-redirect.md) · [Español](../es/topic-nextjs-redirect.md) · [日本語](../ja/topic-nextjs-redirect.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-redirect"></a>

Use Next.js redirect in a supported server context. Named Routes builds the URL only; Next.js controls the redirect response. Do not catch the framework redirect as an ordinary error.

<a id="without-base"></a>
## Without base path

Browser URL: `/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## Related topics

- [App Router recipes](topic-app-router.md)
- [App Router — programmatic navigation](topic-nextjs-router-push.md)

---

← Previous: [App Router — programmatic navigation](topic-nextjs-router-push.md) · [All topics](framework-nextjs.md)
