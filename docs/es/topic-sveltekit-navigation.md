# Enlaces y navegación

[Documentación](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-navigation.md) · [Português](../pt/topic-sveltekit-navigation.md) · [Español](../es/topic-sveltekit-navigation.md) · [日本語](../ja/topic-sveltekit-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-navigation"></a>

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## Temas relacionados

- [route()](topic-helper-route.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Cadenas de consulta](topic-query-hash.md)
- [route.url() — URL públicas](topic-public-url.md)
- [Navegación — goto()](topic-sveltekit-programmatic.md)

---

← Anterior: [Convenciones y descubrimiento](topic-sveltekit-conventions.md) · [Todos los temas](framework-sveltekit.md) · Siguiente: [Navegación — goto()](topic-sveltekit-programmatic.md) →
