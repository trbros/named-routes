# @triooo/named-routes

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

**v2.1.0** · [ローカルインストールガイド（ポルトガル語）](LOCAL-DEVELOPMENT.pt-BR.md)

## 目次

- [このパッケージでできること](#overview)
- [インストール](#installation)
- [Next.js の初回セットアップ](#quick-start)
- [ほかのフレームワーク（Vite プラグイン）](#frameworks)
- [自動命名のルール](#naming)
- [ドキュメント](#documentation)

<a id="overview"></a>

## このパッケージでできること

Triooo Named Routes は、フレームワークがすでにルーティングしているページを検出し、型付きの URL ヘルパーを生成します。ページを作り、route をインポートし、推論された名前で移動するだけです。信頼できる情報源は、これまでどおりファイルシステムです。

Next.js は withNamedRoutes、Nuxt はネイティブモジュール、Astro はネイティブ統合を使用します。ファイルベースの Vue Router、SvelteKit、React Router/Remix、TanStack Router は Vite プラグインを使用します。手動ルーターは手書きマニフェストで同じ型付きランタイムを使えます。

どのフレームワークもひとつのパターン構文とひとつの命名規則に変換されるため、app/users/[user]/page.tsx、pages/users/[user].vue、src/routes/users/[user]/+page.svelte、app/routes/users.$user.tsx はすべて users.$user になります。言語付き URL（next-intl、Pages Router の i18n、@nuxtjs/i18n など）は v1 から対応しています。

URL のランタイムはブラウザーで動作し、フレームワークや Node.js を import しません。Node 専用のジェネレーターはファイルパスを読むだけで、ページを実行することはありません。ツールには Node.js 22.12 以上、型には TypeScript 5.4 以上が必要です。examples/ のすべての例を、パッケージ化した tarball からインストールし、ビルドして配信し、CI の実ブラウザーで操作して確認しています。

2.0 からは、フレームワークがルート表を公開している場合（Nuxt、Vue Router 5、React Router、TanStack Router）はその表を使うため、definePageMeta({ path }) や app/routes.ts の route() のようにコードで宣言したパスにも名前が付きます。route() はデフォルトで型付き href を返します。

```ts
// Next.js   app/users/[user]/page.tsx          → users.$user
// Nuxt      pages/users/[user].vue             → users.$user
// SvelteKit src/routes/users/[user]/+page.svelte → users.$user
// Remix/RR  app/routes/users.$user.tsx         → users.$user
route("users.$user", { user: 42 });                    // /users/42
route("users.$user", { user: 42 }, { locale: "pt" });  // /pt/users/42
```

<a id="installation"></a>

## インストール

お好みのパッケージマネージャーでインストールしてください。ランタイム依存はありません。ジェネレーターには Node.js 22.12 以上が必要です。

一度だけ接続します。next.config の withNamedRoutes、Nuxt の modules に @triooo/named-routes/nuxt、Astro の integrations に @triooo/named-routes/astro、その他の Vite フレームワークには @triooo/named-routes/vite の namedRoutes() を使用します。単独 CLI は npx @triooo/named-routes generate です。

```sh
npm install @triooo/named-routes
# pnpm
pnpm add @triooo/named-routes
# Yarn
yarn add @triooo/named-routes
# Bun
bun add @triooo/named-routes
```

<a id="quick-start"></a>

## Next.js の初回セットアップ

既存の Next の設定を一度ラップするだけです。ルート表、ページへの注釈、別の watcher コマンドは不要です。設定オブジェクト、Promise、非同期の設定関数に対応しています。

生成されるモジュールはデフォルトで src/routes.generated.ts にあり、routes、route、RouteName をエクスポートします。dev/build の開始前に作られます。生成されたヘルパーは Server Components、Client Components、Pages Router のコードから使えます。

下の @/routes.generated というインポートエイリアスは、@/* が src/* を指している前提です。エイリアスがプロジェクトのルートを指す場合は @/src/routes.generated か相対インポートを使ってください。Next の設定は next.config.mjs のままでも next.config.ts でもかまいません。

**ベースパス。** Next.js の basePath は自動的に取得され、名前や内部パスは変わりません。完全な公開パスが必要な場合にだけ basePath: true を指定します。

```ts
// next.config.ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({ basePath: "/app" });

// In your application:
import { route } from "@/routes.generated";
route("user.profile"); // /user/profile (Next Link)
route("users.$user", { user: "ana" }); // /users/ana
route("users.$user", { user: "ana" }, { basePath: true }); // /app/users/ana
```

<a id="frameworks"></a>

## ほかのフレームワーク（Vite プラグイン）

Vue、SvelteKit、React Router/Remix、TanStack Router では @triooo/named-routes/vite の namedRoutes() を使います。Nuxt の modules には @triooo/named-routes/nuxt、Astro の integrations には @triooo/named-routes/astro のデフォルト import を登録します。起動・ビルド時に生成し、ルートやフレームワークの生成物の変更時に更新します。

フレームワークは package.json から検出されます（nuxt、next、@sveltejs/kit、astro、@react-router/dev または @remix-run/dev、TanStack Router のプラグイン/CLI/Start、unplugin-vue-router または vue-router）。モノレポや検出があいまいな場合は framework を明示してください。npx @triooo/named-routes init を実行すると、検出したフレームワーク用の設定ファイルを作れます。

各規約はランタイムの構文に変換されます。Nuxt と Vue: index、[id]、オプションの [[id]]、[...slug]（空の残りにも一致するため [[...slug]] になる）、(group) フォルダー、parent.vue + parent/ のネスト、v[major]-[minor] のような混在セグメント。Vue ではドットもネストとして扱い（users.edit.vue）、繰り返しパラメーター [id]+ に対応します。Nuxt は - で始まるファイルを無視し、includeApi を有効にすると server/api（/api 付き）と server/routes を読み取り、.get/.post の接尾辞を取り除きます。

SvelteKit: +page.* ファイル、[id=matcher]（matcher は捨てる）、[[lang]]、[...rest]（0 個以上のセグメント）、(group)、[x+2f] エスケープ、includeApi 時の +server エンドポイント。Astro: .astro/.md/.mdx/.html を含む src/pages、_ で始まるファイルは無視、[...slug] の rest パラメーター、includeApi 時の .ts/.js エンドポイント。

React Router / Remix の flat routes（app/routes）: ドットでネスト、_index、$param、($optional)、splat の $（名前は splat）、_ で始まるパスなしレイアウト、name_ によるネスト解除、[.] エスケープ、フォルダー/route.tsx モジュール。TanStack Router（src/routes）: フラットなファイルとフォルダーの併用、index/route、$param、{-$optional}、prefix{$param}、splat の $（名前は _splat）、_layout、- で始まる無視ファイル、(group)、.lazy ファイル。(beta) のようなオプションの静的セグメントには名前を付けられないため、ファイルを除外するか extraRoutes を使ってください。

フレームワークによる検出（2.0 からのデフォルト）：フレームワークが最終的なルート表を公式に公開している場合は、その表から名前を付けるため、コードで宣言したパスも含まれます。Nuxt はモジュールが pages:resolved（definePageMeta の path と alias、モジュールが追加したページ）を読みます。Vue Router 5 は生成される typed-router.d.ts（definePage の path）、React Router は react-router routes --json（app/routes.ts の route()、index()、layout()、prefix()）、TanStack Router は routeTree.gen.ts です。あなたのコードを実行したり解析したりはしません。フレームワークが表を書き出すまでは上記のファイル規約を使い、CLI がその旨を表示します。discovery: "files" で 1.x のスキャナーを使い続けられます。Next.js、SvelteKit、Astro はコードでルートを宣言できないため、ファイルがソースです。

```ts
// vite.config.ts (Vue, SvelteKit, React Router, TanStack Router)
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({ plugins: [namedRoutes({ routerBase: "/app" })] });
// Configure the same navigation base in the router itself.

// nuxt.config.ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});

// astro.config.mjs
import { defineConfig as defineAstroConfig } from "astro/config";
import namedRoutesAstro from "@triooo/named-routes/astro";
export default defineAstroConfig({
  base: "/app",
  integrations: [namedRoutesAstro()],
});

// Any component (adjust the import to your configured output):
import { route } from "@/routes.generated";
route("users.$id", { id: 42 }); // internal path
route("users.$id", { id: 42 }, { basePath: true }); // /app/users/42
```

<a id="naming"></a>

## 自動命名のルール

URL の静的セグメントはドットで連結されます。動的、オプション、catch-all、オプションの catch-all のパラメーターは $ の後にパラメーター名を付けます。v[major]-[minor] のような混在セグメントは v$major-$minor になります。ルートページは home です。ドル記号によって、動的パラメーターと文字どおりのセグメントを区別します。

フレームワークのファイル名（page.tsx、index、+page.svelte、_index、route.tsx）は名前のセグメントになりません。ルートグループ、並列スロット、パスなしレイアウトは省かれます。ページを作成・移動・削除すると推論される公開名も変わりますが、任意のエイリアスを使えば URL が変わっても名前を固定できます。

スタイルは naming で設定できます。separator（デフォルトは "."）、paramPrefix（デフォルトは "$"、空にもできる）、home（デフォルトは "home"）です。JavaScript や TypeScript の設定では、naming.transform(route) で任意の自動ルートに別の名前を返せます。

```text
App Router                           Pages Router                     Name
app/page.tsx                         pages/index.tsx                  home
app/user/page.tsx                    pages/user/index.tsx             user
app/user/profile/page.tsx            pages/user/profile.tsx           user.profile
app/users/[user]/page.tsx            pages/users/[user].tsx           users.$user
app/docs/[...slug]/page.tsx          pages/docs/[...slug].tsx          docs.$slug
app/shop/[[...path]]/page.tsx        pages/shop/[[...path]].tsx        shop.$path
```

<a id="documentation"></a>

## ドキュメント

**[はじめに](docs/ja/getting-started.md)** — [このパッケージでできること](docs/ja/getting-started.md#overview) · [ほかの選択肢との比較](docs/ja/getting-started.md#comparison) · [インストール](docs/ja/getting-started.md#installation) · [Next.js の初回セットアップ](docs/ja/getting-started.md#quick-start) · [自動命名のルール](docs/ja/getting-started.md#naming)

**[フレームワーク](docs/ja/frameworks.md)** — [ほかのフレームワーク（Vite プラグイン）](docs/ja/frameworks.md#frameworks) · [Next.js](docs/ja/frameworks.md#nextjs) · [Nuxt](docs/ja/frameworks.md#nuxt) · [Vue Router](docs/ja/frameworks.md#vue) · [SvelteKit](docs/ja/frameworks.md#sveltekit) · [Astro](docs/ja/frameworks.md#astro) · [React Router / Remix](docs/ja/frameworks.md#react-router) · [TanStack Router](docs/ja/frameworks.md#tanstack-router) · [手動ルート（React、Vue、任意のルーター）](docs/ja/frameworks.md#manual-routes)

**[ルートで構築する](docs/ja/build-with-routes.md)** — [App Router のレシピ](docs/ja/build-with-routes.md#app-router) · [Pages Router のレシピ](docs/ja/build-with-routes.md#pages-router) · [パラメーターとエンコード](docs/ja/build-with-routes.md#parameters) · [クエリ文字列とフラグメント](docs/ja/build-with-routes.md#query-hash) · [型付きのクエリパラメーター](docs/ja/build-with-routes.md#typed-query) · [逆引きルーティングとアクティブなルート](docs/ja/build-with-routes.md#reverse-routing) · [basePath、末尾スラッシュ、オリジン](docs/ja/build-with-routes.md#base-path) · [言語と i18n](docs/ja/build-with-routes.md#i18n) · [TypeScript と Next の typedRoutes](docs/ja/build-with-routes.md#typescript) · [Next.js の typedRoutes 向けの型付き href](docs/ja/build-with-routes.md#typed-hrefs)

**[API リファレンス](docs/ja/api-reference.md)** — [ランタイム API リファレンス](docs/ja/api-reference.md#runtime-api) · [ジェネレーターの設定](docs/ja/api-reference.md#configuration) · [固定名（任意）](docs/ja/api-reference.md#stable-names) · [ジェネレーターのプログラム API](docs/ja/api-reference.md#generator-api)

**[ガイド](docs/ja/guides.md)** — [検出のエッジケース](docs/ja/guides.md#discovery) · [開発中の自動更新](docs/ja/guides.md#development) · [CLI と CI](docs/ja/guides.md#cli) · [診断: named-routes doctor](docs/ja/guides.md#doctor) · [エラーとトラブルシューティング](docs/ja/guides.md#errors) · [リライトと境界](docs/ja/guides.md#boundaries)

**[プロジェクト](docs/ja/project.md)** — [ドキュメントサイト](docs/ja/project.md#website) · [試してみる: フレームワーク別デモ](docs/ja/project.md#demos) · [ステップごとのコントリビュート](docs/ja/project.md#contributing) · [バージョンとアップグレード](docs/ja/project.md#versioning) · [1.x からのアップグレード](docs/ja/project.md#migration)

## 公式リファレンス

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://router.vuejs.org/file-based-routing/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
