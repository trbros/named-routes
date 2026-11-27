# Links & navigation

Topic: `nuxt-navigation` · Named Routes v2.2.0

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

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

Related topic IDs: helper-route, parameters, query-hash, public-url, nuxt-programmatic
