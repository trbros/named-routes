# はじめに · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/getting-started.md) · [Português](../pt/getting-started.md) · [Español](../es/getting-started.md) · [日本語](../ja/getting-started.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [このパッケージでできること](#overview)
- [ほかの選択肢との比較](#comparison)
- [インストール](#installation)
- [Next.js の初回セットアップ](#quick-start)
- [自動命名のルール](#naming)

<a id="overview"></a>

## このパッケージでできること

Named Routes は、ルート、URL、アセットのための型安全なツールキットです。フレームワークがすでにルーティングしているページを検出し、型付きヘルパーを生成します。ナビゲーション用の route()、公開ファイルと CDN URL 用の asset()、既存 URL を読み取り・ローカライズ・正規化するヘルパーです。ファイルシステムが引き続き信頼できる唯一の情報源です。

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

<a id="comparison"></a>

## ほかの選択肢との比較

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

**公開アセット。** 生成モジュールから `asset` をインポートし、公開ディレクトリからの相対パス（例：`asset("images/logo.svg")`）を渡します。デフォルトではナビゲーションのベースを含みますが、ロケールは含めません。別のパスや CDN から配信する場合は `defaults.assetBase` を明示します。バンドラーで処理されたアセットには使用しないでください。公開アセットの項目を参照してください。

```ts
// next.config.ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({ basePath: "/app" });

// In your application:
import { asset, route } from "@/routes.generated";
route("user.profile"); // /user/profile (Next Link)
route("users.$user", { user: "ana" }); // /users/ana
route("users.$user", { user: "ana" }, { basePath: true }); // /app/users/ana
asset("images/logo.svg"); // /app/images/logo.svg
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

---

[README に戻る](../../README.ja.md) · 次へ: [フレームワーク](frameworks.md) →
