# React Router / Remix: セットアップ

Topic: `react-router` · Named Routes v2.2.0

React Router 7・8 のフレームワークモード（と Remix v2）では、vite.config で reactRouter() より前に namedRoutes() を追加します。名前はフレームワーク自身が app/routes.ts を解決した結果である react-router routes --json から取るため、flatRoutes() のファイルも、route()、index()、layout()、prefix() で宣言したルートもすべて検出されます。出力は app/routes の外の app/routes.generated.ts がおすすめです。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。 react-router.config.ts で basename: "/app" を指定します。Remix では対応設定を使用します。

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ routerBase: "/app", output: "app/routes.generated.ts" }), reactRouter()],
});
```

Related topic IDs: react-router-conventions, react-router-navigation, installation, configuration
