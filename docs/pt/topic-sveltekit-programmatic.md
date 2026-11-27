# Navegação — goto()

[Documentação](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-programmatic.md) · [Português](../pt/topic-sveltekit-programmatic.md) · [Español](../es/topic-sveltekit-programmatic.md) · [日本語](../ja/topic-sveltekit-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-programmatic"></a>

Use dentro do componente/setup ou handler de evento suportado pelo framework, não na inicialização do módulo. O Named Routes constrói o caminho; a função nativa realiza a navegação. Configure a base conforme o guia de deploy.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

## Tópicos relacionados

- [Links e navegação](topic-sveltekit-navigation.md)
- [Base path e deploy](topic-sveltekit-deployment.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [Links e navegação](topic-sveltekit-navigation.md) · [Todos os tópicos](framework-sveltekit.md) · Próximo: [Base path e deploy](topic-sveltekit-deployment.md) →
