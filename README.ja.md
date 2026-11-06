# @triooo/next-named-routes

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json and docs/locales.json; run pnpm docs. -->

## 目次

**v1.0.0**

[ローカルインストールガイド（ポルトガル語）](LOCAL-DEVELOPMENT.pt-BR.md)

- [このパッケージでできること](#overview)
- [ほかの選択肢との比較](#comparison)
- [インストール](#installation)
- [Next.js の初回セットアップ](#quick-start)
- [ほかのフレームワーク（Vite プラグイン）](#frameworks)
- [Next.js](#nextjs)
- [Nuxt](#nuxt)
- [Vue Router](#vue)
- [SvelteKit](#sveltekit)
- [Astro](#astro)
- [React Router / Remix](#react-router)
- [TanStack Router](#tanstack-router)
- [手動ルート（React、Vue、任意のルーター）](#manual-routes)
- [自動命名のルール](#naming)
- [App Router のレシピ](#app-router)
- [Pages Router のレシピ](#pages-router)
- [パラメーターとエンコード](#parameters)
- [クエリ文字列とフラグメント](#query-hash)
- [basePath、末尾スラッシュ、オリジン](#base-path)
- [言語と i18n](#i18n)
- [TypeScript と Next の typedRoutes](#typescript)
- [ランタイム API リファレンス](#runtime-api)
- [ジェネレーターの設定](#configuration)
- [固定名（任意）](#stable-names)
- [検出のエッジケース](#discovery)
- [開発中の自動更新](#development)
- [CLI と CI](#cli)
- [ジェネレーターのプログラム API](#generator-api)
- [エラーとトラブルシューティング](#errors)
- [リライトと境界](#boundaries)
- [ドキュメントサイト](#website)
- [試してみる: フレームワーク別デモ](#demos)
- [ステップごとのコントリビュート](#contributing)
- [バージョンとアップグレード](#versioning)

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


<a id="comparison"></a>

## ほかの選択肢との比較

型付きの URL を生成するパッケージやフレームワークの機能はほかにもあります。違いは、ルートをどこから得るか、ルートに名前があるか、どのフレームワークに対応するか、言語がモデルに含まれるかです。表は各プロジェクトがドキュメント化している内容、または公開しているものをまとめたもので、npm の数値は 2026-11-05 に取得した最新バージョンと直近 1 か月のダウンロード数です。✓ は対応、½ は一部対応、— は提供なし、またはドキュメントなしを意味します。

**このパッケージの違い。** 名前は既存のファイルから推論され、Next.js、Nuxt、Vue、SvelteKit、Astro、React Router、TanStack Router のどれでも同じになります。言語（プレフィックス、翻訳されたパス、ドメイン）も同じ型付きの呼び出しに含まれます。そして route() はどのルーターの外でも使える普通の文字列を返すので、リダイレクト、メール、サイトマップ、モノレポで複数のアプリが共有するパッケージでも使えます。

**ほかの選択肢が向いている場合。** 使うフレームワークがひとつで、パスでルートを指定することに不満がなければ、そのフレームワークの組み込み機能なら依存を増やさずに済みます。検索パラメーターをスキーマ（Zod、Valibot）で検証したいなら、next-typesafe-url や next-safe-navigation が対応していますが、このパッケージは対応していません。ルートが Laravel のバックエンドにあるなら Ziggy が自然な選択です。next-routes は React 15/16 時代の Pages Router 向けで、スコープなしの next-named-routes は名前が似ているだけの 2022 年の無関係なプロジェクトです。

**フレームワーク組み込みの機能。** Next.js の typedRoutes、React Router の href()、SvelteKit の resolve()、TanStack Router は、そのフレームワーク独自の構文で書いたパスを型付けします。Nuxt の typedPages は Nuxt のルート名を型付けします。いずれもひとつのフレームワークの中で動作し、名前や言語のモデルをほかと共有しません。Astro の getRelativeLocaleUrl() は、型のないパスから言語付きの URL を作ります。

**パッケージ**

| パッケージ | フレームワーク | ルートの取得元 | 名前 | 型付きパラメーター | i18n | URL ビルダー | npm（最新 · 月間） |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **@triooo/next-named-routes** | Next.js, Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router | files · `createRoutes()` | ✓ `users.$user` | ✓ | ✓ | ✓ `route()` | 1.0.0 · new |
| nextjs-routes | Next.js | files | — `"/users/[id]"` | ✓ | ½ Pages Router | ✓ `route()` | 2.2.5 · 173k |
| next-typesafe-url | Next.js (peer ≤ 15) | files + Zod | — `"/users/[id]"` | ✓ + Zod | — | ✓ `$path()` | 6.1.0 · 41k |
| next-safe-navigation | Next.js App Router | `defineRoute()` | ✓ | ✓ + schema | — | ✓ `routes.name()` | 0.4.0 · 13k |
| vite-plugin-kit-routes | SvelteKit | files | — `"/about"` | ✓ | — | ✓ `route()` | 1.1.2 · 24k |
| typesafe-routes | any | `createRoutes({})` | ✓ `routes.users.edit` | ✓ | — | ✓ `renderPath()` | 12.3.0 · 25k |
| ziggy-js | any + Laravel | Laravel routes | ✓ Laravel | ✓ | — | ✓ `route()` | 2.6.5 · 567k |
| next-routes | Next.js Pages (React ≤ 16) | `routes.add()` | ✓ | — | — | ✓ `pushRoute()` | 1.4.2 · 49k |
| next-named-routes | Next.js Pages | `add(name, path)` | ✓ enum | ½ | — | ✓ `pathnameForParams()` | 0.1.0 · 0.3k |

**フレームワーク組み込み**

| フレームワーク | 機能 | ルートのキー | 型付きパラメーター | フレームワーク間で共通の名前 | 言語 |
| --- | --- | --- | --- | --- | --- |
| Next.js 16 | `typedRoutes: true` | `"/users/[id]"` | ✓ | — | — |
| React Router 7 | `href()` | `"/users/:id"` | ✓ | — | — |
| SvelteKit 2.26+ | `resolve()` | `"/blog/[slug]"` | ✓ | — | — |
| Nuxt 4 | `experimental.typedPages` | `users-id` | ✓ | — | ½ @nuxtjs/i18n |
| TanStack Router | `<Link to>` | `"/posts/$postId"` | ✓ | — | — |
| Astro 5 | `getRelativeLocaleUrl()` | `string` | — | — | ✓ |


<a id="installation"></a>

## インストール

お好みのパッケージマネージャーでインストールしてください。ランタイム依存はありません。ジェネレーターには Node.js 20.19 以上が必要です。

あとは一度だけ接続します。Next.js なら next.config の withNamedRoutes、Vite ベースのフレームワークなら Vite プラグインの namedRoutes() です。どのプロジェクトでも named-routes CLI（generate、check、watch）を使えます。

```sh
npm install @triooo/next-named-routes
# pnpm
pnpm add @triooo/next-named-routes
# Yarn
yarn add @triooo/next-named-routes
# Bun
bun add @triooo/next-named-routes
```


<a id="quick-start"></a>

## Next.js の初回セットアップ

既存の Next の設定を一度ラップするだけです。ルート表、ページへの注釈、別の watcher コマンドは不要です。設定オブジェクト、Promise、非同期の設定関数に対応しています。

生成されるモジュールはデフォルトで src/routes.generated.ts にあり、routes、route、RouteName をエクスポートします。dev/build の開始前に作られます。生成されたヘルパーは Server Components、Client Components、Pages Router のコードから使えます。

下の @/routes.generated というインポートエイリアスは、@/* が src/* を指している前提です。エイリアスがプロジェクトのルートを指す場合は @/src/routes.generated か相対インポートを使ってください。Next の設定は next.config.mjs のままでも next.config.ts でもかまいません。

```ts
// next.config.ts
import { withNamedRoutes } from "@triooo/next-named-routes/next";
export default withNamedRoutes({ reactStrictMode: true });

// In your application:
import { route } from "@/routes.generated";
route("user.profile");
route("users.$user", { user: "ana" });
```


<a id="frameworks"></a>

## ほかのフレームワーク（Vite プラグイン）

@triooo/next-named-routes/vite の namedRoutes() を、Nuxt（nuxt.config の vite.plugins）、Vue、SvelteKit、Astro（astro.config の vite.plugins）、React Router、TanStack Router の Vite プラグインに追加します。Vite の起動時やビルド時に生成し、ファイルの追加・削除・名前変更があると Vite 自身の watcher で再生成します。

フレームワークは package.json から検出されます（nuxt、next、@sveltejs/kit、astro、@react-router/dev または @remix-run/dev、TanStack Router のプラグイン/CLI/Start、unplugin-vue-router または vue-router）。モノレポや検出があいまいな場合は framework を明示してください。npx named-routes init を実行すると、検出したフレームワーク用の設定ファイルを作れます。

各規約はランタイムの構文に変換されます。Nuxt と Vue: index、[id]、オプションの [[id]]、[...slug]（空の残りにも一致するため [[...slug]] になる）、(group) フォルダー、parent.vue + parent/ のネスト、v[major]-[minor] のような混在セグメント。Vue ではドットもネストとして扱い（users.edit.vue）、繰り返しパラメーター [id]+ に対応します。Nuxt は - で始まるファイルを無視し、includeApi を有効にすると server/api（/api 付き）と server/routes を読み取り、.get/.post の接尾辞を取り除きます。

SvelteKit: +page.* ファイル、[id=matcher]（matcher は捨てる）、[[lang]]、[...rest]（0 個以上のセグメント）、(group)、[x+2f] エスケープ、includeApi 時の +server エンドポイント。Astro: .astro/.md/.mdx/.html を含む src/pages、_ で始まるファイルは無視、[...slug] の rest パラメーター、includeApi 時の .ts/.js エンドポイント。

React Router / Remix の flat routes（app/routes）: ドットでネスト、_index、$param、($optional)、splat の $（名前は splat）、_ で始まるパスなしレイアウト、name_ によるネスト解除、[.] エスケープ、フォルダー/route.tsx モジュール。TanStack Router（src/routes）: フラットなファイルとフォルダーの併用、index/route、$param、{-$optional}、prefix{$param}、splat の $（名前は _splat）、_layout、- で始まる無視ファイル、(group)、.lazy ファイル。(beta) のようなオプションの静的セグメントには名前を付けられないため、ファイルを除外するか extraRoutes を使ってください。

コンポーネントの中で宣言されたパス（Nuxt の definePageMeta({ path })、React Router の routes.ts）はファイルスキャナーからは見えません。その URL は extraRoutes で対応付けるか、次に説明する手書きのマニフェストを使ってください。

```ts
// vite.config.ts (Vue, SvelteKit, React Router, TanStack Router)
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
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


<a id="nextjs"></a>

## Next.js

next.config を @triooo/next-named-routes/next の withNamedRoutes でラップします。モジュールは next dev と next build の前に生成され、next dev の中では watcher が最新に保ち、next start では一切書き込まないため、読み取り専用のデプロイでも安全です。ラッパーは pageExtensions、basePath、trailingSlash、Pages Router の i18n 設定を引き継ぎます。

**規約。** app/ と pages/（または src/app と src/pages）を合わせて読み取ります。App Router: page ファイルのみ。ルートグループと並列スロットは省かれ、インターセプトは正規の URL に解決され、_ で始まるプライベートフォルダーは無視され、%5F はアンダースコアになります。Pages Router: index は取り除かれ、_app、_document、_error は対象外です。Route Handlers と pages/api は includeApi で有効にできます。appDir と pagesDir で独自のフォルダーを指定できます（片方を false にすると読み取りません）。

**ナビゲーション。** ヘルパーは next/link、next/navigation または next/router の useRouter、redirect で使える普通の文字列を返します。Link とルーターは basePath を自分で付けるので、{ basePath: true } は通常のリンクや fetch のときだけ指定してください。next-intl では routing オブジェクトを i18n として渡すと、app/[locale]/about は about になり、next-intl の Link には内部パスが渡ります。

**検証。** CI では実際の Next 16 開発サーバー（App Router と Pages Router、basePath とページのライブ検出を含む）を動かしています。デモ: examples/app-router と examples/pages-router。App Router と Pages Router のレシピもあわせて参照してください。

```tsx
import { withNamedRoutes } from "@triooo/next-named-routes/next";
export default withNamedRoutes({ reactStrictMode: true });

// app/users/[user]/page.tsx → users.$user
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("users.$user", { user: "ana" })}>Ana</Link>;
```


<a id="nuxt"></a>

## Nuxt

nuxt.config の vite.plugins に namedRoutes() を追加します。出力はソースディレクトリの中に置き、~ エイリアスでインポートしてください。Nuxt 4（srcDir が app/）なら output を app/routes.generated.ts にして ~/routes.generated をインポートします。nuxt dev 中にページを追加・移動・削除すると、プラグインが再生成します。

**規約。** app/pages または pages: index.vue、[id]、オプションの [[id]]、[...slug]（空の残りにも一致するため [[...slug]] になる）、(group) フォルダー、v[major]-[minor] のような混在セグメント、ひとつのルートにまとめられる parent.vue + parent/ のネスト。- で始まるファイルは無視されます。includeApi を有効にすると、server/api（/api 付き）と server/routes を読み取り、.get/.post の接尾辞を取り除きます。

**ナビゲーションと i18n。** URL は NuxtLink の :to、navigateTo、useRouter().push で使います。@nuxtjs/i18n を使う場合は、ここでも同じ言語を設定してください。戦略 prefix_except_default は localePrefix の as-needed、prefix（または prefix_and_default）は always、no_prefix は never に対応します。すると route(name, params, { locale }) がローカライズされた URL を返し、locale を省くと localePath() に渡す内部パスが得られます。defineI18nRoute で翻訳したパスは i18n.pathnames にも書く必要があります。

**制限と検証。** definePageMeta({ path }) で変更したパスはスキャナーからは見えないので、extraRoutes で追加してください。名前はこのパッケージのドット区切りの形式（users.$id）で、Nuxt 自身のルート名（users-id）とは異なります。規約テストと、Nuxt 4 でビルド・実行できる examples/nuxt で検証しています。

```vue
// nuxt.config.ts
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineNuxtConfig({
  vite: { plugins: [namedRoutes({ output: "app/routes.generated.ts" })] },
});

<!-- app/pages/users/[id].vue → users.$id -->
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">User 42</NuxtLink>
</template>
```


<a id="vue"></a>

## Vue Router

ファイルベースルーティング（unplugin-vue-router の規約）を使う Vue アプリでは、vite.config で VueRouter() と vue() の前に namedRoutes() を追加します。フレームワークは unplugin-vue-router または vue-router から検出され、routesDir を指定しない限り src/pages を読み取ります。ルートの配列を手書きしているアプリは、手書きのマニフェストを使ってください。

**規約。** index.vue と (name).vue はインデックスルート。ドットでネスト（users.edit.vue は /users/edit）。[id] と [[id]]。[id]+ は 1 個以上の繰り返しパラメーター（[...id]）、[[id]]+ は 0 個以上（[[...id]]）。[...path] は空の残りにも一致（[[...path]]）。(group) フォルダーは省かれ、parent.vue + parent/ のネストはまとめられ、v[major]-[minor] のような混在セグメントも使えます。

**ナビゲーション。** URL を RouterLink の :to や router.push に渡します。Vue Router は文字列を普通のパスとして解決するので、パッケージがルーターのインスタンスにアクセスする必要はありません。

**検証。** これらの規約を使った実際の Vite 7 開発サーバーを CI で動かしており、examples/vue は unplugin-vue-router でビルド・実行できます。

```ts
// vite.config.ts
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({ plugins: [namedRoutes(), VueRouter(), vue()] });

// src/pages/users/[id].vue → users.$id
<RouterLink :to="route('users.$id', { id: 42 })">User 42</RouterLink>
```


<a id="sveltekit"></a>

## SvelteKit

vite.config で sveltekit() の前に namedRoutes() を追加します。モジュールを src/lib に書き出すと、どのコンポーネント、load 関数、エンドポイントからでも $lib/routes.generated としてインポートできます。

**規約。** +page.svelte、+page.ts、+page.server.ts を含む src/routes（ひとつのルートにまとめられる）。(group) フォルダーは省かれ、[id=matcher] はパラメーターを残して matcher を捨て、[[lang]] はオプション、[...rest] は 0 個以上のセグメントに一致し（[[...rest]]）、静的セグメントの前にも置けます。+page@ のレイアウトリセットも通常のページとして扱い、[x+2f] や [u+0041] のエスケープはデコードされます。+server エンドポイントは includeApi で有効にできます。

**ナビゲーション。** <a href={route(...)}>、goto(route(...))、redirect(303, route(...)) を使います。SvelteKit は通常のリンクに paths.base を付けないので、ベースパスの下にデプロイする場合は defaults.basePath に同じ値を設定し、{ basePath: true } を渡してください。

**検証。** 規約テストと、SvelteKit 2 と Svelte 5 でビルド・実行できる examples/sveltekit で検証しています。

```svelte
// vite.config.ts
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({
  plugins: [namedRoutes({ output: "src/lib/routes.generated.ts" }), sveltekit()],
});

<!-- src/routes/blog/[slug]/+page.svelte → blog.$slug -->
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("blog.$slug", { slug: "hello" })}>Hello</a>
```


<a id="astro"></a>

## Astro

astro.config の vite.plugins に namedRoutes() を追加します。モジュールはデフォルトで src/routes.generated.ts に生成され、.astro のフロントマター、フレームワークのアイランド、エンドポイントからインポートできます。

**規約。** .astro、.md、.mdx、.markdown、.html のページを含む src/pages。_ で始まるファイルやフォルダーはプライベート。[id]。[...slug] は 0 個以上のセグメントに一致（[[...slug]]）。[lang]-[version] のような混在セグメント。.ts/.js のエンドポイントは includeApi で有効になり、内側の拡張子を保ちます（api/data.json.ts は /api/data.json）。

**i18n。** Astro の物理的な言語フォルダー（src/pages/pt/about.astro）は、その言語が i18n.locales にあれば src/pages/about.astro と同じ名前付きルートにまとめられます。prefixDefaultLocale: false は localePrefix の as-needed、true は always に対応します。

**制限と検証。** 静的ビルドでは、動的ページに引き続き getStaticPaths が必要です。このパッケージは URL を作るだけで、パラメーターを列挙はしません。規約テストと、Astro 5 でビルド・実行できる examples/astro で検証しています。

```astro
// astro.config.mjs
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({ vite: { plugins: [namedRoutes()] } });

---
// src/pages/docs/[...slug].astro → docs.$slug
import { route } from "../../routes.generated";
---
<a href={route("docs.$slug", { slug: ["guide", "install"] })}>Install guide</a>
```


<a id="react-router"></a>

## React Router / Remix

flat routes を使う React Router 7 のフレームワークモード（と Remix v2）では、vite.config で reactRouter() の前に namedRoutes() を追加し、app/routes.ts は @react-router/fs-routes の flatRoutes() のままにします。出力先は app/routes の外の app/routes.generated.ts がおすすめです。

**規約。** ドットでネスト（concerts.$city.tsx は /concerts/[city]）。_index はインデックス。$param。($lang) はオプション（[[lang]]）。単独の $ は splat という名前の splat（[[...splat]]）。_auth のように _ で始まるものはパスなしレイアウト。concerts_ はネストを解除。[.] エスケープは文字をそのまま残す。route.tsx を含むフォルダーはひとつのルートで、それより深いフォルダーは無視されます。レイアウトとその _index は同じ URL を共有し、まとめられます。

**ナビゲーション。** <Link to={route(...)}>、useNavigate()、loader や action の redirect() を使います。

**制限と検証。** app/routes.ts の中でコードとして宣言したルート（route()、index()、layout()）はファイルではないため、手書きのマニフェストか extraRoutes を使ってください。(beta) のようなオプションの静的セグメントには名前を付けられず、ジェネレーターはファイルを除外できるよう明確なエラーで停止します。規約テストと、React Router 7 でビルド・実行できる examples/react-router で検証しています。

```tsx
// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({
  plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});

// app/routes/concerts.$city.tsx → concerts.$city
import { Link } from "react-router";
import { route } from "../routes.generated";
<Link to={route("concerts.$city", { city: "lisbon" })}>Lisbon</Link>;
```


<a id="tanstack-router"></a>

## TanStack Router

vite.config で @tanstack/router-plugin の tanstackRouter() と並べて namedRoutes() を追加します。プラグインは src/routes（または app/routes）を読み取り、デフォルトではルートフォルダーの外にある src/routes.generated.ts に書き出すので、生成ファイルがルートになることはありません。

**規約。** __root はスキップ。index と route.tsx はそのフォルダーのルート。フラットなファイル（posts.$postId.tsx）とフォルダーを併用できる。$param。{-$locale} はオプション（[[locale]]）。prefix{$id}suffix は混在セグメントになる。単独の $ は _splat という名前の splat（[[..._splat]]）。_layout はパスなし。posts_ はネストを解除。- で始まるファイルと (group) フォルダーは無視され、.lazy ファイルは同じルートに属します。

**使いどころ。** TanStack Router は自前の <Link to> をルート ID で型付けしています。route() は普通の文字列が必要な場面で使ってください。<a href>、ほかのアプリへのリダイレクト、メール、サイトマップ、アナリティクス、言語プレフィックス付きの URL、モノレポでほかのフレームワークと共有する名前などです。

**検証。** 規約テストと、TanStack の router プラグインでビルド・実行できる examples/tanstack-router で検証しています。

```tsx
// vite.config.ts
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({
  plugins: [namedRoutes(), tanstackRouter({ target: "react" }), react()],
});

// src/routes/posts/$postId.tsx → posts.$postId
import { route } from "../../routes.generated";
<a href={route("posts.$postId", { postId: 42 }, { absolute: true })}>Share</a>;
```


<a id="manual-routes"></a>

## 手動ルート（React、Vue、任意のルーター）

ルートをコードで宣言している場合（React Router の <Route>、vue-router のルート配列、Express のようなサーバー）は、createRoutes でマニフェストを自分で書きます。名前の推論、パラメーターのチェック、エンコード、query/hash、basePath、i18n はそのまま使え、手動なのは検出だけです。

パターンはルーター自身の構文にかかわらず角かっこの構文を使います。/users/:id は /users/[id]、オプションの :id? は [[id]]、splat の * は [...splat] または [[...splat]] になります。名前とパラメーターを推論させるため、オブジェクトリテラル（または as const）のまま保ってください。

それでも生成されたモジュールを共有したい場合（たとえばモノレポのパッケージから）は、framework: "manual" を指定して extraRoutes にルートを並べてください。ジェネレーターはスキャンせずに同じ型付きモジュールを書き出します。

```tsx
// src/routes.ts
import { createRoutes } from "@triooo/next-named-routes";
export const route = createRoutes({
  home: "/",
  "users.show": "/users/[id]",       // <Route path="/users/:id">
  "docs.page": "/docs/[[...path]]",   // <Route path="/docs/*">
});

// React Router
<Link to={route("users.show", { id: 42 })}>Ana</Link>
// Vue Router
<RouterLink :to="route('users.show', { id: 42 })">Ana</RouterLink>
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


<a id="app-router"></a>

## App Router のレシピ

ヘルパーは普通の URL 文字列を返します。next/link、redirect、next/navigation の App Router 用 useRouter フックと組み合わせて使ってください。リダイレクトは適切なサーバー処理やイベント処理の中で実行します。名前付きルートが Next.js のリダイレクトの意味を変えることはありません。

これらのスニペットの名前は、対応するページ（posts/page.tsx、posts/[post]/page.tsx、posts/[post]/edit/page.tsx）が存在する前提です。

```tsx
// Server Component
import Link from "next/link";
import { route } from "@/routes.generated";
export default function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}

// A separate Client Component file:
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function EditPost({ post }: { post: number }) {
  const router = useRouter();
  return <button onClick={() => router.push(
    route("posts.$post.edit", { post })
  )}>Edit</button>;
}

// In a server-side redirect flow:
// import { redirect } from "next/navigation";
// redirect(route("posts"));
```


<a id="pages-router"></a>

## Pages Router のレシピ

同じ生成ヘルパーを使います。Pages Router のアプリでは、ルーターのフックは next/router から取得します。Link に専用のアダプターは不要です。移行中は両方のルーターのディレクトリをスキャンできますが、正規 URL が衝突すると生成は失敗します。

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "@/routes.generated";
export default function Page() {
  const router = useRouter();
  return <>
    <Link href={route("users.$user", { user: 42 })}>User</Link>
    <button onClick={() => router.replace(route("user.profile"))}>
      Profile
    </button>
  </>;
}
```


<a id="parameters"></a>

## パラメーターとエンコード

[id] には空でない文字列か有限の数値が必要です。[[id]]（Nuxt、Vue、SvelteKit、React Router、TanStack）はオプションのスカラーで、省略するとそのセグメントがなくなります。[...slug] には空でない文字列/数値の配列が必要です。[[...slug]] はオプションの配列を受け付け、省略、null、[] のいずれでも catch-all の部分がなくなります。混在セグメントでは、含まれるすべてのパラメーターが必要です。

パラメーターのセグメントはひとつずつエンコードされます。スカラーの中のスラッシュはエンコードされ、catch-all の配列は別々のパスセグメントになります。余分なパラメーター、空の必須値、NaN、Infinity、オブジェクト、単独の . や .. のセグメントはエラーになります。これらのチェックは URL の組み立てを検証するもので、アプリケーションの業務上の ID を検証するものではありません。

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" });       // /users/a%2Fb
// app/docs/[[...slug]]/page.tsx:
route("docs.$slug");                         // /docs
route("docs.$slug", { slug: ["guide", "install"] });
// /docs/guide/install
// pages/[[lang]]/about.vue and pages/v[major]-[minor].vue:
route("$lang.about");                        // /about
route("v$major-$minor", { major: 2, minor: 1 }); // /v2-1
```


<a id="query-hash"></a>

## クエリ文字列とフラグメント

query と hash は第 3 引数で渡します。query の値には文字列、有限の数値、真偽値、またはそれらの読み取り専用配列を使えます。null と undefined は、配列の要素であっても省かれます。配列はキーを繰り返し、角かっこ記法は使いません。

hash は先頭の # を除いた文字列で、ヘルパーがエンコードします。ブラウザーにとどまり、サーバーには送られません。hash の文字列と query のオブジェクトは実行時に検証されます。

```ts
route("users.$user", { user: 42 }, {
  query: { page: 2, tag: ["next", "react"], draft: false, omit: null },
  hash: "activity",
});
// /users/42?page=2&tag=next&tag=react&draft=false#activity
```


<a id="base-path"></a>

## basePath、末尾スラッシュ、オリジン

Next の Link とルーターのナビゲーションは basePath を自分で付けます。ヘルパーの相対 URL は、プレフィックスの重複を避けるため、デフォルトでは basePath を含みません。通常のリンク、fetch、その他の利用先では basePath: true を指定してください。absolute: true は常に basePath を含み、defaults.origin が必要です。

withNamedRoutes は Next の設定から basePath と trailingSlash を引き継ぎます。defaults を明示すると、引き継いだ値より優先されます。origin は、認証情報、ルート以外のパス、query、hash を含まない HTTP(S) のオリジンでなければなりません。リクエストや window から推測されることはありません。

defaults はすべて、公開される生成モジュールにシリアライズされます。秘密情報は絶対に入れないでください。trailingSlash は生成されるパスの形を整えるだけで、リダイレクトや最終的な正規化は引き続き Next が担当します。

```ts
// next.config.ts
export default withNamedRoutes({ basePath: "/admin" }, {
  defaults: { origin: "https://triooo.com.br" },
});
route("users.$user", { user: 42 }); // /users/42 (Next Link/router)
route("users.$user", { user: 42 }, { basePath: true });
// /admin/users/42 (plain anchor/fetch)
route("users.$user", { user: 42 }, { absolute: true });
// https://triooo.com.br/admin/users/42
```


<a id="i18n"></a>

## 言語と i18n

i18n は locales と defaultLocale、必要に応じて localePrefix、pathnames、domains で設定します。形は next-intl の defineRouting() と同じなので、その routing オブジェクトをそのまま渡せます。localeCookie のような next-intl 専用のキーは受け付けたうえで無視します。Next.js の Pages Router のプロジェクトでは、withNamedRoutes が next.config の i18n を自動で引き継ぎます（localePrefix は as-needed、domains も含む）。

locale または lang という名前の最初の動的フォルダー（app/[locale]/…、pages/[lang]/…。localeParam で変更可能）は、名前とパターンから取り除かれます。app/[locale]/about/page.tsx は about → /about になります。物理的な言語フォルダー（src/pages/pt/about.astro）は同じルートにまとめられます。言語フォルダーがない場合（Pages Router の i18n、@nuxtjs/i18n、ミドルウェアのリライト）は、すべてのページがローカライズ対象です。エンドポイントと [locale] の外にあるルートは unlocalized として扱われ、プレフィックスは付きません。

locale なしの route(name, params) は内部パスを返します。これは next-intl の Link、Pages Router の Link、@nuxtjs/i18n の localePath が期待する形です。通常のリンク、リダイレクト、サイトマップ、メール、言語切り替えには { locale } を渡してください。route.forLocale(locale) はその言語に固定したヘルパーを返し、route.locales() は設定済みの言語を一覧にします。

localePrefix: always（デフォルト）はすべての言語にプレフィックスを付け、as-needed はデフォルト言語だけ省き、never はすべて省きます。{ mode, prefixes: { "en-US": "/us" } } で個別に変更することもできます。pathnames は内部パターンを、同じパラメーターを持つ翻訳済みのパターンに対応付けます。absolute: true のとき、設定したドメインで配信される言語ではそのドメインがオリジンになります。言語は型付きで、生成モジュールは RouteLocale をエクスポートし、未知の言語は型エラーにも実行時エラーにもなります。

```ts
// next.config.ts — next-intl with app/[locale]/…
import { routing } from "./src/i18n/routing"; // defineRouting({...})
export default withNamedRoutes(withNextIntl({}), { i18n: routing });

// or named-routes.config.mjs (any framework)
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "as-needed",
    pathnames: { "/about": { pt: "/sobre" } },
  },
});

route("about");                     // /about (next-intl Link adds the locale)
route("about", {}, { locale: "pt" }); // /pt/sobre
route("about", {}, { locale: "en" }); // /about
const pt = route.forLocale("pt");
pt("users.$user", { user: 42 });      // /pt/users/42
```


<a id="typescript"></a>

## TypeScript と Next の typedRoutes

リテラルのパターンから名前のユニオン型とパラメーターのオブジェクト型が推論されます。必須パラメーターはコンパイル時にチェックされ、オプションの catch-all ルートはパラメーターなしで呼び出せます。JavaScript からの呼び出しも、ランタイムが引き続き検証します。

route() が返すのは string で、Next が生成する Route 型ではありません。Next の typedRoutes を有効にしている場合、Link 側の検証で Route へのアサーションが必要になることがあります。それでもパッケージはルート名とパラメーターをチェックします。検証を回避するために、信頼できない任意の入力をルート名にアサーションしないでください。

```ts
import type { Route } from "next";
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes:
// <Link href={route(name) as Route}>Profile</Link>
```


<a id="runtime-api"></a>

## ランタイム API リファレンス

route(name, params?, options?) は URL 文字列を返します。params を省略できるのは、パターンに必須パラメーターがないときだけです。options には query、hash、absolute、basePath、locale を指定できます。route.has(name) は存在を確認し、文字列を既知の名前に絞り込みます。route.names() は利用できる名前を返し、route.pattern(name, locale?) は元のパターンまたは翻訳済みのパターンを返し、route.locales() は言語を一覧にし、route.forLocale(locale) はその言語に固定したヘルパーを返します。

createRoutes(manifest, defaults?) は独立した凍結済みのヘルパーを作り、マニフェストをコピーします。defaults には basePath、trailingSlash、origin、i18n を指定します。parsePattern(pattern) は static/dynamic/optionalDynamic/catchAll/optional/mixed のセグメント情報を返して構文を検証し、formatPattern はその逆、patternParameters はパラメーター名を一覧にします。RouteValue、QueryValue、RouteParams、RouteOptions、RouteDefaults、I18nOptions、LocalePrefix、LocaleDomain、NamedRoutes、PatternSegment は型としてエクスポートされています。

単なる Record<string, string> として型付けされたマニフェスト（たとえば JSON から読み込んだもの）でも動作します。名前は string、パラメーターは緩いレコードになりますが、ランタイムはすべての呼び出しを引き続き検証します。

```ts
import { createRoutes } from "@triooo/next-named-routes";
const route = createRoutes({
  "users.show": "/users/[user]",
  search: "/search/[[...terms]]",
});
route("users.show", { user: 1 });
route.names(); // ["users.show", "search"]
route.pattern("users.show"); // /users/[user]
const input: string = "search";
if (route.has(input)) console.log(route.pattern(input));
```


<a id="configuration"></a>

## ジェネレーターの設定

設定ファイルは必須ではありません。任意の設定ファイルは named-routes.config.ts、.mts、.mjs、.js、.cjs、.json の順に探されます。TypeScript の設定には Node.js 22.18 以上（組み込みの型除去）が必要で、それより古いバージョンでは .mjs を使ってください。補完を効かせるには @triooo/next-named-routes/config の defineConfig({...}) をエクスポートします。CLI の --config で別のファイルを指定でき、設定ファイル内の root はそのファイルからの相対パスです。未知のオプションや綴りの誤りは INVALID_CONFIG で失敗します。

検出: framework（デフォルトは auto、または next、nuxt、vue、sveltekit、astro、react-router、tanstack-router、manual）、router（Next.js: auto、app、pages）、appDir/pagesDir（Next.js の独自フォルダー、または false）、routesDir（ほかのフレームワークのページ/ルートの独自フォルダー）、pageExtensions（各フレームワークのデフォルト。page.tsx のような複数ドットの拡張子も可）、includeApi（false）、exclude（ルートからの相対 glob。*、**、? を使用）。

名前: names（URL パターン → 独自の名前。各パスは実在する必要がある）、extraRoutes（明示的な名前 → パターン。リライト先など）、naming（separator、paramPrefix、home、transform）、i18n（locales、defaultLocale、localePrefix、pathnames、domains、localeParam、unlocalized）。

出力: output（デフォルトは src/routes.generated.ts。.ts、.mts、.js、.mjs のいずれかで、ルーティング対象のファイルの中には置けない）、importSource（生成ファイルが createRoutes をインポートするモジュール。デフォルトはパッケージ名）、exportNames（routes、route、RouteName、RouteLocale の名前を変更）、defaults（公開される basePath、trailingSlash、origin。シリアライズされるのはこれらのキーだけ）。プラグインには watch（デフォルト true）があり、withNamedRoutes では watchInterval（750 ms、25〜60000）も使えます。プラグインに直接渡したオプションは設定ファイルより優先されます。

```ts
// named-routes.config.ts (or .mjs)
import { defineConfig } from "@triooo/next-named-routes/config";

export default defineConfig({
  framework: "auto",                 // next, nuxt, vue, sveltekit, astro, ...
  routesDir: "app/pages",            // non-Next frameworks
  // appDir: "src/app", pagesDir: false, // Next.js
  output: "app/utils/routes.ts",     // .ts .mts .js .mjs
  importSource: "@triooo/next-named-routes",
  exportNames: { route: "url", routeName: "UrlName" },
  pageExtensions: ["vue"],
  includeApi: false,
  exclude: ["**/__tests__/**", "app/pages/drafts/**"],
  names: { "/users/[user]": "users.show" },
  extraRoutes: { "public.login": "/login" },
  naming: { separator: ".", paramPrefix: "$", home: "home" },
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  defaults: { origin: "https://triooo.com.br", trailingSlash: false },
});
```


<a id="stable-names"></a>

## 固定名（任意）

自動の名前は URL の構造に従います。リファクタリングで公開 URL が変わっても意味のある名前を保ちたい場合は、任意の names マップを更新してください。エイリアスを付けるパスはすべて実在する必要があります。リストにないルートは自動の名前のままです。名前の重複や綴りの誤りは、壊れたリンクを黙って作る代わりに生成を失敗させます。

独自の名前はそのパスの自動の名前を置き換えるもので、2 つ目のエイリアスが自動で追加されるわけではありません。posts.show のような Laravel 風の名前に便利ですが、通常の使い方では不要です。

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```


<a id="discovery"></a>

## 検出のエッジケース

Next.js: スキャナーは app と pages を合わせて扱います。ルート直下の app ディレクトリは src/app より優先され、pages と src/pages にも同じルールが独立して適用されます。ほかのフレームワークは、routesDir を指定しない限り標準のフォルダー（Nuxt は app/pages または pages、Vue は src/pages、SvelteKit は src/routes、Astro は src/pages、React Router は app/routes、TanStack は src/routes）を使います。ディレクトリのシンボリックリンク、隠しフォルダー、node_modules はたどらず、.d.ts ファイルは無視します。

App Router: デフォルトでは page ファイルだけが対象です。グループとスロットは URL に含まれません。インターセプトは正規のパスに解決され、同等のバリエーションはひとつにまとめられます。_ で始まるプライベートフォルダーは無視され、%5F は公開のアンダースコアになります。layout、loading、default、error、メタデータのファイルは対象外です。

Pages Router: ルート直下の _app、_document、_error は対象外で、それ以外のアンダースコア付きページは有効です。index は取り除かれます。API Routes、Route Handlers、ほかのフレームワークのエンドポイントは includeApi または --api で有効にします。URL は HTTP メソッド、権限、エンドポイントの検証を表現しません。

URL の形の衝突（たとえば同じ場所の [id] と [slug]）や、推論された名前の衝突は生成を失敗させます。Next.js では、正規 URL の重複やオプションの catch-all との優先度の衝突も、Next と同じように失敗します。レイアウトをネストするルーター（Nuxt、Vue、React Router、TanStack）では、同じ URL を共有するレイアウトとその index はひとつのルートにまとめられます。


<a id="development"></a>

## 開発中の自動更新

Next.js: ラッパーは Next の起動前に生成し、その後は開発プロセスの中で直列化されたポーリングの watcher を動かします。ページの追加、削除、名前変更を検知し、モジュールは内容が変わったときだけ更新されます。webpack や Turbopack のフックには手を加えません。next start（本番サーバー）では一切書き込まないため、読み取り専用のデプロイでも安全です。

Vite 系フレームワーク: プラグインは buildStart で生成し、Vite の watcher の add/unlink イベントと named-routes の設定ファイルの変更に反応します。Vite のルートから package.json までさかのぼってプロジェクトのルートを見つけるので、Nuxt の srcDir でも動作します。

watcher は本番ビルド中には動かず、それ自体がプロセスを生かし続けることもありません。編集中に生成エラーが起きても最後の有効なモジュールは保たれ、エラーがログに出ます。設定ファイルがインポートしているモジュールを変更したときは再起動が必要です。watch: false で止まるのは継続的な更新だけで、最初の生成は行われます。


<a id="cli"></a>

## CLI と CI

バイナリ名は named-routes です（next-named-routes はエイリアス）。generate（デフォルト）はマニフェストを書き出します。list は検出したエントリーを JSON で出力します。check は書き込まずに比較し、古くなっていれば終了コード 1 で終わります。watch は最初に生成し、SIGINT/SIGTERM までポーリングを続けます。init は検出したフレームワーク用の named-routes.config.mjs を書き出し、既存の設定は決して上書きしません。

フラグ: --root <directory>、--config <file>、--framework <name>、--output <file>、--routes-dir <dir>、--router <auto|app|pages>、--api、--watch-interval <ms>、--version (-v)、--help (-h)。コマンドは、パッケージをローカルにインストールした利用側のプロジェクトで実行してください。

生成ファイルをコミットする場合は、ビルドの前に check を実行してください。統合はビルド時に再生成するため、ビルド後の check では、すでに古くなっていたコミット済みファイルを検出できません。生成は決定的かつアトミックで、タイムスタンプも含みません。ジェネレーターの署名がない既存のファイルは決して上書きしません。

```sh
npx named-routes init
npx named-routes generate --root ./apps/web
npx named-routes list --framework sveltekit
npx named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx named-routes check
npx named-routes watch
npx named-routes --help
```


<a id="generator-api"></a>

## ジェネレーターのプログラム API

discoverRoutes(options?) は何も書き込まずに root、framework、directories、routes、entries、ランタイムの defaults を返します。各エントリーには name、path、file、router、framework があり、必要に応じて variant と localized も付きます。明示的に追加したルートは file: null、router: explicit です。

generateRoutes(options?, { check?: boolean }?) はさらに output と changed を返します。check モードは古い出力を変更せずに拒否します。validateOptions(options) は未知のキーに対して INVALID_CONFIG を投げます。/generator と /config は Node のツールの中だけでインポートし、クライアントのコードでは使わないでください。withNamedRoutes は /next から、namedRoutes は /vite からインポートします。

```ts
import { discoverRoutes, generateRoutes } from "@triooo/next-named-routes/generator";
const discovery = await discoverRoutes({ root: "/path/to/app", framework: "nuxt" });
console.log(discovery.framework, discovery.entries);
const result = await generateRoutes({ root: "/path/to/app" });
console.log(result.output, result.changed);
await generateRoutes({ root: "/path/to/app" }, { check: true });
```


<a id="errors"></a>

## エラーとトラブルシューティング

NamedRouteError は Error を継承し、安定した code を公開しています。UNKNOWN_ROUTE は名前が存在しないこと、MISSING_PARAMETER は必須の値が省略されたこと、UNKNOWN_PARAMETER は余分なキーが query に属するか綴りが誤っていること、INVALID_PARAMETER は値の形が誤っているか禁止されたセグメントを含むこと、INVALID_LOCALE は i18n なしで言語を渡したか未設定の言語であることを意味します。

INVALID_PATTERN、INVALID_NAME、INVALID_MANIFEST は不正なルート定義を示します。INVALID_OPTIONS、INVALID_QUERY、INVALID_HASH は不正なオプションを示します。INVALID_BASE_PATH、INVALID_ORIGIN、INVALID_I18N は URL の defaults を拒否します。MISSING_ORIGIN は、絶対 URL を求める前に origin が必要であることを示します。GENERATION_ERROR は検出の衝突、安全でない出力、check での古い結果を、INVALID_CONFIG は設定の欠落、不正、綴りの誤りを扱います。

routes.generated が見つからない場合: 統合が実行されているか確認し、generate を実行し、output とインポートのエイリアスを確認してください。basePath や言語が重複する場合: フレームワークのリンクには相対 URL を使い、basePath/locale は通常の URL のときだけ渡してください。名前が古い場合: watcher が有効か確認し、ターミナルのエラーを見てください。ページを移動した後の型エラーは想定どおりです。推論された名前を更新するか、固定名を定義してください。

生成処理は手書きの出力ファイルの上書きを拒否します。無関係なコードに生成の署名を付けるのではなく、別の output を選んでください。生成された出力はルーティング対象のファイルの外に置いてください。動的な補間はリクエストを認可するものではありません。権限とアプリケーションの入力は目的地で検証してください。

```ts
import { NamedRouteError } from "@triooo/next-named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```


<a id="boundaries"></a>

## リライトと境界

これは URL ビルダーであり、ルーター、ミドルウェア、認可システム、HTTP クライアントの代わりではありません。実行時にルートを作ったり、リソースの存在を確認したり、訪問者の言語を検出したり、バックエンドにリクエストしたりはしません。

リダイレクト、リライト、ミドルウェアによる言語検出、コンポーネントのコードで宣言したパスは、引き続きアプリケーションの責任です。必要な外部パターンやリライト後のパターンは extraRoutes で明示的に対応付け、言語や basePath を二重に付けないようにしてください。スキャナーはフレームワークの設定ファイルを読まないので、設定は withNamedRoutes かオプションで渡してください。

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```


<a id="website"></a>

## ドキュメントサイト

このドキュメントは website/ にある Next.js アプリです。プロジェクトの公開サイトで、パッケージ自身を使って作られています。内部リンクはすべて route() を使い、プレイグラウンドと目的地のページは実際の App Router のルートで、英語・ポルトガル語・スペイン語・日本語のコンテンツは README を生成するのと同じ docs/content.json から来ています。

ランディングページでは、対応する各フレームワークを路線図の路線として、ジェネレーターの実際の出力を流す出発案内板、互換性の表、インストールの道のりとともに紹介しています。アニメーションは有限かユーザー操作によるもので、画面外では止まり、prefers-reduced-motion では無効になります。

Vercel にデプロイするには、Root Directory を website にしたプロジェクトを作り、"Include files outside the root directory" を有効のままにしてください。website/vercel.json がリポジトリをインストールし、パッケージをビルドしてからサイトをビルドします。環境変数は不要です。

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```


<a id="demos"></a>

## 試してみる: フレームワーク別デモ

examples/ には、対応する構成ごとに小さな実行可能アプリがあります。app-router と pages-router（Next.js）、nuxt、vue（unplugin-vue-router）、sveltekit、astro、react-router（flat routes）、tanstack-router、react（createRoutes でルートを手書き）です。どれも静的ページ、ユーザーの動的ページ、ドキュメントの catch-all ページに名前でリンクしています。

デモは file:../.. でパッケージに依存しているので、まずリポジトリのルートでパッケージを一度ビルドし、その後は npm で任意のデモをインストールして実行してください。生成モジュールは最初の dev または build で作られ、ページを追加するたびに変わります。どのデモも実際のフレームワークでビルドできます。

```sh
# Repository root, once:
pnpm install && pnpm build

# Any demo:
cd examples/nuxt        # or vue, sveltekit, astro, react-router, tanstack-router, react
npm install
npm run dev
# create a page and watch routes.generated.ts update
```


<a id="contributing"></a>

## ステップごとのコントリビュート

**1. 前提条件。** Node.js 20.19 以上（named-routes.config.ts を読み込むなら 22.18 以上）、Git、Python 3（README の生成にだけ使用）をインストールします。package.json で固定している pnpm 12.16.1 を有効にしてください: corepack enable、または npm install --global pnpm@12.16.1。

**2. クローンしてビルドする。** リポジトリをクローンし、ルートで pnpm install、続けて pnpm build を実行します。ビルドは dist/ を消してから src/*.ts を ESM の JavaScript、型宣言、ソースマップにコンパイルします。サイトとデモは TypeScript のソースではなく dist/ を使うので、src/ を変更するたびに pnpm build を実行し直してください。

**3. 構成を知る。** src/index.ts はブラウザーで動くランタイム（createRoutes、i18n、パターン）、src/frameworks.ts はファイル規約のアダプター、src/generator.ts は検出・検証・モジュールの書き出し、src/config.ts は named-routes.config.* の読み込み、src/next.ts と src/vite.ts は統合、src/cli.ts は named-routes バイナリです。tests/ には Node のテストスイートとスモークテストがあります。docs/locales.json が言語の一覧、docs/content.json が多言語のドキュメント、website/messages/<code>.json がインターフェースのテキストです。website/ はこのサイト、examples/ はフレームワークごとのデモ、scripts/ はリリース・ドキュメント・言語のヘルパーです。

**4. 作業しながらテストする。** pnpm check はビルドしてから、すべての Node テストと、正負両方の TypeScript の契約を実行します。CI が Node 20、22、24、26 で実行しているのもこれです。pnpm test:next は実際の Next.js 開発サーバーを起動します（先に pnpm --dir examples/app-router install で examples/app-router をインストール）。pnpm test:vite は実際の Vite 開発サーバーを起動します。pnpm test:package は tarball をパックして新しいプロジェクトにインストールします。pnpm release:check はこれらをすべて実行します。

**5. ドキュメントを編集する。** docs/content.json は、サイトとすべての README の唯一の情報源です。各セクションには id、title.<code>、paragraphs.<code>（言語ごとの段落の配列）、code、language があり、code は en、pt、es、ja です。原文は英語です。まず英語を書き、どの言語でも段落の数をそろえてください。**テキスト** はサイトでも README でも太字になります。新しいセクションは website/lib/docs.ts のグループにも（すべての言語のタイトル付きで）追加しないと、サイドバーに表示されません。ページは /docs/<id> です。

**6. 言語を翻訳して同期する。** 英語のテキストを変えたら pnpm locales（node scripts/sync-locales.mjs）を実行します。docs/content.json と website/messages/*.json の各言語を英語と比較し、サイトが動き続けるよう欠けている部分を英語で埋め、英語にもう存在しないインターフェースのキーを削除し、キーを en.json の順に並べ替え、"Needs translation" の一覧を出力します。一覧の項目をそれぞれの言語に翻訳したら pnpm locales:check（node scripts/sync-locales.mjs --check）を実行してください。何も変更せず、タイトルや段落の欠落、段落数の違い、**太字** の記号の不一致、インターフェースのキーの欠落や余り、{count} のような ICU のプレースホルダーの違い、キーの順序の乱れ、website/lib/locales.ts にない言語があると失敗します。CI もこのチェックを実行します。node scripts/sync-locales.mjs --untranslated は英語のままのテキストも一覧にするので、リリース前に言語を見直すのに役立ちます。

**7. README を同期する。** pnpm docs（python3 scripts/sync-docs.py）を実行すると、docs/content.json と docs/locales.json から README.md、README.pt-BR.md、README.es.md、README.ja.md を生成し直すので、すべてコミットしてください。どれかの README が古いと pnpm docs:check は失敗します。CI もこれを実行するので、README を手で編集しないでください。いつもの順序は、英語を編集 → pnpm locales → 翻訳 → pnpm locales:check → pnpm docs です。

**8. 新しい言語を追加する。** (a) docs/locales.json に code、name、htmlLang、readme（たとえば README.fr.md）と、README のラベル contents、references、localGuide を持つエントリーを追加します。(b) website/lib/locales.ts の Locale ユニオンにそのコードを追加し、website/lib/docs.ts の各グループにその言語のタイトルを追加します。(c) pnpm locales を実行すると、website/messages/<code>.json が作られ、docs/content.json は仮の英語テキストで埋められます。(d) 一覧に出た項目をすべて翻訳します。(e) 新しい README を package.json の files に追加します。(f) 日本語のように別のフォントや改行の扱いが必要な文字体系なら、website/app/transit.css に html[lang="<code>"] のルールを追加します。(g) pnpm locales:check、pnpm docs、pnpm --dir website check:i18n、pnpm --dir website build を実行します。ヘッダーの言語切り替えには新しい言語が自動的に表示されます。

**9. サイトのテキストを編集する。** インターフェースの文字列は website/messages/<code>.json の ui の下にあり、すべてのファイルで同じキーを持ちます。ICU の構文はチェックされるので、エスケープしていない波かっこは避け、プレースホルダーは同一に保ってください。新しいキーはまず en.json に追加し、pnpm locales を実行してから翻訳します。pnpm --dir website check:i18n がすべてのカタログを検証します。ランディングページに表示するフレームワークのデータ（案内板の行、路線図の路線、互換性の表）は website/lib/transit.ts にあり、ジェネレーターの実際の出力と一致している必要があります。

**10. サイトを動かす。** ルートで pnpm build を実行した後、pnpm --dir website install を一度だけ実行し、pnpm --dir website dev（または pnpm website）で起動します。サイトは link:.. でパッケージに依存しているので、src/ を変更したらパッケージをビルドし直して開発サーバーを再起動してください。言語はヘッダーの EN、PT、ES、JA で切り替えられます。プルリクエストの前に pnpm --dir website typecheck と pnpm --dir website build を実行してください。

**11. デモを試す。** examples/ の各フォルダーは小さなアプリです: cd examples/sveltekit（または nuxt、vue、astro、react-router、tanstack-router、react）、npm install、npm run dev。ページを追加して routes.generated.ts が変わる様子を見てください。Next.js のデモは pnpm を使います。

**12. フレームワークを追加する。** src/frameworks.ts にアダプター（sources、extensions、skipDirectory、map）を書き、detectFramework にそのパッケージを教えます。tests/frameworks.test.mjs に規約テストを追加し、examples/ にデモを作ってデモ用ワークフローのマトリックスに加え、すべての言語で docs/content.json に記載します。website/lib/transit.ts に路線を追加するのは、デモがビルドできてからにしてください。

**13. プルリクエストを出す。** 変更は焦点を絞り、回帰テストを追加し、次のバージョンとして CHANGELOG.md を更新し、pnpm release:check、pnpm locales:check、pnpm docs:check を実行してください。生成ファイル（dist/、routes.generated.ts、.next/、デモのビルド出力）は決してコミットしないでください。.gitignore ですでに除外しています。

**14. リリース（メンテナー向け）。** package.json の version を上げ、CHANGELOG のエントリーをそのバージョンに移し、pnpm release:check を実行してから、next-named-routes-vX.Y.Z というタグで GitHub のリリースを公開します。公開用ワークフローがタグを検証し、CI をもう一度実行し、npm の trusted publishing を使って provenance 付きで npm に公開します（npm のトークンは保存しません）。Apache License 2.0 が適用され、同梱フォントはそれぞれの OFL ライセンスに従います。

```sh
# 1-2. Prepare the repository
corepack enable                  # or: npm i -g pnpm@12.16.1
git clone <repository-url> next-named-routes && cd next-named-routes
pnpm install
pnpm build

# 4. Test
pnpm check                       # build + Node tests + TypeScript contracts
pnpm --dir examples/app-router install && pnpm test:next
pnpm test:vite
pnpm test:package
pnpm release:check               # everything above

# 5-7. Documentation in every language
$EDITOR docs/content.json        # English first
pnpm locales                     # fill gaps, list what needs translation
$EDITOR docs/content.json website/messages/*.json   # translate pt, es, ja
pnpm locales:check               # what CI runs
node scripts/sync-locales.mjs --untranslated
pnpm docs                        # README.md, .pt-BR, .es, .ja
pnpm docs:check

# 8. A new language (example: fr)
$EDITOR docs/locales.json website/lib/locales.ts website/lib/docs.ts
pnpm locales && pnpm locales:check && pnpm docs

# 10. Website
pnpm --dir website install
pnpm --dir website dev           # http://localhost:3000
pnpm --dir website check:i18n
pnpm --dir website typecheck && pnpm --dir website build

# 11. A demo
cd examples/nuxt && npm install && npm run dev
```


<a id="versioning"></a>

## バージョンとアップグレード

バージョン 1.x は、推論される名前、型付き URL 生成、フレームワークのアダプター、i18n、Next.js のラッパー、Vite プラグイン、CLI の公開契約を定めています。

パッチリリースは、ドキュメント化された API を保ったままバグを修正します。マイナーリリースは、新しいフレームワークのアダプターのような互換性のある機能を追加します。互換性を壊す変更には新しいメジャーバージョンが必要です。アップグレードの前に changelog を確認してください。

アップグレードしたら、開発サーバーを再起動してマニフェストを生成し直し、アプリケーションの型チェックとナビゲーションのテストを実行してください。ページを移動しても公開ルート名を保ちたい場合は、明示的なエイリアスを使ってください。

```sh
npm install @triooo/next-named-routes@^1
npx named-routes check
npx tsc --noEmit
```

## 公式リファレンス

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://uvr.esm.is/guide/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
