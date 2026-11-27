# 動的エンドポイントパラメータ

[ドキュメント](index.md) / [HTTP エンドポイント](http-endpoints.md)

[English](../en/topic-endpoint-dynamic.md) · [Português](../pt/topic-endpoint-dynamic.md) · [Español](../es/topic-endpoint-dynamic.md) · [日本語](../ja/topic-endpoint-dynamic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="endpoint-dynamic"></a>

生成 api のキーは先頭の api. を除いたフラットな名前です。ドットを含むキーにはブラケットを使用します。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/api/admin/alunos/42`。

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/api/admin/alunos/42`。

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## 関連トピック

- [生成 api — HTTP ディスクリプター](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [意味的なルート名とグループ](topic-semantic-names.md)

---

← 前へ: [route.endpoint()](topic-helper-endpoint.md) · [全トピック](http-endpoints.md)
