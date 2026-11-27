# Links & navigation

[Documentation](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-navigation.md) · [Português](../pt/topic-nextjs-navigation.md) · [Español](../es/topic-nextjs-navigation.md) · [日本語](../ja/topic-nextjs-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-navigation"></a>

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

## Related topics

- [route()](topic-helper-route.md)
- [Required parameters & encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [File conventions & discovery](topic-nextjs-conventions.md) · [All topics](framework-nextjs.md) · Next: [Base path & deployment](topic-nextjs-deployment.md) →
