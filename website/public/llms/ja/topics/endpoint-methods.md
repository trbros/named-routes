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
