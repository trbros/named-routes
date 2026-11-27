# Navegación — window.location.assign()

[Documentación](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-programmatic.md) · [Português](../pt/topic-tanstack-router-programmatic.md) · [Español](../es/topic-tanstack-router-programmatic.md) · [日本語](../ja/topic-tanstack-router-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-programmatic"></a>

Úsalo para navegar el documento completo. Para SPA usa navigate/Link nativo con ID y params.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## Temas relacionados

- [Enlaces y navegación](topic-tanstack-router-navigation.md)
- [Base path y despliegue](topic-tanstack-router-deployment.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Enlaces y navegación](topic-tanstack-router-navigation.md) · [Todos los temas](framework-tanstack-router.md) · Siguiente: [Base path y despliegue](topic-tanstack-router-deployment.md) →
