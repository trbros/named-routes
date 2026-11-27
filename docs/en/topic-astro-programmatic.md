# Navigation — Astro.redirect()

[Documentation](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-programmatic.md) · [Português](../pt/topic-astro-programmatic.md) · [Español](../es/topic-astro-programmatic.md) · [日本語](../ja/topic-astro-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-programmatic"></a>

In a server-rendered Astro page frontmatter, return Astro.redirect with the public URL. The framework controls the response; static output has different redirect semantics.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## Related topics

- [Links & navigation](topic-astro-navigation.md)
- [Base path & deployment](topic-astro-deployment.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Links & navigation](topic-astro-navigation.md) · [All topics](framework-astro.md) · Next: [Base path & deployment](topic-astro-deployment.md) →
