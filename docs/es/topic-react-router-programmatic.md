# Navegación — useNavigate()

[Documentación](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-programmatic.md) · [Português](../pt/topic-react-router-programmatic.md) · [Español](../es/topic-react-router-programmatic.md) · [日本語](../ja/topic-react-router-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-programmatic"></a>

Usa dentro de un componente/setup o evento, no al inicializar el módulo. Named Routes construye la ruta; la función nativa navega.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

## Temas relacionados

- [Enlaces y navegación](topic-react-router-navigation.md)
- [Base path y despliegue](topic-react-router-deployment.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Enlaces y navegación](topic-react-router-navigation.md) · [Todos los temas](framework-react-router.md) · Siguiente: [Base path y despliegue](topic-react-router-deployment.md) →
