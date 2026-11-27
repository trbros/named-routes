# Navegación — router.push()

[Documentación](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-programmatic.md) · [Português](../pt/topic-vue-programmatic.md) · [Español](../es/topic-vue-programmatic.md) · [日本語](../ja/topic-vue-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-programmatic"></a>

Usa dentro de un componente/setup o evento, no al inicializar el módulo. Named Routes construye la ruta; la función nativa navega.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## Temas relacionados

- [Enlaces y navegación](topic-vue-navigation.md)
- [Base path y despliegue](topic-vue-deployment.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Enlaces y navegación](topic-vue-navigation.md) · [Todos los temas](framework-vue.md) · Siguiente: [Base path y despliegue](topic-vue-deployment.md) →
