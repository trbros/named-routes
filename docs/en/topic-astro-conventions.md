# File conventions & discovery

[Documentation](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-conventions.md) · [Português](../pt/topic-astro-conventions.md) · [Español](../es/topic-astro-conventions.md) · [日本語](../ja/topic-astro-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-conventions"></a>

Create `src/pages/users/[id].astro` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** src/pages with .astro, .md, .mdx, .markdown and .html pages; files and folders starting with _ are private; [id]; [...slug] matches zero or more segments ([[...slug]]); mixed segments such as [lang]-[version]. .ts/.js endpoints are opt-in with includeApi and keep their inner extension (api/data.json.ts is /api/data.json).

**Limits and verification.** Static builds still need getStaticPaths in dynamic pages: the package builds URLs, it does not enumerate parameters. Verified by convention tests and examples/astro, which builds and runs with Astro 5.

## Example

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

## Related topics

- [Automatic naming rules](topic-naming.md)
- [Semantic route names and groups](topic-semantic-names.md)
- [Discovery edge cases](topic-discovery.md)

---

← Previous: [Astro: setup](topic-astro.md) · [All topics](framework-astro.md) · Next: [Links & navigation](topic-astro-navigation.md) →
