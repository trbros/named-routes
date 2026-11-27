# 生成 api — HTTP ディスクリプター

[ドキュメント](index.md) / [HTTP エンドポイント](http-endpoints.md)

[English](../en/topic-endpoint-methods.md) · [Português](../pt/topic-endpoint-methods.md) · [Español](../es/topic-endpoint-methods.md) · [日本語](../ja/topic-endpoint-methods.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="endpoint-methods"></a>

includeApi: true を有効にすると、静的に確認できる HTTP メソッドのみ生成します。Next App Router、SvelteKit、Astro は名前付き export、Nuxt はファイル名の接尾辞を利用します。未知のメソッドは推測しません。api.admin.post() は {method, url} を返し、通信しません。

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## 関連トピック

- [API 検出の有効化](topic-config-api.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [動的エンドポイントパラメータ](topic-endpoint-dynamic.md)
- [HTTP エンドポイント](topic-nextjs-endpoints.md)
- [HTTP エンドポイント](topic-nuxt-endpoints.md)
- [HTTP エンドポイント](topic-sveltekit-endpoints.md)
- [HTTP エンドポイント](topic-astro-endpoints.md)

---

[全トピック](http-endpoints.md) · 次へ: [route.endpoint()](topic-helper-endpoint.md) →
