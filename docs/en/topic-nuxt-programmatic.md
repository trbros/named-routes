# Navigation — navigateTo()

[Documentation](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-programmatic.md) · [Português](../pt/topic-nuxt-programmatic.md) · [Español](../es/topic-nuxt-programmatic.md) · [日本語](../ja/topic-nuxt-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-programmatic"></a>

Use this inside the framework-supported component/setup or event handler, not at module initialization. Named Routes builds the path; the native navigation function performs the transition. Configure the router base as in the deployment guide.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

## Related topics

- [Links & navigation](topic-nuxt-navigation.md)
- [Base path & deployment](topic-nuxt-deployment.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Links & navigation](topic-nuxt-navigation.md) · [All topics](framework-nuxt.md) · Next: [Base path & deployment](topic-nuxt-deployment.md) →
