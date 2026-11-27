# Enlaces y navegación

[Documentación](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-navigation.md) · [Português](../pt/topic-vue-navigation.md) · [Español](../es/topic-vue-navigation.md) · [日本語](../ja/topic-vue-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-navigation"></a>

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## Temas relacionados

- [route()](topic-helper-route.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Cadenas de consulta](topic-query-hash.md)
- [route.url() — URL públicas](topic-public-url.md)
- [Navegación — router.push()](topic-vue-programmatic.md)

---

← Anterior: [Convenciones y descubrimiento](topic-vue-conventions.md) · [Todos los temas](framework-vue.md) · Siguiente: [Navegación — router.push()](topic-vue-programmatic.md) →
