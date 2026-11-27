# Navegación — goto()

[Documentación](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-programmatic.md) · [Português](../pt/topic-sveltekit-programmatic.md) · [Español](../es/topic-sveltekit-programmatic.md) · [日本語](../ja/topic-sveltekit-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-programmatic"></a>

Usa dentro de un componente/setup o evento, no al inicializar el módulo. Named Routes construye la ruta; la función nativa navega.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

## Temas relacionados

- [Enlaces y navegación](topic-sveltekit-navigation.md)
- [Base path y despliegue](topic-sveltekit-deployment.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Enlaces y navegación](topic-sveltekit-navigation.md) · [Todos los temas](framework-sveltekit.md) · Siguiente: [Base path y despliegue](topic-sveltekit-deployment.md) →
