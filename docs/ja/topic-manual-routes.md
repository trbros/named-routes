# 手動ルート（React、Vue、任意のルーター）

[ドキュメント](index.md) / [手動ルーティング](framework-manual.md)

[English](../en/topic-manual-routes.md) · [Português](../pt/topic-manual-routes.md) · [Español](../es/topic-manual-routes.md) · [日本語](../ja/topic-manual-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="manual-routes"></a>

ルートをコードで宣言している場合（React Router の <Route>、vue-router のルート配列、Express のようなサーバー）は、createRoutes でマニフェストを自分で書きます。名前の推論、パラメーターのチェック、エンコード、query/hash、basePath、i18n はそのまま使え、手動なのは検出だけです。

パターンはルーター自身の構文にかかわらず角かっこの構文を使います。/users/:id は /users/[id]、オプションの :id? は [[id]]、splat の * は [...splat] または [[...splat]] になります。名前とパラメーターを推論させるため、オブジェクトリテラル（または as const）のまま保ってください。

createRoutes() を直接呼ぶと includeBasePath は既定で false です。手動生成ではベースを付加します。ルーターが付加する場合は defaults.includeBasePath: false に設定してください。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /users/42
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /app/users/42
```

## 関連トピック

- [createRoutes()](topic-helper-create-routes.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [検出とディレクトリ](topic-config-discovery.md)
- [明示ルートの追加](topic-config-extra-routes.md)
- [asset() / route.asset()](topic-assets.md)

---

[全トピック](framework-manual.md)
