# Dynamic endpoint parameters

Topic: `endpoint-dynamic` · Named Routes v2.2.0

Generated api keys are flat names without a leading api. A key with dots or special characters uses brackets. In path naming mode /api/admin/alunos/[aluno] becomes api.admin.alunos.$aluno in the route manifest and admin.alunos.$aluno in the api export.

## Without base path

Browser URL: `/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## With base path

Browser URL: `/app/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

Related topic IDs: endpoint-methods, helper-endpoint, semantic-names
