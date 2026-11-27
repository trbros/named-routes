# Vue Router: セットアップ

[ドキュメント](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue.md) · [Português](../pt/topic-vue.md) · [Español](../es/topic-vue.md) · [日本語](../ja/topic-vue.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue"></a>

ファイルベースルーティング（Vue Router 5 の vue-router/vite、または Vue Router 4 の unplugin-vue-router）を使う Vue アプリでは、vite.config で VueRouter() と vue() の前に namedRoutes() を追加します。users/_parent.vue は Vue Router 5.0.3+ と同じく、users/ のマッチしない親として扱われます。フレームワークは unplugin-vue-router または vue-router から検出され、routesDir を指定しない限り src/pages を読み取ります。ルートの配列を手書きしているアプリは、手書きのマニフェストを使ってください。

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## 関連トピック

- [ファイル規則と検出](topic-vue-conventions.md)
- [リンクとナビゲーション](topic-vue-navigation.md)
- [インストール](topic-installation.md)
- [ジェネレーターの設定](topic-configuration.md)

---

[全トピック](framework-vue.md) · 次へ: [ファイル規則と検出](topic-vue-conventions.md) →
