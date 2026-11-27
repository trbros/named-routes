# Links e navegação

[Documentação](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-navigation.md) · [Português](../pt/topic-sveltekit-navigation.md) · [Español](../es/topic-sveltekit-navigation.md) · [日本語](../ja/topic-sveltekit-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-navigation"></a>

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## Tópicos relacionados

- [route()](topic-helper-route.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [Navegação — goto()](topic-sveltekit-programmatic.md)

---

← Anterior: [Convenções de arquivos e descoberta](topic-sveltekit-conventions.md) · [Todos os tópicos](framework-sveltekit.md) · Próximo: [Navegação — goto()](topic-sveltekit-programmatic.md) →
