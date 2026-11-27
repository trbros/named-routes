# Enlaces y navegación

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-navigation.md) · [Português](../pt/topic-nextjs-navigation.md) · [Español](../es/topic-nextjs-navigation.md) · [日本語](../ja/topic-nextjs-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-navigation"></a>

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

## Temas relacionados

- [route()](topic-helper-route.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Cadenas de consulta](topic-query-hash.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Convenciones y descubrimiento](topic-nextjs-conventions.md) · [Todos los temas](framework-nextjs.md) · Siguiente: [Base path y despliegue](topic-nextjs-deployment.md) →
