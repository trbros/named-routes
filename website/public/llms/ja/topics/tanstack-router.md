# TanStack Router: セットアップ

Topic: `tanstack-router` · Named Routes v2.2.0

vite.config で @tanstack/router-plugin の tanstackRouter() と並べて namedRoutes() を追加します。プラグインは src/routes（または app/routes）を読み取り、デフォルトではルートフォルダーの外にある src/routes.generated.ts に書き出すので、生成ファイルがルートになることはありません。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react" }), namedRoutes(), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。 既存ルーターで createRouter({ routeTree, basepath: "/app" }) を使います。

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [tanstackRouter({ target: "react" }), namedRoutes({ routerBase: "/app" }), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

Related topic IDs: tanstack-router-conventions, tanstack-router-navigation, installation, configuration
