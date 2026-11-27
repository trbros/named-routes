# Navigation — window.location.assign()

[Documentation](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-programmatic.md) · [Português](../pt/topic-tanstack-router-programmatic.md) · [Español](../es/topic-tanstack-router-programmatic.md) · [日本語](../ja/topic-tanstack-router-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-programmatic"></a>

Use this only for full-document navigation in the browser. For SPA navigation, use TanStack Router’s own typed navigate/Link with its native route ID and params; a generated public URL is not a TanStack route ID.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## Related topics

- [Links & navigation](topic-tanstack-router-navigation.md)
- [Base path & deployment](topic-tanstack-router-deployment.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Links & navigation](topic-tanstack-router-navigation.md) · [All topics](framework-tanstack-router.md) · Next: [Base path & deployment](topic-tanstack-router-deployment.md) →
