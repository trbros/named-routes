# File conventions & discovery

[Documentation](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-conventions.md) · [Português](../pt/topic-sveltekit-conventions.md) · [Español](../es/topic-sveltekit-conventions.md) · [日本語](../ja/topic-sveltekit-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-conventions"></a>

Create `src/routes/users/[id]/+page.svelte` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** src/routes with +page.svelte, +page.ts or +page.server.ts (they merge into one route); (group) folders are omitted; [id=matcher] keeps the parameter and drops the matcher; [[lang]] is optional; [...rest] matches zero or more segments ([[...rest]]) and may sit before static segments; +page@ layout resets are normal pages; [x+2f] and [u+0041] escapes are decoded. +server endpoints are opt-in with includeApi.

**Verification.** Convention tests and the examples/sveltekit integration cover file discovery and navigation; the current example uses SvelteKit 3 with Svelte 5.

## Example

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

## Related topics

- [Automatic naming rules](topic-naming.md)
- [Semantic route names and groups](topic-semantic-names.md)
- [Discovery edge cases](topic-discovery.md)

---

← Previous: [SvelteKit: setup](topic-sveltekit.md) · [All topics](framework-sveltekit.md) · Next: [Links & navigation](topic-sveltekit-navigation.md) →
