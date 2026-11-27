# TanStack Router: セットアップ

[ドキュメント](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router.md) · [Português](../pt/topic-tanstack-router.md) · [Español](../es/topic-tanstack-router.md) · [日本語](../ja/topic-tanstack-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router"></a>

vite.config で @tanstack/router-plugin の tanstackRouter() と並べて namedRoutes() を追加します。プラグインは src/routes（または app/routes）を読み取り、デフォルトではルートフォルダーの外にある src/routes.generated.ts に書き出すので、生成ファイルがルートになることはありません。

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## 関連トピック

- [ファイル規則と検出](topic-tanstack-router-conventions.md)
- [リンクとナビゲーション](topic-tanstack-router-navigation.md)
- [インストール](topic-installation.md)
- [ジェネレーターの設定](topic-configuration.md)

---

[全トピック](framework-tanstack-router.md) · 次へ: [ファイル規則と検出](topic-tanstack-router-conventions.md) →
