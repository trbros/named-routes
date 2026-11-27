# React Router / Remix: セットアップ

[ドキュメント](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router.md) · [Português](../pt/topic-react-router.md) · [Español](../es/topic-react-router.md) · [日本語](../ja/topic-react-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router"></a>

React Router 7・8 のフレームワークモード（と Remix v2）では、vite.config で reactRouter() より前に namedRoutes() を追加します。名前はフレームワーク自身が app/routes.ts を解決した結果である react-router routes --json から取るため、flatRoutes() のファイルも、route()、index()、layout()、prefix() で宣言したルートもすべて検出されます。出力は app/routes の外の app/routes.generated.ts がおすすめです。

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## 関連トピック

- [ファイル規則と検出](topic-react-router-conventions.md)
- [リンクとナビゲーション](topic-react-router-navigation.md)
- [インストール](topic-installation.md)
- [ジェネレーターの設定](topic-configuration.md)

---

[全トピック](framework-react-router.md) · 次へ: [ファイル規則と検出](topic-react-router-conventions.md) →
