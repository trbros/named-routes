# Links e navegação

[Documentação](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-navigation.md) · [Português](../pt/topic-astro-navigation.md) · [Español](../es/topic-astro-navigation.md) · [日本語](../ja/topic-astro-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-navigation"></a>

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## Tópicos relacionados

- [route()](topic-helper-route.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [Navegação — Astro.redirect()](topic-astro-programmatic.md)

---

← Anterior: [Convenções de arquivos e descoberta](topic-astro-conventions.md) · [Todos os tópicos](framework-astro.md) · Próximo: [Navegação — Astro.redirect()](topic-astro-programmatic.md) →
