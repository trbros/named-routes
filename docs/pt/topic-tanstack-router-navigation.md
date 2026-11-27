# Links e navegação

[Documentação](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-navigation.md) · [Português](../pt/topic-tanstack-router-navigation.md) · [Español](../es/topic-tanstack-router-navigation.md) · [日本語](../ja/topic-tanstack-router-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-navigation"></a>

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

**Quando usar.** O TanStack Router já tipa o próprio <Link to> pelo id da rota. Use route() onde é preciso uma string simples: <a href>, redirects para outros apps, e-mails, sitemaps, analytics, URLs com prefixo de idioma e nomes compartilhados com outros frameworks em um monorepo.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## Tópicos relacionados

- [route()](topic-helper-route.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [Navegação — window.location.assign()](topic-tanstack-router-programmatic.md)

---

← Anterior: [Convenções de arquivos e descoberta](topic-tanstack-router-conventions.md) · [Todos os tópicos](framework-tanstack-router.md) · Próximo: [Navegação — window.location.assign()](topic-tanstack-router-programmatic.md) →
