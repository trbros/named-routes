# TanStack Router

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
---

# ファイル規則と検出

Topic: `tanstack-router-conventions` · Named Routes v2.2.0

`src/routes/users/$id.tsx` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** __root はスキップ。index と route.tsx はそのフォルダーのルート。フラットなファイル（posts.$postId.tsx）とフォルダーを併用できる。$param。{-$locale} はオプション（[[locale]]）。prefix{$id}suffix は混在セグメントになる。単独の $ は _splat という名前の splat（[[..._splat]]）。_layout はパスなし。posts_ はネストを解除。- で始まるファイルと (group) フォルダーは無視され、.lazy ファイルは同じルートに属します。

**検証済み。** 名前は TanStack Router のプラグインまたは CLI が生成する routeTree.gen.ts（遷移可能なパス）から取ります。このファイルができるまではファイルを走査します。規約テストと、TanStack Router プラグインでビルドして実行する examples/tanstack-router で検証しています。

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# リンクとナビゲーション

Topic: `tanstack-router-navigation` · Named Routes v2.2.0

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

**使いどころ。** TanStack Router は自前の <Link to> をルート ID で型付けしています。route() は普通の文字列が必要な場面で使ってください。<a href>、ほかのアプリへのリダイレクト、メール、サイトマップ、アナリティクス、言語プレフィックス付きの URL、モノレポでほかのフレームワークと共有する名前などです。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, tanstack-router-programmatic
---

# ナビゲーション — window.location.assign()

Topic: `tanstack-router-programmatic` · Named Routes v2.2.0

ページ全体の遷移用です。SPA では TanStack の型付き navigate/Link に固有 ID と params を渡します。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

Related topic IDs: tanstack-router-navigation, tanstack-router-deployment, public-url
---

# ベースパスとデプロイ

Topic: `tanstack-router-deployment` · Named Routes v2.2.0

TanStack Router で `basepath` を設定します。route() は内部パスを返し、route.url() は公開パスを返します。

namedRoutes({ routerBase: "/app" }) に同じプレフィックスを設定します。Vite base がルーターのベースと同じ場合のみ inheritViteBase: true を使用できます。

既存ルーターで createRouter({ routeTree, basepath: "/app" }) を使い、ネイティブ Link には固有 ID を渡します。

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

Topic: `tanstack-router-assets` · Named Routes v2.2.0

`public/images/logo.svg` にファイルを置き、生成モジュールから asset を import します。ベース /app の場合 /app/images/logo.svg が返ります。CDN は独立設定です。

## ベースパスなし

公開ファイルの URL: `/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## ベースパスあり

公開ファイルの URL: `/app/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# 多言語リンク

Topic: `tanstack-router-i18n` · Named Routes v2.2.0

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

Topic: `tanstack-router-endpoints` · Named Routes v2.2.0

TanStack Router のクライアントルートは HTTP メソッドの契約ではありません。API または OpenAPI クライアントを利用し、既知の URL には route.url() を使います。

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
