# Enlaces y navegación

[Documentación](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-navigation.md) · [Português](../pt/topic-react-router-navigation.md) · [Español](../es/topic-react-router-navigation.md) · [日本語](../ja/topic-react-router-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-navigation"></a>

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

## Temas relacionados

- [route()](topic-helper-route.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Cadenas de consulta](topic-query-hash.md)
- [route.url() — URL públicas](topic-public-url.md)
- [Navegación — useNavigate()](topic-react-router-programmatic.md)

---

← Anterior: [Convenciones y descubrimiento](topic-react-router-conventions.md) · [Todos los temas](framework-react-router.md) · Siguiente: [Navegación — useNavigate()](topic-react-router-programmatic.md) →
