# route.url() — 公開 URL

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-public-url.md) · [Português](../pt/topic-public-url.md) · [Español](../es/topic-public-url.md) · [日本語](../ja/topic-public-url.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="public-url"></a>

route.url(name, { params?, query?, hash?, locale?, absolute?, basePath? }) は公開 URL を文字列で返します。必須パラメータやクエリがある場合は options が必要です。basePath: false で内部パスを返します。

Next.js、Nuxt、Vue Router、React Router、TanStack Router のナビゲーションには route() を使います。Astro、SvelteKit、手動生成ではベースを既定で付加します。公開 URL には route.url() を使います。defaults.includeBasePath と呼び出し時の basePath で変更でき、絶対 URL にはベースが含まれます。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" });

route.url("entrar"); // /entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /users/42?tab=posts
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" }, { basePath: "/app" });

route.url("entrar"); // /app/entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /app/users/42?tab=posts
```

## 関連トピック

- [route()](topic-helper-route.md)
- [ベースパス — 内部と公開 URL](topic-base-path.md)
- [route.endpoint()](topic-helper-endpoint.md)

---

← 前へ: [route()](topic-helper-route.md) · [全トピック](build-with-routes.md) · 次へ: [必須パラメータとエンコード](topic-parameters.md) →
