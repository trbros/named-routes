# Nuxt

# Nuxt: セットアップ

Topic: `nuxt` · Named Routes v2.2.0

nuxt.config の modules に "@triooo/named-routes/nuxt" を追加します。このモジュールは Nuxt 自身が解決したルート（pages:resolved フック）に名前を付けるため、definePageMeta({ path, alias }) や他のモジュールが追加したページも含まれ、nuxt dev 中にページを追加・移動・削除すると再生成します。出力はソースディレクトリ内に置き、~ エイリアスで import してください。Nuxt 4（srcDir が app/）では output を app/routes.generated.ts にして ~/routes.generated を import します。オプションは named-routes.config（CLI と共有）か nuxt.config の namedRoutes に書きます。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
export default defineNuxtConfig({
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

Related topic IDs: nuxt-conventions, nuxt-navigation, installation, configuration
---

# ファイル規則と検出

Topic: `nuxt-conventions` · Named Routes v2.2.0

`app/pages/users/[id].vue` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** app/pages または pages: index.vue、[id]、オプションの [[id]]、[...slug]（空の残りにも一致するため [[...slug]] になる）、(group) フォルダー、v[major]-[minor] のような混在セグメント、ひとつのルートにまとめられる parent.vue + parent/ のネスト。- で始まるファイルは無視されます。includeApi を有効にすると、server/api（/api 付き）と server/routes を読み取り、.get/.post の接尾辞を取り除きます。

**制限と検証。** モジュールは .nuxt/named-routes/pages.json も書き出すため、nuxt prepare の後は named-routes check や generate も同じルートを見ます。ルートがローカライズされる前に見えるよう、modules では @nuxtjs/i18n より前に置いてください。Nuxt でも Vite プラグインは動きますが、ファイルしか見えません。名前はこのパッケージのドット区切り（users.$id）で、Nuxt 自身のルート名（users-id）ではありません。規約テストと、Nuxt 4 でビルドして実行する examples/nuxt（definePageMeta({ path }) のページを含む）で検証しています。

```text
app/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# リンクとナビゲーション

Topic: `nuxt-navigation` · Named Routes v2.2.0

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, nuxt-programmatic
---

# ナビゲーション — navigateTo()

Topic: `nuxt-programmatic` · Named Routes v2.2.0

コンポーネントやイベント内で使用します。Named Routes はパスを構築し、ネイティブ関数が遷移を実行します。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

Related topic IDs: nuxt-navigation, nuxt-deployment, public-url
---

# ベースパスとデプロイ

Topic: `nuxt-deployment` · Named Routes v2.2.0

Nuxt で `app.baseURL` を設定します。route() は内部パスを返し、route.url() は公開パスを返します。

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

Topic: `nuxt-assets` · Named Routes v2.2.0

`public/images/logo.svg` にファイルを置き、生成モジュールから asset を import します。ベース /app の場合 /app/images/logo.svg が返ります。CDN は独立設定です。

## ベースパスなし

公開ファイルの URL: `/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## ベースパスあり

公開ファイルの URL: `/app/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# 多言語リンク

Topic: `nuxt-i18n` · Named Routes v2.2.0

named-routes.config で locales と pathnames を設定します。言語選択はフレームワークが担当します。公開 URL には locale 付き route.url を使い、プレフィックスを二重付与しないでください。

**ナビゲーションと i18n。** URL は NuxtLink の :to、navigateTo、useRouter().push で使います。@nuxtjs/i18n を使う場合は、ここでも同じ言語を設定してください。戦略 prefix_except_default は localePrefix の as-needed、prefix（または prefix_and_default）は always、no_prefix は never に対応します。すると route(name, params, { locale }) がローカライズされた URL を返し、locale を省くと localePath() に渡す内部パスが得られます。defineI18nRoute で翻訳したパスは i18n.pathnames にも書く必要があります。

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

# HTTP エンドポイント

Topic: `nuxt-endpoints` · Named Routes v2.2.0

includeApi: true を有効にし、`server/api/admin.get.ts` を作成します。明示的に検出できるメソッドのみ生成されます。通信には fetch または既存の HTTP クライアントを使います。

```ts
export default defineEventHandler(() => ({ ok: true }));
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
