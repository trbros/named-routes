# プロジェクト · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/project.md) · [Português](../pt/project.md) · [Español](../es/project.md) · [日本語](../ja/project.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [ドキュメントサイト](#website)
- [試してみる: フレームワーク別デモ](#demos)
- [ステップごとのコントリビュート](#contributing)
- [バージョンとアップグレード](#versioning)

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

**5. ドキュメントを編集する。** docs/content.json は、サイトとすべての README の唯一の情報源です。各セクションには id、title.<code>、paragraphs.<code>（言語ごとの段落の配列）、code、language があり、code は en、pt、es、ja です。原文は英語です。まず英語を書き、どの言語でも段落の数をそろえてください。**テキスト** はサイトでも README でも太字になります。新しいセクションは docs/groups.json のグループ（サイトのサイドバーと README のトピックページ）にも追加しないと、pnpm docs が失敗します。ページは /docs/<id> です。

**6. 言語を翻訳して同期する。** 英語のテキストを変えたら pnpm locales（node scripts/sync-locales.mjs）を実行します。docs/content.json と website/messages/*.json の各言語を英語と比較し、サイトが動き続けるよう欠けている部分を英語で埋め、英語にもう存在しないインターフェースのキーを削除し、キーを en.json の順に並べ替え、"Needs translation" の一覧を出力します。一覧の項目をそれぞれの言語に翻訳したら pnpm locales:check（node scripts/sync-locales.mjs --check）を実行してください。何も変更せず、タイトルや段落の欠落、段落数の違い、**太字** の記号の不一致、インターフェースのキーの欠落や余り、{count} のような ICU のプレースホルダーの違い、キーの順序の乱れ、website/lib/locales.ts にない言語があると失敗します。CI もこのチェックを実行します。node scripts/sync-locales.mjs --untranslated は英語のままのテキストも一覧にするので、リリース前に言語を見直すのに役立ちます。

**7. README を同期する。** pnpm docs（python3 scripts/sync-docs.py）を実行すると、docs/content.json、docs/groups.json、docs/locales.json から README.md、README.pt-BR.md、README.es.md、README.ja.md（要点と目次）と docs/<code>/*.md のトピックページ（docs/groups.json のグループごとに 1 つ）を生成し直すので、すべてコミットしてください。これらのファイルのどれかが古いと pnpm docs:check は失敗します。CI もこれを実行するので、手で編集しないでください。いつもの順序は、英語を編集 → pnpm locales → 翻訳 → pnpm locales:check → pnpm docs です。

**8. 新しい言語を追加する。** (a) docs/locales.json に code、name、htmlLang、readme（たとえば README.fr.md）と、README のラベル contents、references、localGuide、documentation、back、previous、next を持つエントリーを追加します。(b) website/lib/locales.ts の Locale ユニオンにそのコードを追加し、docs/groups.json の各グループにその言語のタイトルを追加します。(c) pnpm locales を実行すると、website/messages/<code>.json が作られ、docs/content.json は仮の英語テキストで埋められます。(d) 一覧に出た項目をすべて翻訳します。(e) 新しい README を package.json の files に追加します。(f) 日本語のように別のフォントや改行の扱いが必要な文字体系なら、website/app/transit.css に html[lang="<code>"] のルールを追加します。(g) pnpm locales:check、pnpm docs、pnpm --dir website check:i18n、pnpm --dir website build を実行します。ヘッダーの言語切り替えには新しい言語が自動的に表示されます。

**9. サイトのテキストを編集する。** インターフェースの文字列は website/messages/<code>.json の ui の下にあり、すべてのファイルで同じキーを持ちます。ICU の構文はチェックされるので、エスケープしていない波かっこは避け、プレースホルダーは同一に保ってください。新しいキーはまず en.json に追加し、pnpm locales を実行してから翻訳します。pnpm --dir website check:i18n がすべてのカタログを検証します。ランディングページに表示するフレームワークのデータ（案内板の行、路線図の路線、互換性の表）は website/lib/transit.ts にあり、ジェネレーターの実際の出力と一致している必要があります。

**10. サイトを動かす。** ルートで pnpm build を実行した後、pnpm --dir website install を一度だけ実行し、pnpm --dir website dev（または pnpm website）で起動します。サイトは link:.. でパッケージに依存しているので、src/ を変更したらパッケージをビルドし直して開発サーバーを再起動してください。言語はヘッダーの EN、PT、ES、JA で切り替えられます。プルリクエストの前に pnpm --dir website typecheck と pnpm --dir website build を実行してください。

**11. デモを試す。** examples/ の各フォルダーは小さなアプリです: cd examples/sveltekit（または nuxt、vue、astro、react-router、tanstack-router、react）、npm install、npm run dev。ページを追加して routes.generated.ts が変わる様子を見てください。Next.js のデモは pnpm を使います。

**12. フレームワークを追加する。** src/frameworks.ts にアダプター（sources、extensions、skipDirectory、map）を書き、detectFramework にそのパッケージを教えます。tests/frameworks.test.mjs に規約テストを追加し、examples/ にデモを作ってデモ用ワークフローのマトリックスに加え、すべての言語で docs/content.json に記載します。website/lib/transit.ts に路線を追加するのは、デモがビルドできてからにしてください。

**13. プルリクエストを出す。** 変更は焦点を絞り、回帰テストを追加し、次のバージョンとして CHANGELOG.md を更新し、pnpm release:check、pnpm locales:check、pnpm docs:check を実行してください。生成ファイル（dist/、routes.generated.ts、.next/、デモのビルド出力）は決してコミットしないでください。.gitignore ですでに除外しています。

**14. リリース（メンテナー向け）。** package.json の version を上げ、CHANGELOG のエントリーをそのバージョンに移し、pnpm release:check を実行してから、named-routes-vX.Y.Z というタグで GitHub のリリースを公開します。公開用ワークフローがタグを検証し、CI をもう一度実行し、npm の trusted publishing を使って provenance 付きで npm に公開します（npm のトークンは保存しません）。Apache License 2.0 が適用され、同梱フォントはそれぞれの OFL ライセンスに従います。

```sh
# 1-2. Prepare the repository
corepack enable                  # or: npm i -g pnpm@12.16.1
git clone <repository-url> named-routes && cd named-routes
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
pnpm docs                        # README.*.md and docs/<code>/*.md
pnpm docs:check

# 8. A new language (example: fr)
$EDITOR docs/locales.json docs/groups.json website/lib/locales.ts
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
npm install @triooo/named-routes@^1
npx named-routes check
npx tsc --noEmit
```

---

← 前へ: [ガイド](guides.md) · [README に戻る](../../README.ja.md)
