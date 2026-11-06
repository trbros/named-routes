# @triooo/named-routes

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

**v1.0.0** · [ローカルインストールガイド（ポルトガル語）](LOCAL-DEVELOPMENT.pt-BR.md)

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

Next.js（App Router、Pages Router、src 構成、混在した移行プロジェクト）は withNamedRoutes で統合します。Nuxt、Vue Router のファイルベースルーティング、SvelteKit、Astro、React Router/Remix の flat routes、TanStack Router は規約アダプターで検出され、Vite プラグインで最新に保たれます。ルートを手書きで宣言するアプリも、手書きのマニフェストで同じ型付きランタイムを使えます。

どのフレームワークもひとつのパターン構文とひとつの命名規則に変換されるため、app/users/[user]/page.tsx、pages/users/[user].vue、src/routes/users/[user]/+page.svelte、app/routes/users.$user.tsx はすべて users.$user になります。言語付き URL（next-intl、Pages Router の i18n、@nuxtjs/i18n など）は v1 から対応しています。

URL のランタイムはブラウザーで動作し、フレームワークや Node.js を import しません。Node 専用のジェネレーターはファイルパスを読むだけで、ページを実行することはありません。ツールには Node.js 20.19 以上、公開される型には TypeScript 5 以上が必要です。Next 16 と Vite 7 は実際の統合テストで確認しています。

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

お好みのパッケージマネージャーでインストールしてください。ランタイム依存はありません。ジェネレーターには Node.js 20.19 以上が必要です。

あとは一度だけ接続します。Next.js なら next.config の withNamedRoutes、Vite ベースのフレームワークなら Vite プラグインの namedRoutes() です。どのプロジェクトでも named-routes CLI（generate、check、watch）を使えます。

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

```ts
// next.config.ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({ reactStrictMode: true });

// In your application:
import { route } from "@/routes.generated";
route("user.profile");
route("users.$user", { user: "ana" });
```

<a id="frameworks"></a>

## ほかのフレームワーク（Vite プラグイン）

@triooo/named-routes/vite の namedRoutes() を、Nuxt（nuxt.config の vite.plugins）、Vue、SvelteKit、Astro（astro.config の vite.plugins）、React Router、TanStack Router の Vite プラグインに追加します。Vite の起動時やビルド時に生成し、ファイルの追加・削除・名前変更があると Vite 自身の watcher で再生成します。

フレームワークは package.json から検出されます（nuxt、next、@sveltejs/kit、astro、@react-router/dev または @remix-run/dev、TanStack Router のプラグイン/CLI/Start、unplugin-vue-router または vue-router）。モノレポや検出があいまいな場合は framework を明示してください。npx named-routes init を実行すると、検出したフレームワーク用の設定ファイルを作れます。

各規約はランタイムの構文に変換されます。Nuxt と Vue: index、[id]、オプションの [[id]]、[...slug]（空の残りにも一致するため [[...slug]] になる）、(group) フォルダー、parent.vue + parent/ のネスト、v[major]-[minor] のような混在セグメント。Vue ではドットもネストとして扱い（users.edit.vue）、繰り返しパラメーター [id]+ に対応します。Nuxt は - で始まるファイルを無視し、includeApi を有効にすると server/api（/api 付き）と server/routes を読み取り、.get/.post の接尾辞を取り除きます。

SvelteKit: +page.* ファイル、[id=matcher]（matcher は捨てる）、[[lang]]、[...rest]（0 個以上のセグメント）、(group)、[x+2f] エスケープ、includeApi 時の +server エンドポイント。Astro: .astro/.md/.mdx/.html を含む src/pages、_ で始まるファイルは無視、[...slug] の rest パラメーター、includeApi 時の .ts/.js エンドポイント。

React Router / Remix の flat routes（app/routes）: ドットでネスト、_index、$param、($optional)、splat の $（名前は splat）、_ で始まるパスなしレイアウト、name_ によるネスト解除、[.] エスケープ、フォルダー/route.tsx モジュール。TanStack Router（src/routes）: フラットなファイルとフォルダーの併用、index/route、$param、{-$optional}、prefix{$param}、splat の $（名前は _splat）、_layout、- で始まる無視ファイル、(group)、.lazy ファイル。(beta) のようなオプションの静的セグメントには名前を付けられないため、ファイルを除外するか extraRoutes を使ってください。

コンポーネントの中で宣言されたパス（Nuxt の definePageMeta({ path })、React Router の routes.ts）はファイルスキャナーからは見えません。その URL は extraRoutes で対応付けるか、次に説明する手書きのマニフェストを使ってください。

```ts
// vite.config.ts (Vue, SvelteKit, React Router, TanStack Router)
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({ plugins: [namedRoutes()] });

// nuxt.config.ts
export default defineNuxtConfig({
  vite: { plugins: [namedRoutes({ output: "app/utils/routes.ts" })] },
});

// astro.config.mjs
export default defineConfig({ vite: { plugins: [namedRoutes()] } });

// Any component:
import { route } from "~/utils/routes"; // or your output path
route("users.$id", { id: 42 }); // /users/42
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

**[ルートで構築する](docs/ja/build-with-routes.md)** — [App Router のレシピ](docs/ja/build-with-routes.md#app-router) · [Pages Router のレシピ](docs/ja/build-with-routes.md#pages-router) · [パラメーターとエンコード](docs/ja/build-with-routes.md#parameters) · [クエリ文字列とフラグメント](docs/ja/build-with-routes.md#query-hash) · [basePath、末尾スラッシュ、オリジン](docs/ja/build-with-routes.md#base-path) · [言語と i18n](docs/ja/build-with-routes.md#i18n) · [TypeScript と Next の typedRoutes](docs/ja/build-with-routes.md#typescript)

**[API リファレンス](docs/ja/api-reference.md)** — [ランタイム API リファレンス](docs/ja/api-reference.md#runtime-api) · [ジェネレーターの設定](docs/ja/api-reference.md#configuration) · [固定名（任意）](docs/ja/api-reference.md#stable-names) · [ジェネレーターのプログラム API](docs/ja/api-reference.md#generator-api)

**[ガイド](docs/ja/guides.md)** — [検出のエッジケース](docs/ja/guides.md#discovery) · [開発中の自動更新](docs/ja/guides.md#development) · [CLI と CI](docs/ja/guides.md#cli) · [エラーとトラブルシューティング](docs/ja/guides.md#errors) · [リライトと境界](docs/ja/guides.md#boundaries)

**[プロジェクト](docs/ja/project.md)** — [ドキュメントサイト](docs/ja/project.md#website) · [試してみる: フレームワーク別デモ](docs/ja/project.md#demos) · [ステップごとのコントリビュート](docs/ja/project.md#contributing) · [バージョンとアップグレード](docs/ja/project.md#versioning)

## 公式リファレンス

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://uvr.esm.is/guide/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
