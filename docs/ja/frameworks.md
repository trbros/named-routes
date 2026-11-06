# フレームワーク · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/frameworks.md) · [Português](../pt/frameworks.md) · [Español](../es/frameworks.md) · [日本語](../ja/frameworks.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [ほかのフレームワーク（Vite プラグイン）](#frameworks)
- [Next.js](#nextjs)
- [Nuxt](#nuxt)
- [Vue Router](#vue)
- [SvelteKit](#sveltekit)
- [Astro](#astro)
- [React Router / Remix](#react-router)
- [TanStack Router](#tanstack-router)
- [手動ルート（React、Vue、任意のルーター）](#manual-routes)

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

<a id="nextjs"></a>

## Next.js

next.config を @triooo/named-routes/next の withNamedRoutes でラップします。モジュールは next dev と next build の前に生成され、next dev の中では watcher が最新に保ち、next start では一切書き込まないため、読み取り専用のデプロイでも安全です。ラッパーは pageExtensions、basePath、trailingSlash、Pages Router の i18n 設定を引き継ぎます。

**規約。** app/ と pages/（または src/app と src/pages）を合わせて読み取ります。App Router: page ファイルのみ。ルートグループと並列スロットは省かれ、インターセプトは正規の URL に解決され、_ で始まるプライベートフォルダーは無視され、%5F はアンダースコアになります。Pages Router: index は取り除かれ、_app、_document、_error は対象外です。Route Handlers と pages/api は includeApi で有効にできます。appDir と pagesDir で独自のフォルダーを指定できます（片方を false にすると読み取りません）。

**ナビゲーション。** ヘルパーは next/link、next/navigation または next/router の useRouter、redirect で使える普通の文字列を返します。Link とルーターは basePath を自分で付けるので、{ basePath: true } は通常のリンクや fetch のときだけ指定してください。next-intl では routing オブジェクトを i18n として渡すと、app/[locale]/about は about になり、next-intl の Link には内部パスが渡ります。

**検証。** CI では実際の Next 16 開発サーバー（App Router と Pages Router、basePath とページのライブ検出を含む）を動かしています。デモ: examples/app-router と examples/pages-router。App Router と Pages Router のレシピもあわせて参照してください。

```tsx
import { withNamedRoutes } from "@triooo/named-routes/next";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { createRoutes } from "@triooo/named-routes";
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

---

← 前へ: [はじめに](getting-started.md) · [README に戻る](../../README.ja.md) · 次へ: [ルートで構築する](build-with-routes.md) →
