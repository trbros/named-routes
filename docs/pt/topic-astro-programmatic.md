# Navegação — Astro.redirect()

[Documentação](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-programmatic.md) · [Português](../pt/topic-astro-programmatic.md) · [Español](../es/topic-astro-programmatic.md) · [日本語](../ja/topic-astro-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-programmatic"></a>

No frontmatter de uma página Astro renderizada no servidor, retorne Astro.redirect com a URL pública. O framework controla a resposta; a saída estática tem semântica diferente.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## Tópicos relacionados

- [Links e navegação](topic-astro-navigation.md)
- [Base path e deploy](topic-astro-deployment.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [Links e navegação](topic-astro-navigation.md) · [Todos os tópicos](framework-astro.md) · Próximo: [Base path e deploy](topic-astro-deployment.md) →
