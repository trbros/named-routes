# Links e navegação

[Documentação](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-navigation.md) · [Português](../pt/topic-nextjs-navigation.md) · [Español](../es/topic-nextjs-navigation.md) · [日本語](../ja/topic-nextjs-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-navigation"></a>

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

## Tópicos relacionados

- [route()](topic-helper-route.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [Convenções de arquivos e descoberta](topic-nextjs-conventions.md) · [Todos os tópicos](framework-nextjs.md) · Próximo: [Base path e deploy](topic-nextjs-deployment.md) →
