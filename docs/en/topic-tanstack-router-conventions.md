# File conventions & discovery

[Documentation](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-conventions.md) · [Português](../pt/topic-tanstack-router-conventions.md) · [Español](../es/topic-tanstack-router-conventions.md) · [日本語](../ja/topic-tanstack-router-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-conventions"></a>

Create `src/routes/users/$id.tsx` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** __root is skipped; index and route.tsx are the folder's route; flat (posts.$postId.tsx) and directory files mix; $param; {-$locale} is optional ([[locale]]); prefix{$id}suffix becomes a mixed segment; a lone $ is a splat named _splat ([[..._splat]]); _layout is pathless; posts_ opts out of nesting; -prefixed files and (group) folders are ignored; .lazy files belong to the same route.

**Verified.** Names come from the routeTree.gen.ts the TanStack Router plugin or CLI generates (its navigable paths); before it exists, the files are scanned. Convention tests plus examples/tanstack-router, which builds and runs with the TanStack router plugin.

## Example

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

## Related topics

- [Automatic naming rules](topic-naming.md)
- [Semantic route names and groups](topic-semantic-names.md)
- [Discovery edge cases](topic-discovery.md)

---

← Previous: [TanStack Router: setup](topic-tanstack-router.md) · [All topics](framework-tanstack-router.md) · Next: [Links & navigation](topic-tanstack-router-navigation.md) →
