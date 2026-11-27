# 動的エンドポイントパラメータ

Topic: `endpoint-dynamic` · Named Routes v2.2.0

生成 api のキーは先頭の api. を除いたフラットな名前です。ドットを含むキーにはブラケットを使用します。

## ベースパスなし

ブラウザーの URL: `/api/admin/alunos/42`。

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## ベースパスあり

ブラウザーの URL: `/app/api/admin/alunos/42`。

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

Related topic IDs: endpoint-methods, helper-endpoint, semantic-names
