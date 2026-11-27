# Links e navegação

[Documentação](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-navigation.md) · [Português](../pt/topic-vue-navigation.md) · [Español](../es/topic-vue-navigation.md) · [日本語](../ja/topic-vue-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-navigation"></a>

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

## Tópicos relacionados

- [route()](topic-helper-route.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [Navegação — router.push()](topic-vue-programmatic.md)

---

← Anterior: [Convenções de arquivos e descoberta](topic-vue-conventions.md) · [Todos os tópicos](framework-vue.md) · Próximo: [Navegação — router.push()](topic-vue-programmatic.md) →
