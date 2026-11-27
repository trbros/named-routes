# Navigation — goto()

[Documentation](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-programmatic.md) · [Português](../pt/topic-sveltekit-programmatic.md) · [Español](../es/topic-sveltekit-programmatic.md) · [日本語](../ja/topic-sveltekit-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-programmatic"></a>

Use this inside the framework-supported component/setup or event handler, not at module initialization. Named Routes builds the path; the native navigation function performs the transition. Configure the router base as in the deployment guide.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

## Related topics

- [Links & navigation](topic-sveltekit-navigation.md)
- [Base path & deployment](topic-sveltekit-deployment.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Links & navigation](topic-sveltekit-navigation.md) · [All topics](framework-sveltekit.md) · Next: [Base path & deployment](topic-sveltekit-deployment.md) →
