# route.match()

Topic: `helper-match` · Named Routes v2.2.0

`route.match(url, options?)` は既知のパスを認識し、name、pattern、params、locale、生の query を含む判別可能な結果、または null を返します。base を含む入力には `{ basePath: true }` を使います。ルート名でパラメーター型を絞り込めます。スキーマによる変換には parseQuery を使います。認可には使えません。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

Related topic IDs: helper-is, helper-breadcrumbs, helper-parse-query
