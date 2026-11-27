# File conventions & discovery

Topic: `nuxt-conventions` · Named Routes v2.2.0

Create `app/pages/users/[id].vue` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** app/pages or pages: index.vue, [id], [[id]] optional, [...slug] (also matches an empty remainder, so it becomes [[...slug]]), (group) folders, mixed segments such as v[major]-[minor], and parent.vue + parent/ nesting merged into one route. Files starting with - are ignored. With includeApi, server/api (prefixed /api) and server/routes are scanned and .get/.post suffixes are removed.

**Limits and verification.** The module also writes .nuxt/named-routes/pages.json, so named-routes check and generate see the same routes after nuxt prepare. List it before @nuxtjs/i18n in modules, so it sees the routes before they are localized. The Vite plugin still works in Nuxt but only sees the files. Names follow this package's dotted style (users.$id), not Nuxt's own route names (users-id). Verified by convention tests and by examples/nuxt, which builds and runs with Nuxt 4, including a definePageMeta({ path }) page.

```text
app/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
