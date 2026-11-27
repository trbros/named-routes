# Navegação — navigateTo()

[Documentação](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-programmatic.md) · [Português](../pt/topic-nuxt-programmatic.md) · [Español](../es/topic-nuxt-programmatic.md) · [日本語](../ja/topic-nuxt-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-programmatic"></a>

Use dentro do componente/setup ou handler de evento suportado pelo framework, não na inicialização do módulo. O Named Routes constrói o caminho; a função nativa realiza a navegação. Configure a base conforme o guia de deploy.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

## Tópicos relacionados

- [Links e navegação](topic-nuxt-navigation.md)
- [Base path e deploy](topic-nuxt-deployment.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [Links e navegação](topic-nuxt-navigation.md) · [Todos os tópicos](framework-nuxt.md) · Próximo: [Base path e deploy](topic-nuxt-deployment.md) →
