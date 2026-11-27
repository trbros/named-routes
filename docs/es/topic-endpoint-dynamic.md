# Parámetros dinámicos de endpoints

[Documentación](index.md) / [Endpoints HTTP](http-endpoints.md)

[English](../en/topic-endpoint-dynamic.md) · [Português](../pt/topic-endpoint-dynamic.md) · [Español](../es/topic-endpoint-dynamic.md) · [日本語](../ja/topic-endpoint-dynamic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="endpoint-dynamic"></a>

Las claves de api son nombres planos sin el prefijo api. Para puntos usa corchetes. /api/admin/alunos/[aluno] produce admin.alunos.$aluno en api.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## Temas relacionados

- [api generada — descriptores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Nombres semánticos y grupos](topic-semantic-names.md)

---

← Anterior: [route.endpoint()](topic-helper-endpoint.md) · [Todos los temas](http-endpoints.md)
