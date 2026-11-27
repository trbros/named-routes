# Navegación — Astro.redirect()

[Documentación](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-programmatic.md) · [Português](../pt/topic-astro-programmatic.md) · [Español](../es/topic-astro-programmatic.md) · [日本語](../ja/topic-astro-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-programmatic"></a>

En el frontmatter SSR de Astro devuelve Astro.redirect con la URL pública. La salida estática tiene otra semántica.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## Temas relacionados

- [Enlaces y navegación](topic-astro-navigation.md)
- [Base path y despliegue](topic-astro-deployment.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Enlaces y navegación](topic-astro-navigation.md) · [Todos los temas](framework-astro.md) · Siguiente: [Base path y despliegue](topic-astro-deployment.md) →
