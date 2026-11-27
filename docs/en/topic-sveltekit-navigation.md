# Links & navigation

[Documentation](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-navigation.md) · [Português](../pt/topic-sveltekit-navigation.md) · [Español](../es/topic-sveltekit-navigation.md) · [日本語](../ja/topic-sveltekit-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-navigation"></a>

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## Related topics

- [route()](topic-helper-route.md)
- [Required parameters & encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — public URLs](topic-public-url.md)
- [Navigation — goto()](topic-sveltekit-programmatic.md)

---

← Previous: [File conventions & discovery](topic-sveltekit-conventions.md) · [All topics](framework-sveltekit.md) · Next: [Navigation — goto()](topic-sveltekit-programmatic.md) →
