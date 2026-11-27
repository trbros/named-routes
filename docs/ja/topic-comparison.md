# ほかの選択肢との比較

[ドキュメント](index.md) / [はじめに](getting-started.md)

[English](../en/topic-comparison.md) · [Português](../pt/topic-comparison.md) · [Español](../es/topic-comparison.md) · [日本語](../ja/topic-comparison.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="comparison"></a>

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

← 前へ: [生成マニフェストを読む](topic-generated-source.md) · [全トピック](getting-started.md) · 次へ: [生成の仕組み](topic-architecture.md) →
