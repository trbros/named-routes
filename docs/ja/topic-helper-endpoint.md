# route.endpoint()

[ドキュメント](index.md) / [HTTP エンドポイント](http-endpoints.md)

[English](../en/topic-helper-endpoint.md) · [Português](../pt/topic-helper-endpoint.md) · [Español](../es/topic-helper-endpoint.md) · [日本語](../ja/topic-helper-endpoint.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-endpoint"></a>

既知のルートに明示的な HTTP メソッドを関連付けます。戻り値はメソッドと URL のディスクリプターで、通信しません。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/api/users/42" }
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" }, { basePath: "/app" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/app/api/users/42" }
```

## 関連トピック

- [生成 api — HTTP ディスクリプター](topic-endpoint-methods.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [生成 api — HTTP ディスクリプター](topic-endpoint-methods.md) · [全トピック](http-endpoints.md) · 次へ: [動的エンドポイントパラメータ](topic-endpoint-dynamic.md) →
