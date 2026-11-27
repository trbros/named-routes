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
