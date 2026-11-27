# Dynamic endpoint parameters

[Documentation](index.md) / [HTTP endpoints](http-endpoints.md)

[English](../en/topic-endpoint-dynamic.md) · [Português](../pt/topic-endpoint-dynamic.md) · [Español](../es/topic-endpoint-dynamic.md) · [日本語](../ja/topic-endpoint-dynamic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="endpoint-dynamic"></a>

Generated api keys are flat names without a leading api. A key with dots or special characters uses brackets. In path naming mode /api/admin/alunos/[aluno] becomes api.admin.alunos.$aluno in the route manifest and admin.alunos.$aluno in the api export.

<a id="without-base"></a>
## Without base path

Browser URL: `/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## Related topics

- [Generated api — HTTP descriptors](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Semantic route names and groups](topic-semantic-names.md)

---

← Previous: [route.endpoint()](topic-helper-endpoint.md) · [All topics](http-endpoints.md)
