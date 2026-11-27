# route()

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-helper-route.md) · [Português](../pt/topic-helper-route.md) · [Español](../es/topic-helper-route.md) · [日本語](../ja/topic-helper-route.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-route"></a>

route(name, params?, options?) は URL を返し、遷移しません。必須パラメータは型と実行時に検証されます。公開 URL には route.url() を使用します。

Next.js、Nuxt、Vue Router、React Router、TanStack Router のナビゲーションには route() を使います。Astro、SvelteKit、手動生成ではベースを既定で付加します。公開 URL には route.url() を使います。defaults.includeBasePath と呼び出し時の basePath で変更でき、絶対 URL にはベースが含まれます。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

## 関連トピック

- [route.url() — 公開 URL](topic-public-url.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [クエリ文字列](topic-query-hash.md)
- [ベースパス — 内部と公開 URL](topic-base-path.md)

---

[全トピック](build-with-routes.md) · 次へ: [route.url() — 公開 URL](topic-public-url.md) →
