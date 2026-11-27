# Enlaces y navegación

[Documentación](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-navigation.md) · [Português](../pt/topic-astro-navigation.md) · [Español](../es/topic-astro-navigation.md) · [日本語](../ja/topic-astro-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-navigation"></a>

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## Temas relacionados

- [route()](topic-helper-route.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Cadenas de consulta](topic-query-hash.md)
- [route.url() — URL públicas](topic-public-url.md)
- [Navegación — Astro.redirect()](topic-astro-programmatic.md)

---

← Anterior: [Convenciones y descubrimiento](topic-astro-conventions.md) · [Todos los temas](framework-astro.md) · Siguiente: [Navegación — Astro.redirect()](topic-astro-programmatic.md) →
