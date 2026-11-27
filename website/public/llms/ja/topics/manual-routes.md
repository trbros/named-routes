# 手動ルート（React、Vue、任意のルーター）

Topic: `manual-routes` · Named Routes v2.2.0

ルートをコードで宣言している場合（React Router の <Route>、vue-router のルート配列、Express のようなサーバー）は、createRoutes でマニフェストを自分で書きます。名前の推論、パラメーターのチェック、エンコード、query/hash、basePath、i18n はそのまま使え、手動なのは検出だけです。

パターンはルーター自身の構文にかかわらず角かっこの構文を使います。/users/:id は /users/[id]、オプションの :id? は [[id]]、splat の * は [...splat] または [[...splat]] になります。名前とパラメーターを推論させるため、オブジェクトリテラル（または as const）のまま保ってください。

createRoutes() を直接呼ぶと includeBasePath は既定で false です。手動生成ではベースを付加します。ルーターが付加する場合は defaults.includeBasePath: false に設定してください。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /users/42
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: helper-create-routes, public-url, config-discovery, config-extra-routes, assets
