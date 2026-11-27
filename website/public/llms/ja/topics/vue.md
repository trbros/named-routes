# Vue Router: セットアップ

Topic: `vue` · Named Routes v2.2.0

ファイルベースルーティング（Vue Router 5 の vue-router/vite、または Vue Router 4 の unplugin-vue-router）を使う Vue アプリでは、vite.config で VueRouter() と vue() の前に namedRoutes() を追加します。users/_parent.vue は Vue Router 5.0.3+ と同じく、users/ のマッチしない親として扱われます。フレームワークは unplugin-vue-router または vue-router から検出され、routesDir を指定しない限り src/pages を読み取ります。ルートの配列を手書きしているアプリは、手書きのマニフェストを使ってください。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { defineConfig } from "vite";
import VueRouter from "vue-router/vite";
import vue from "@vitejs/plugin-vue";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes(), VueRouter(), vue()],
});
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。 src/main.ts で createWebHistory(import.meta.env.BASE_URL) を使います。

```ts
import { defineConfig } from "vite";
import VueRouter from "vue-router/vite";
import vue from "@vitejs/plugin-vue";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [namedRoutes({ inheritViteBase: true }), VueRouter(), vue()],
});
```

Related topic IDs: vue-conventions, vue-navigation, installation, configuration
