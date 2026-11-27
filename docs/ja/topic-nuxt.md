# Nuxt: セットアップ

[ドキュメント](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt.md) · [Português](../pt/topic-nuxt.md) · [Español](../es/topic-nuxt.md) · [日本語](../ja/topic-nuxt.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt"></a>

nuxt.config の modules に "@triooo/named-routes/nuxt" を追加します。このモジュールは Nuxt 自身が解決したルート（pages:resolved フック）に名前を付けるため、definePageMeta({ path, alias }) や他のモジュールが追加したページも含まれ、nuxt dev 中にページを追加・移動・削除すると再生成します。出力はソースディレクトリ内に置き、~ エイリアスで import してください。Nuxt 4（srcDir が app/）では output を app/routes.generated.ts にして ~/routes.generated を import します。オプションは named-routes.config（CLI と共有）か nuxt.config の namedRoutes に書きます。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
export default defineNuxtConfig({
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

## 関連トピック

- [ファイル規則と検出](topic-nuxt-conventions.md)
- [リンクとナビゲーション](topic-nuxt-navigation.md)
- [インストール](topic-installation.md)
- [ジェネレーターの設定](topic-configuration.md)

---

[全トピック](framework-nuxt.md) · 次へ: [ファイル規則と検出](topic-nuxt-conventions.md) →
