# Parâmetros dinâmicos de endpoints

[Documentação](index.md) / [Endpoints HTTP](http-endpoints.md)

[English](../en/topic-endpoint-dynamic.md) · [Português](../pt/topic-endpoint-dynamic.md) · [Español](../es/topic-endpoint-dynamic.md) · [日本語](../ja/topic-endpoint-dynamic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="endpoint-dynamic"></a>

As chaves de api gerada são nomes planos sem o prefixo api. Uma chave com pontos ou caracteres especiais usa colchetes. No modo por caminho, /api/admin/alunos/[aluno] vira api.admin.alunos.$aluno no manifesto e admin.alunos.$aluno no export api.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## Tópicos relacionados

- [api gerada — descritores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Nomes semânticos e grupos](topic-semantic-names.md)

---

← Anterior: [route.endpoint()](topic-helper-endpoint.md) · [Todos os tópicos](http-endpoints.md)
