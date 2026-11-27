# Links & navigation

[Documentation](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-navigation.md) · [Português](../pt/topic-vue-navigation.md) · [Español](../es/topic-vue-navigation.md) · [日本語](../ja/topic-vue-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-navigation"></a>

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

## Related topics

- [route()](topic-helper-route.md)
- [Required parameters & encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — public URLs](topic-public-url.md)
- [Navigation — router.push()](topic-vue-programmatic.md)

---

← Previous: [File conventions & discovery](topic-vue-conventions.md) · [All topics](framework-vue.md) · Next: [Navigation — router.push()](topic-vue-programmatic.md) →
