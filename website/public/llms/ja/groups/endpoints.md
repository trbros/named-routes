# HTTP エンドポイント

# 生成 api — HTTP ディスクリプター

Topic: `endpoint-methods` · Named Routes v2.2.0

includeApi: true を有効にすると、静的に確認できる HTTP メソッドのみ生成します。Next App Router、SvelteKit、Astro は名前付き export、Nuxt はファイル名の接尾辞を利用します。未知のメソッドは推測しません。api.admin.post() は {method, url} を返し、通信しません。

## ベースパスなし

ブラウザーの URL: `/api/admin`。

```ts
// app/api/admin/route.ts exports GET and POST; includeApi: true
// In a separate consumer module:
import { api } from "@/routes.generated";

const { method, url } = api.admin.post();
await fetch(url, { method, body: JSON.stringify({ name: "Ana" }),
  headers: { "Content-Type": "application/json" } });
```

## ベースパスあり

ブラウザーの URL: `/app/api/admin`。

```ts
// app/api/admin/route.ts exports GET and POST; includeApi: true
// In a separate consumer module:
import { api } from "@/routes.generated";

const { method, url } = api.admin.post();
await fetch(url, { method, body: JSON.stringify({ name: "Ana" }),
  headers: { "Content-Type": "application/json" } });
```

Related topic IDs: config-api, helper-endpoint, endpoint-dynamic, nextjs-endpoints, nuxt-endpoints, sveltekit-endpoints, astro-endpoints
---

# route.endpoint()

Topic: `helper-endpoint` · Named Routes v2.2.0

既知のルートに明示的な HTTP メソッドを関連付けます。戻り値はメソッドと URL のディスクリプターで、通信しません。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/api/users/42" }
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" }, { basePath: "/app" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/app/api/users/42" }
```

Related topic IDs: endpoint-methods, public-url
---

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
