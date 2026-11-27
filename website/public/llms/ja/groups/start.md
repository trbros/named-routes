# はじめに

# このパッケージでできること

Topic: `overview` · Named Routes v2.2.0

Named Routes はフレームワークのルートから型付き URL ヘルパーを生成します。パスを組み立て直さず名前で指定できます。ルーターの置き換え、画面遷移、HTTP 通信は行いません。インストール後、フレームワークを選んでください。

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

Related topic IDs: installation, frameworks, naming, stable-names, helper-route, mcp-installation
---

# インストール

Topic: `installation` · Named Routes v2.2.0

パッケージマネージャーでインストールします。ジェネレーターは Node.js 22.12 以上、型は TypeScript 5.4 以上が必要です。ブラウザーランタイムには外部依存がなく、Node 側ではエンドポイントのパーサーを使用します。

```sh
npm install @triooo/named-routes
# pnpm
pnpm add @triooo/named-routes
# Yarn
yarn add @triooo/named-routes
# Bun
bun add @triooo/named-routes
```

Related topic IDs: frameworks, quick-start, configuration, mcp-installation
---

# フレームワークを選ぶ

Topic: `frameworks` · Named Routes v2.2.0

パッケージをインストールし、フレームワークの統合を追加してページを作成します。以下のリンクから設定、規則、ナビゲーション、デプロイ、アセット、言語、エンドポイントを個別に確認できます。

Related topic IDs: nextjs, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual-routes
---

# 最初の名前付きルート (Next.js)

Topic: `quick-start` · Named Routes v2.2.0

Next.js の最小設定です。next.config.ts にラッパーを追加し、開発サーバーを起動してナビゲーションガイドへ進みます。別のフレームワークには専用ガイドを使用してください。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

Related topic IDs: nextjs-navigation, frameworks, generated-source, mcp-installation
---

# 自動命名のルール

Topic: `naming` · Named Routes v2.2.0

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
---

# 生成マニフェストを読む

Topic: `generated-source` · Named Routes v2.2.0

各エントリに相対ファイルパスを表示します。通常のキーは文字列リテラルで、__proto__ は安全のため計算キーのままです。生成ファイルは直接編集しないでください。

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```
---

# ほかの選択肢との比較

Topic: `comparison` · Named Routes v2.2.0

型付きの URL を生成するパッケージやフレームワークの機能はほかにもあります。違いは、ルートをどこから得るか、ルートに名前があるか、どのフレームワークに対応するか、言語がモデルに含まれるかです。表は各プロジェクトがドキュメント化している内容、または公開しているものをまとめたもので、npm の数値は 2026-11-05 に取得した最新バージョンと直近 1 か月のダウンロード数です。✓ は対応、½ は一部対応、— は提供なし、またはドキュメントなしを意味します。

**このパッケージの違い。** 名前は既存のファイルから推論され、Next.js、Nuxt、Vue、SvelteKit、Astro、React Router、TanStack Router のどれでも同じになります。言語（プレフィックス、翻訳されたパス、ドメイン）も同じ型付きの呼び出しに含まれます。そして route() はどのルーターの外でも使える普通の文字列を返すので、リダイレクト、メール、サイトマップ、モノレポで複数のアプリが共有するパッケージでも使えます。

**ほかの選択肢が向いている場合。** 使うフレームワークがひとつで、パスでルートを指定することに不満がなければ、そのフレームワークの組み込み機能なら依存を増やさずに済みます。検索パラメーターをスキーマ（Zod、Valibot）で検証したいなら、next-typesafe-url や next-safe-navigation が対応していますが、このパッケージは対応していません。ルートが Laravel のバックエンドにあるなら Ziggy が自然な選択です。next-routes は React 15/16 時代の Pages Router 向けで、スコープなしの named-routes は名前が似ているだけの 2022 年の無関係なプロジェクトです。

**フレームワーク組み込みの機能。** Next.js の typedRoutes、React Router の href()、SvelteKit の resolve()、TanStack Router は、そのフレームワーク独自の構文で書いたパスを型付けします。Nuxt の typedPages は Nuxt のルート名を型付けします。いずれもひとつのフレームワークの中で動作し、名前や言語のモデルをほかと共有しません。Astro の getRelativeLocaleUrl() は、型のないパスから言語付きの URL を作ります。

**パッケージ**

| パッケージ | フレームワーク | ルートの取得元 | 名前 | 型付きパラメーター | i18n | URL ビルダー | npm（最新 · 月間） |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **@triooo/named-routes** | Next.js, Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router | files · `createRoutes()` | ✓ `users.$user` | ✓ | ✓ | ✓ `route()` | 1.0.0 · new |
| nextjs-routes | Next.js | files | — `"/users/[id]"` | ✓ | ½ Pages Router | ✓ `route()` | 2.2.5 · 173k |
| next-typesafe-url | Next.js (peer ≤ 15) | files + Zod | — `"/users/[id]"` | ✓ + Zod | — | ✓ `$path()` | 6.1.0 · 41k |
| next-safe-navigation | Next.js App Router | `defineRoute()` | ✓ | ✓ + schema | — | ✓ `routes.name()` | 0.4.0 · 13k |
| vite-plugin-kit-routes | SvelteKit | files | — `"/about"` | ✓ | — | ✓ `route()` | 1.1.2 · 24k |
| typesafe-routes | any | `createRoutes({})` | ✓ `routes.users.edit` | ✓ | — | ✓ `renderPath()` | 12.3.0 · 25k |
| ziggy-js | any + Laravel | Laravel routes | ✓ Laravel | ✓ | — | ✓ `route()` | 2.6.5 · 567k |
| next-routes | Next.js Pages (React ≤ 16) | `routes.add()` | ✓ | — | — | ✓ `pushRoute()` | 1.4.2 · 49k |
| named-routes | Next.js Pages | `add(name, path)` | ✓ enum | ½ | — | ✓ `pathnameForParams()` | 0.1.0 · 0.3k |

**フレームワーク組み込み**

| フレームワーク | 機能 | ルートのキー | 型付きパラメーター | フレームワーク間で共通の名前 | 言語 |
| --- | --- | --- | --- | --- | --- |
| Next.js 16 | `typedRoutes: true` | `"/users/[id]"` | ✓ | — | — |
| React Router 7 | `href()` | `"/users/:id"` | ✓ | — | — |
| SvelteKit 2.26+ | `resolve()` | `"/blog/[slug]"` | ✓ | — | — |
| Nuxt 4 | `experimental.typedPages` | `users-id` | ✓ | — | ½ @nuxtjs/i18n |
| TanStack Router | `<Link to>` | `"/posts/$postId"` | ✓ | — | — |
| Astro 5 | `getRelativeLocaleUrl()` | `string` | — | — | ✓ |
---

# 生成の仕組み

Topic: `architecture` · Named Routes v2.2.0

Node ジェネレーターはファイルとルート表を読み込みます。エンドポイント宣言は静的に解析し、ハンドラーを実行しません。ブラウザーランタイムは Node.js を import せず、ページ配信はフレームワークが担当します。

```sh
npx @triooo/named-routes list
```

Related topic IDs: discovery, generator-api, generated-source
