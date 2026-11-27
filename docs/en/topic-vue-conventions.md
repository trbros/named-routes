# File conventions & discovery

[Documentation](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-conventions.md) · [Português](../pt/topic-vue-conventions.md) · [Español](../es/topic-vue-conventions.md) · [日本語](../ja/topic-vue-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-conventions"></a>

Create `src/pages/users/[id].vue` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** index.vue and (name).vue are index routes; dots nest (users.edit.vue is /users/edit); [id] and [[id]]; [id]+ is a one-or-more repeatable param ([...id]) and [[id]]+ zero-or-more ([[...id]]); [...path] also matches an empty remainder ([[...path]]); (group) folders are omitted; parent.vue + parent/ nesting merges; mixed segments like v[major]-[minor] work.

**Verified.** Names come from the typed-router.d.ts that Vue Router 5 writes (its dts option), so definePage({ path }) overrides are named by the URL they serve; before it exists, the files are scanned. A real Vite dev server with these conventions runs in CI, and examples/vue builds, runs and is driven in a browser with Vue Router 5 (vue-router/vite), including a users/_parent.vue layout and a definePage({ path }) page.

## Example

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

## Related topics

- [Automatic naming rules](topic-naming.md)
- [Semantic route names and groups](topic-semantic-names.md)
- [Discovery edge cases](topic-discovery.md)

---

← Previous: [Vue Router: setup](topic-vue.md) · [All topics](framework-vue.md) · Next: [Links & navigation](topic-vue-navigation.md) →
