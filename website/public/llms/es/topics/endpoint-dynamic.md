# Parámetros dinámicos de endpoints

Topic: `endpoint-dynamic` · Named Routes v2.2.0

Las claves de api son nombres planos sin el prefijo api. Para puntos usa corchetes. /api/admin/alunos/[aluno] produce admin.alunos.$aluno en api.

## Sin base path

URL en el navegador: `/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## Con base path

URL en el navegador: `/app/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

Related topic IDs: endpoint-methods, helper-endpoint, semantic-names
