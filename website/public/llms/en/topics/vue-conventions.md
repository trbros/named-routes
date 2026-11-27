# File conventions & discovery

Topic: `vue-conventions` · Named Routes v2.2.0

Create `src/pages/users/[id].vue` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** index.vue and (name).vue are index routes; dots nest (users.edit.vue is /users/edit); [id] and [[id]]; [id]+ is a one-or-more repeatable param ([...id]) and [[id]]+ zero-or-more ([[...id]]); [...path] also matches an empty remainder ([[...path]]); (group) folders are omitted; parent.vue + parent/ nesting merges; mixed segments like v[major]-[minor] work.

**Verified.** Names come from the typed-router.d.ts that Vue Router 5 writes (its dts option), so definePage({ path }) overrides are named by the URL they serve; before it exists, the files are scanned. A real Vite dev server with these conventions runs in CI, and examples/vue builds, runs and is driven in a browser with Vue Router 5 (vue-router/vite), including a users/_parent.vue layout and a definePage({ path }) page.

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
