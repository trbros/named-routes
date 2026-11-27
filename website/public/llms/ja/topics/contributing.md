# ステップごとのコントリビュート

Topic: `contributing` · Named Routes v2.2.0

**1. 前提条件。** Node.js 22.12 以上（named-routes.config.ts を読み込むなら 22.18 以上）、Git、Python 3（README の生成にだけ使用）をインストールします。package.json で固定している pnpm 12.16.1 を有効にしてください: corepack enable、または npm install --global pnpm@12.16.1。

**2. クローンしてビルドする。** リポジトリをクローンし、ルートで pnpm install、続けて pnpm build を実行します。ビルドは dist/ を消してから src/*.ts を ESM の JavaScript、型宣言、ソースマップにコンパイルします。サイトとデモは TypeScript のソースではなく dist/ を使うので、src/ を変更するたびに pnpm build を実行し直してください。

**3. 構成を知る。** src/index.ts はブラウザーで動くランタイム（createRoutes、i18n、パターン）、src/frameworks.ts はファイル規約のアダプター、src/generator.ts は検出・検証・モジュールの書き出し、src/config.ts は named-routes.config.* の読み込み、src/next.ts と src/vite.ts は統合、src/cli.ts は named-routes バイナリです。tests/ には Node のテストスイートとスモークテストがあります。docs/locales.json が言語の一覧、docs/content.json が多言語のドキュメント、website/messages/<code>.json がインターフェースのテキストです。website/ はこのサイト、examples/ はフレームワークごとのデモ、scripts/ はリリース・ドキュメント・言語のヘルパーです。

**4. 作業しながらテストする。** pnpm check はビルドしてから、すべての Node テストと、正負両方の TypeScript の契約を実行します。CI が Node 20、22、24、26 で実行しているのもこれです。pnpm test:next は実際の Next.js 開発サーバーを起動します（先に pnpm --dir examples/app-router install で examples/app-router をインストール）。pnpm test:vite は実際の Vite 開発サーバーを起動します。pnpm test:package は tarball をパックして新しいプロジェクトにインストールします。pnpm release:check はこれらをすべて実行します。

**5. ドキュメントを編集する。** docs/content.json は、サイトとすべての README の唯一の情報源です。各セクションには id、title.<code>、paragraphs.<code>（言語ごとの段落の配列）、code、language があり、code は en、pt、es、ja です。原文は英語です。まず英語を書き、どの言語でも段落の数をそろえてください。**テキスト** はサイトでも README でも太字になります。新しいセクションは docs/groups.json のグループ（サイトのサイドバーと README のトピックページ）にも追加しないと、pnpm run docs が失敗します。ページは /docs/<id> です。

**6. 言語を翻訳して同期する。** 英語のテキストを変えたら pnpm locales（node scripts/sync-locales.mjs）を実行します。docs/content.json と website/messages/*.json の各言語を英語と比較し、サイトが動き続けるよう欠けている部分を英語で埋め、英語にもう存在しないインターフェースのキーを削除し、キーを en.json の順に並べ替え、"Needs translation" の一覧を出力します。一覧の項目をそれぞれの言語に翻訳したら pnpm locales:check（node scripts/sync-locales.mjs --check）を実行してください。何も変更せず、タイトルや段落の欠落、段落数の違い、**太字** の記号の不一致、インターフェースのキーの欠落や余り、{count} のような ICU のプレースホルダーの違い、キーの順序の乱れ、website/lib/locales.ts にない言語があると失敗します。CI もこのチェックを実行します。node scripts/sync-locales.mjs --untranslated は英語のままのテキストも一覧にするので、リリース前に言語を見直すのに役立ちます。

**7. README を同期する。** pnpm run docs（python3 scripts/sync-docs.py）を実行すると、docs/content.json、docs/groups.json、docs/locales.json から README.md、README.pt-BR.md、README.es.md、README.ja.md（要点と目次）と docs/<code>/*.md のトピックページ（docs/groups.json のグループごとに 1 つ）を生成し直すので、すべてコミットしてください。これらのファイルのどれかが古いと pnpm run docs:check は失敗します。CI もこれを実行するので、手で編集しないでください。いつもの順序は、英語を編集 → pnpm locales → 翻訳 → pnpm locales:check → pnpm run docs です。

**8. 新しい言語を追加する。** (a) docs/locales.json に code、name、htmlLang、readme（たとえば README.fr.md）と、README のラベル contents、references、localGuide、documentation、back、previous、next を持つエントリーを追加します。(b) website/lib/locales.ts の Locale ユニオンにそのコードを追加し、docs/groups.json の各グループにその言語のタイトルを追加します。(c) pnpm locales を実行すると、website/messages/<code>.json が作られ、docs/content.json は仮の英語テキストで埋められます。(d) 一覧に出た項目をすべて翻訳します。(e) 新しい README を package.json の files に追加します。(f) 日本語のように別のフォントや改行の扱いが必要な文字体系なら、website/app/transit.css に html[lang="<code>"] のルールを追加します。(g) pnpm locales:check、pnpm run docs、pnpm --dir website check:i18n、pnpm --dir website build を実行します。ヘッダーの言語切り替えには新しい言語が自動的に表示されます。

**9. サイトのテキストを編集する。** インターフェースの文字列は website/messages/<code>.json の ui の下にあり、すべてのファイルで同じキーを持ちます。ICU の構文はチェックされるので、エスケープしていない波かっこは避け、プレースホルダーは同一に保ってください。新しいキーはまず en.json に追加し、pnpm locales を実行してから翻訳します。pnpm --dir website check:i18n がすべてのカタログを検証します。ランディングページに表示するフレームワークのデータ（案内板の行、路線図の路線、互換性の表）は website/lib/transit.ts にあり、ジェネレーターの実際の出力と一致している必要があります。

**10. サイトを動かす。** ルートで pnpm build を実行した後、pnpm --dir website install を一度だけ実行し、pnpm --dir website dev（または pnpm website）で起動します。サイトは link:.. でパッケージに依存しているので、src/ を変更したらパッケージをビルドし直して開発サーバーを再起動してください。言語はヘッダーの EN、PT、ES、JA で切り替えられます。プルリクエストの前に pnpm --dir website typecheck と pnpm --dir website build を実行してください。

**11. デモを試す。** examples/ の各フォルダーは小さなアプリです: cd examples/sveltekit（または nuxt、vue、astro、react-router、tanstack-router、react）、npm install、npm run dev。ページを追加して routes.generated.ts が変わる様子を見てください。Next.js のデモは pnpm を使います。

**12. フレームワークを追加する。** src/frameworks.ts にアダプター（sources、extensions、skipDirectory、map）を書き、detectFramework にそのパッケージを教えます。tests/frameworks.test.mjs に規約テストを追加し、examples/ にデモを作ってデモ用ワークフローのマトリックスに加え、すべての言語で docs/content.json に記載します。website/lib/transit.ts に路線を追加するのは、デモがビルドできてからにしてください。

**13. プルリクエストを出す。** 変更は焦点を絞り、回帰テストを追加し、次のバージョンとして CHANGELOG.md を更新し、pnpm release:check、pnpm locales:check、pnpm run docs:check を実行してください。生成ファイル（dist/、routes.generated.ts、.next/、デモのビルド出力）は決してコミットしないでください。.gitignore ですでに除外しています。

**14. リリース（メンテナー向け）。** package.json の version を上げ、CHANGELOG のエントリーをそのバージョンに移し、pnpm release:check を実行してから、named-routes-vX.Y.Z というタグで GitHub のリリースを公開します。公開用ワークフローがタグを検証し、CI をもう一度実行し、npm の trusted publishing を使って provenance 付きで npm に公開します（npm のトークンは保存しません）。Apache License 2.0 が適用され、同梱フォントはそれぞれの OFL ライセンスに従います。

```sh
git clone https://github.com/trbros/named-routes.git
cd named-routes
pnpm install
pnpm run check
```

Related topic IDs: website, demos, versioning, cli-check
