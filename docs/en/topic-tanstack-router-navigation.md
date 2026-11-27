# Links & navigation

[Documentation](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-navigation.md) · [Português](../pt/topic-tanstack-router-navigation.md) · [Español](../es/topic-tanstack-router-navigation.md) · [日本語](../ja/topic-tanstack-router-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-navigation"></a>

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

**When to use it.** TanStack Router already types its own <Link to> by route id. Use route() where a plain string is needed: <a href>, redirects to other apps, emails, sitemaps, analytics, locale-prefixed URLs and names shared with other frameworks in a monorepo.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## Related topics

- [route()](topic-helper-route.md)
- [Required parameters & encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — public URLs](topic-public-url.md)
- [Navigation — window.location.assign()](topic-tanstack-router-programmatic.md)

---

← Previous: [File conventions & discovery](topic-tanstack-router-conventions.md) · [All topics](framework-tanstack-router.md) · Next: [Navigation — window.location.assign()](topic-tanstack-router-programmatic.md) →
