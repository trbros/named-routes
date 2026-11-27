# Vue Router

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
---

# ファイル規則と検出

Topic: `vue-conventions` · Named Routes v2.2.0

`src/pages/users/[id].vue` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** index.vue と (name).vue はインデックスルート。ドットでネスト（users.edit.vue は /users/edit）。[id] と [[id]]。[id]+ は 1 個以上の繰り返しパラメーター（[...id]）、[[id]]+ は 0 個以上（[[...id]]）。[...path] は空の残りにも一致（[[...path]]）。(group) フォルダーは省かれ、parent.vue + parent/ のネストはまとめられ、v[major]-[minor] のような混在セグメントも使えます。

**検証済み。** 名前は Vue Router 5 が書き出す typed-router.d.ts（dts オプション）から取るため、definePage({ path }) で上書きしたルートは実際に配信する URL で名前が付きます。このファイルができるまではファイルを走査します。これらの規約を使う実際の Vite 開発サーバーを CI で動かし、examples/vue を Vue Router 5（vue-router/vite）でビルド・実行してブラウザーで操作しています。users/_parent.vue のレイアウトと definePage({ path }) のページも含みます。

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# リンクとナビゲーション

Topic: `vue-navigation` · Named Routes v2.2.0

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, vue-programmatic
---

# ナビゲーション — router.push()

Topic: `vue-programmatic` · Named Routes v2.2.0

コンポーネントやイベント内で使用します。Named Routes はパスを構築し、ネイティブ関数が遷移を実行します。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

Related topic IDs: vue-navigation, vue-deployment, public-url
---

# ベースパスとデプロイ

Topic: `vue-deployment` · Named Routes v2.2.0

Vue Router で `history base` を設定します。route() は内部パスを返し、route.url() は公開パスを返します。

namedRoutes({ routerBase: "/app" }) に同じプレフィックスを設定します。Vite base がルーターのベースと同じ場合のみ inheritViteBase: true を使用できます。

src/main.ts で createWebHistory(import.meta.env.BASE_URL) を設定します。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# 公開アセット

Topic: `vue-assets` · Named Routes v2.2.0

`public/images/logo.svg` にファイルを置き、生成モジュールから asset を import します。ベース /app の場合 /app/images/logo.svg が返ります。CDN は独立設定です。

## ベースパスなし

公開ファイルの URL: `/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## ベースパスあり

公開ファイルの URL: `/app/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# 多言語リンク

Topic: `vue-i18n` · Named Routes v2.2.0

named-routes.config で locales と pathnames を設定します。言語選択はフレームワークが担当します。公開 URL には locale 付き route.url を使い、プレフィックスを二重付与しないでください。

## ベースパスなし

ブラウザーの URL: `/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## ベースパスあり

ブラウザーの URL: `/app/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# HTTP の境界

Topic: `vue-endpoints` · Named Routes v2.2.0

Vue Router のクライアントルートは HTTP メソッドの契約ではありません。API または OpenAPI クライアントを利用し、既知の URL には route.url() を使います。

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
