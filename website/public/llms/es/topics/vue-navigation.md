# Enlaces y navegación

Topic: `vue-navigation` · Named Routes v2.2.0

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

## Sin base path

URL en el navegador: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

## Con base path

URL en el navegador: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, vue-programmatic
