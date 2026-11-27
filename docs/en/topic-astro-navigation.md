# Links & navigation

[Documentation](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-navigation.md) · [Português](../pt/topic-astro-navigation.md) · [Español](../es/topic-astro-navigation.md) · [日本語](../ja/topic-astro-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-navigation"></a>

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## Related topics

- [route()](topic-helper-route.md)
- [Required parameters & encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — public URLs](topic-public-url.md)
- [Navigation — Astro.redirect()](topic-astro-programmatic.md)

---

← Previous: [File conventions & discovery](topic-astro-conventions.md) · [All topics](framework-astro.md) · Next: [Navigation — Astro.redirect()](topic-astro-programmatic.md) →
