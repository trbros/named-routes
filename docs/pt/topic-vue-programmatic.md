# Navegação — router.push()

[Documentação](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-programmatic.md) · [Português](../pt/topic-vue-programmatic.md) · [Español](../es/topic-vue-programmatic.md) · [日本語](../ja/topic-vue-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-programmatic"></a>

Use dentro do componente/setup ou handler de evento suportado pelo framework, não na inicialização do módulo. O Named Routes constrói o caminho; a função nativa realiza a navegação. Configure a base conforme o guia de deploy.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## Tópicos relacionados

- [Links e navegação](topic-vue-navigation.md)
- [Base path e deploy](topic-vue-deployment.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [Links e navegação](topic-vue-navigation.md) · [Todos os tópicos](framework-vue.md) · Próximo: [Base path e deploy](topic-vue-deployment.md) →
