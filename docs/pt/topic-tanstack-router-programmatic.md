# Navegação — window.location.assign()

[Documentação](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-programmatic.md) · [Português](../pt/topic-tanstack-router-programmatic.md) · [Español](../es/topic-tanstack-router-programmatic.md) · [日本語](../ja/topic-tanstack-router-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-programmatic"></a>

Use apenas para navegação de documento inteiro no navegador. Para SPA, use navigate/Link tipado do TanStack com ID e params nativos; uma URL pública gerada não é um ID do TanStack.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## Tópicos relacionados

- [Links e navegação](topic-tanstack-router-navigation.md)
- [Base path e deploy](topic-tanstack-router-deployment.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [Links e navegação](topic-tanstack-router-navigation.md) · [Todos os tópicos](framework-tanstack-router.md) · Próximo: [Base path e deploy](topic-tanstack-router-deployment.md) →
