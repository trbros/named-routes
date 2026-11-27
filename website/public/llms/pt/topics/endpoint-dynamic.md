# Parâmetros dinâmicos de endpoints

Topic: `endpoint-dynamic` · Named Routes v2.2.0

As chaves de api gerada são nomes planos sem o prefixo api. Uma chave com pontos ou caracteres especiais usa colchetes. No modo por caminho, /api/admin/alunos/[aluno] vira api.admin.alunos.$aluno no manifesto e admin.alunos.$aluno no export api.

## Sem base path

URL no navegador: `/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## Com base path

URL no navegador: `/app/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

Related topic IDs: endpoint-methods, helper-endpoint, semantic-names
