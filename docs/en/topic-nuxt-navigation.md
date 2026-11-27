# Links & navigation

[Documentation](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-navigation.md) · [Português](../pt/topic-nuxt-navigation.md) · [Español](../es/topic-nuxt-navigation.md) · [日本語](../ja/topic-nuxt-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-navigation"></a>

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

## Related topics

- [route()](topic-helper-route.md)
- [Required parameters & encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — public URLs](topic-public-url.md)
- [Navigation — navigateTo()](topic-nuxt-programmatic.md)

---

← Previous: [File conventions & discovery](topic-nuxt-conventions.md) · [All topics](framework-nuxt.md) · Next: [Navigation — navigateTo()](topic-nuxt-programmatic.md) →
