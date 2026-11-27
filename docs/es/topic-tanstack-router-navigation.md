# Enlaces y navegación

[Documentación](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-navigation.md) · [Português](../pt/topic-tanstack-router-navigation.md) · [Español](../es/topic-tanstack-router-navigation.md) · [日本語](../ja/topic-tanstack-router-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-navigation"></a>

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

**Cuándo usarlo.** TanStack Router ya tipa su propio <Link to> por id de ruta. Usa route() donde haga falta un string simple: <a href>, redirects a otras apps, emails, sitemaps, analítica, URLs con prefijo de idioma y nombres compartidos con otros frameworks en un monorepo.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## Temas relacionados

- [route()](topic-helper-route.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Cadenas de consulta](topic-query-hash.md)
- [route.url() — URL públicas](topic-public-url.md)
- [Navegación — window.location.assign()](topic-tanstack-router-programmatic.md)

---

← Anterior: [Convenciones y descubrimiento](topic-tanstack-router-conventions.md) · [Todos los temas](framework-tanstack-router.md) · Siguiente: [Navegación — window.location.assign()](topic-tanstack-router-programmatic.md) →
