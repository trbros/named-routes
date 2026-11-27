# Navegación — navigateTo()

[Documentación](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-programmatic.md) · [Português](../pt/topic-nuxt-programmatic.md) · [Español](../es/topic-nuxt-programmatic.md) · [日本語](../ja/topic-nuxt-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-programmatic"></a>

Usa dentro de un componente/setup o evento, no al inicializar el módulo. Named Routes construye la ruta; la función nativa navega.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

## Temas relacionados

- [Enlaces y navegación](topic-nuxt-navigation.md)
- [Base path y despliegue](topic-nuxt-deployment.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Enlaces y navegación](topic-nuxt-navigation.md) · [Todos los temas](framework-nuxt.md) · Siguiente: [Base path y despliegue](topic-nuxt-deployment.md) →
