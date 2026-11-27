# Navigation — router.push()

[Documentation](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-programmatic.md) · [Português](../pt/topic-vue-programmatic.md) · [Español](../es/topic-vue-programmatic.md) · [日本語](../ja/topic-vue-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-programmatic"></a>

Use this inside the framework-supported component/setup or event handler, not at module initialization. Named Routes builds the path; the native navigation function performs the transition. Configure the router base as in the deployment guide.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## Related topics

- [Links & navigation](topic-vue-navigation.md)
- [Base path & deployment](topic-vue-deployment.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Links & navigation](topic-vue-navigation.md) · [All topics](framework-vue.md) · Next: [Base path & deployment](topic-vue-deployment.md) →
