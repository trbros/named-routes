# route()

Topic: `helper-route` · Named Routes v2.2.0

route(name, params?, options?) は URL を返し、遷移しません。必須パラメータは型と実行時に検証されます。公開 URL には route.url() を使用します。

Next.js、Nuxt、Vue Router、React Router、TanStack Router のナビゲーションには route() を使います。Astro、SvelteKit、手動生成ではベースを既定で付加します。公開 URL には route.url() を使います。defaults.includeBasePath と呼び出し時の basePath で変更でき、絶対 URL にはベースが含まれます。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

Related topic IDs: public-url, parameters, query-hash, base-path
