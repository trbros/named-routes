# React Router / Remix

# React Router / Remix: セットアップ

Topic: `react-router` · Named Routes v2.2.0

React Router 7・8 のフレームワークモード（と Remix v2）では、vite.config で reactRouter() より前に namedRoutes() を追加します。名前はフレームワーク自身が app/routes.ts を解決した結果である react-router routes --json から取るため、flatRoutes() のファイルも、route()、index()、layout()、prefix() で宣言したルートもすべて検出されます。出力は app/routes の外の app/routes.generated.ts がおすすめです。

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

Related topic IDs: react-router-conventions, react-router-navigation, installation, configuration
---

# ファイル規則と検出

Topic: `react-router-conventions` · Named Routes v2.2.0

`app/routes/users.$id.tsx` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** ドットでネスト（concerts.$city.tsx は /concerts/[city]）。_index はインデックス。$param。($lang) はオプション（[[lang]]）。単独の $ は splat という名前の splat（[[...splat]]）。_auth のように _ で始まるものはパスなしレイアウト。concerts_ はネストを解除。[.] エスケープは文字をそのまま残す。route.tsx を含むフォルダーはひとつのルートで、それより深いフォルダーは無視されます。レイアウトとその _index は同じ URL を共有し、まとめられます。

**制限と検証。** @react-router/dev が入っていない場合やコマンドが失敗した場合は、上記の flat routes のファイルを走査し、CLI が理由を表示します。(beta) のような省略可能な静的セグメントには名前を付けられません。ジェネレーターは明確なエラーで止まるので、そのファイルを除外してください。規約テストと、React Router 8 でビルドして実行する examples/react-router（app/routes.ts の route() で宣言したルートを含む）で検証しています。

```text
app/routes/users.$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# リンクとナビゲーション

Topic: `react-router-navigation` · Named Routes v2.2.0

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, react-router-programmatic
---

# ナビゲーション — useNavigate()

Topic: `react-router-programmatic` · Named Routes v2.2.0

コンポーネントやイベント内で使用します。Named Routes はパスを構築し、ネイティブ関数が遷移を実行します。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

Related topic IDs: react-router-navigation, react-router-deployment, public-url
---

# ベースパスとデプロイ

Topic: `react-router-deployment` · Named Routes v2.2.0

React Router / Remix で `basename` を設定します。route() は内部パスを返し、route.url() は公開パスを返します。

namedRoutes({ routerBase: "/app" }) に同じプレフィックスを設定します。Vite base がルーターのベースと同じ場合のみ inheritViteBase: true を使用できます。

react-router.config.ts で basename: "/app" を設定します。Remix では対応する設定を使用します。

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

Topic: `react-router-assets` · Named Routes v2.2.0

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

Topic: `react-router-i18n` · Named Routes v2.2.0

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

Topic: `react-router-endpoints` · Named Routes v2.2.0

React Router / Remix のクライアントルートは HTTP メソッドの契約ではありません。API または OpenAPI クライアントを利用し、既知の URL には route.url() を使います。

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
