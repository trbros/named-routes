# 変更履歴

## 2.2.0 - 2026-11-26

このリリースでは名前付き URL の生成を明確にし、フレームワークに応じたデプロイパスとエンドポイント検出を改善し、ドキュメントを拡充して AI エージェント連携をメインパッケージに統合します。Windows での CLI 実行とアトミックなファイル置換も強化します。

### 追加

- `route.url(name, { params, query, ... })`：位置引数の空欄の代わりに明示的なオプションオブジェクトを使い、設定済みのベースパスを既定で含む公開 URL を生成します。ルート名とパラメーターの型付けは維持されます。
- `naming.style: "semantic"` によるオプトインの意味的命名。`index` と `show` の規則を含みます。アプリ固有の安定した別名には引き続き明示的な `names` マッピングを使用できます。
- `includeApi` が有効で HTTP メソッドを静的に識別できる場合、`route.endpoint(name, method)` と生成される `api` エクスポートで型付き HTTP エンドポイント記述子を提供します。メソッドと URL を保持し、ハンドラーの実行やリクエスト送信は行いません。検出はフレームワークに依存します。
- バージョン管理された `llms.txt`、`llms-full.txt`、エージェント向け規則、フレームワーク・トピック別 Markdown リファレンスを英語、ポルトガル語、スペイン語、日本語のドキュメントと同期します。
- 読み取り専用の Model Context Protocol (MCP) サーバーを `@triooo/named-routes` に同梱し、`named-routes mcp` と `named-routes-mcp` で利用可能にします。別の npm パッケージは不要です。stdio とオプション依存関係を使用し、ブラウザーランタイムから分離します。
- 6 つの MCP ツール：`get_agent_contract`、`search_docs`、`get_topic`、`get_framework_guide`、`list_routes`、`get_route`。アプリコードの実行やファイル変更なしで、バージョン付きドキュメントと既存の生成済みルートマニフェストを参照できます。

### 変更

- Astro、SvelteKit、ジェネレーターによる手動マニフェストでは設定済みナビゲーションベースを自動付与します。Next.js、Nuxt、Vue Router、React Router、TanStack Router はネイティブルーターが処理するナビゲーション用に既定で内部パスを維持します。
- `route.url()` は各フレームワークで公開パスを生成する選択肢です。明示的な `basePath: true` または `basePath: false` で `route()` のベース付与を制御でき、直接の `createRoutes()` は従来の既定動作を維持します。
- 生成マニフェストに相対ソースファイルパスのコメントを追加し、安全な場合は不要な計算プロパティではなく通常の文字列リテラルキーを使います。`__proto__` キーは計算プロパティ構文で保護します。
- npm の `bin` マッピングでコンパイル済み CLI の直接指定を安定したランチャーに置き換えます。カレントディレクトリによらず自身の位置から実装を解決します。
- フレームワークのサンプルを静的ページから複数ページのナビゲーション、動的パラメーター、対応する場合のエンドポイント例へ拡張します。

### 修正

- `TypedNamedRoutes` に `asset` ヘルパーを明示的に公開し、生成 TypeScript モジュールでのプロパティ欠落エラーを防ぎます。
- `npx @triooo/named-routes` を含むスコープ付き npm 呼び出しで CLI のパッケージングと実行ファイル解決を改善し、コンパイル済みファイルの欠落を明示的に報告します。
- ルートマニフェストとフレームワークスナップショットのアトミック置換時に一時的な `EPERM`、`EACCES`、`EBUSY` を再試行します。上限付きの段階的バックオフで直前の有効なファイルを保持し、永続的・非一時的エラーは伝播します。Windows の TanStack Router で開発中にルートを削除した際の障害に対応します。

### ドキュメント

- 個別に移動可能なトピック、フレームワーク専用ガイド、用途別 API リファレンス、設定、CLI コマンド、実践レシピに再構成します。既存のトピック ID と Markdown アンカーを維持します。
- ドメインルートへのデプロイと `base` または `basePath` 配下へのデプロイの例を分離し、ネイティブルーターがプレフィックスを付与する場合と公開 URL が必要な場合を説明します。
- 4 言語の README と生成 Markdown を更新し、関連トピックへの移動、検索改善、トピック一覧の shadcn/ui Accordion と Button を追加します。
- MCP 専用ガイド：インストール、ローカルプロジェクト設定、Claude Desktop と Claude Code、Cursor、Codex、VS Code と GitHub Copilot、Windows ランチャー、ツール一覧、利用例、安全性の境界、MCP Inspector によるトラブルシューティング。
- 共有ドキュメントソースから MCP カタログ、AI エージェント向けリファレンス、サイトドキュメント、README を同期します。
- 英語、ポルトガル語、スペイン語、日本語の完全にローカライズされた変更履歴を追加し、リリースページとドキュメントのバージョン選択を現在の言語に対応させる。

### ウェブサイトと SEO

- ドキュメントカタログと対応言語から `sitemap.xml` を生成し、サイトマップを通知する `robots.txt` を追加します。
- ページタイトル・説明のローカライズ、canonical URL、`x-default` を含む相互 `hreflang`、Open Graph と Twitter Card メタデータ、ソフトウェアとパンくずリストの構造化データを追加します。
- 公開オリジンとデプロイベースを一元化して SEO URL を統一します。Google Search Console の確認に対応し、プレビュー、パラメーター付きデモ、機械可読ドキュメントミラーを重複コンテンツとしてインデックスされないようにします。

### テストとリリースツール

- 公開 URL、フレームワーク別ベース処理、意味的命名、生成エンドポイント記述子、型付きアセットの回帰テストと TypeScript 契約テストを拡充します。
- 安定した CLI ランチャー、スコープ付き npm 実行、統合 MCP エントリーポイントのパッケージスモークテストを拡充し、MCP カタログ・マニフェスト解析・プロトコルのテストを追加します。
- 一時的なファイルシステムエラー、永続的エラー、以前の生成ファイルの保持について上限付き再試行の回帰テストを追加します。
- ドキュメントのコード例検証と、サイトマップ URL、canonical メタデータ、言語別 alternates、デプロイパスの SEO 検証を追加します。
- 英語の変更履歴と各項目の翻訳から翻訳済み Markdown ファイルとウェブサイト用の静的カタログを生成する。CI は欠落または古い翻訳を拒否する。

### アップグレード時の注意事項

- 以前 `route()` の結果に手動でプレフィックスを付けていた Astro、SvelteKit、ジェネレーターによる手動プロジェクトでは追加プレフィックスを削除するか、第 3 引数に `{ basePath: false }` を指定してください。公開 URL には手動連結ではなく `route.url()` を使用してください。
- 意味的命名はオプトインのままです。新しい命名スタイルや明示的な別名を設定しない限り既存の自動命名は変わりません。
- 更新後は `pnpm exec named-routes generate` でルートモジュールを再生成するか、フレームワーク連携を再起動してください。生成マニフェストを手動で編集しないでください。
- MCP はメインパッケージに含まれます。別の MCP パッケージではなく `npx @triooo/named-routes mcp` を使用してください。インストール時に MCP サポートを省略した場合はオプション依存関係をインストールしてください。

## 2.1.0 - 2026-11-26

ルートヘルパーと公開アセットのドキュメントを個別の多言語ページに分割し、既存 API ごとの例と独立した CDN 設定を提供します。

### 追加

- `@triooo/named-routes/astro`：Vite のアセットベースとは独立して Astro の最終 `base` を継承するネイティブ連携。
- `namedRoutes({ routerBase })` は SvelteKit、Vue Router、React Router/Remix、TanStack Router のルータープレフィックスまたは getter を受け取ります。Vite のベースがナビゲーションベースでもある場合は `inheritViteBase` で有効化します。
- `route.localize(url, locale?, options?)` はロケールプレフィックスがなくても設定言語の翻訳済み別名を解決し、デコード済みパラメーターと元のクエリ・フラグメントを保持します。カスタムプレフィックス、ベースパス、設定ドメインに対応し、曖昧または非ローカライズルートは `null` を返します。既存の `route.match()` の意味は不変です。
- 単独の generate、watch、check、list、doctor に `--base-path` を追加しました。フレームワーク連携は最後に成功した有効な公開ベースを `.named-routes/` にキャッシュし、CLI 再生成で失われないようにします。
- オプトインの公開アセット検出、厳密な生成アセットパス型、asset.has()、asset.paths()、asset.info() を追加しました。
- アセット内容のハッシュ化と asset(path, { version: true }) によるキャッシュ無効化 URL を追加しました。監視対象の変更でマニフェストを再生成します。
- クエリの変更、複数値、オプションの名前付きスキーマ検証向けに route.withQuery() を追加しました。
- SEO、SSR、マルチテナント URL 向けに route.canonical()、route.alternates()、分離された route.withDefaults() コンテキストを追加しました。
- ルートとアセットの診断、JSON 出力、CI 用 strict モードを備えた読み取り専用 CLI audit を追加しました。
- 高度なヘルパーの多言語ドキュメント、実ランタイムの URL プレイグラウンド、単体・型・ジェネレーターテスト、実運用ビルドのアセットバージョン E2E 検証を追加しました。
- 公開パス・CDN URL 用の `asset()` / `route.asset()` と独立した `defaults.assetBase`、アセット型のエクスポートと生成エクスポート名のカスタマイズを追加しました。9 サンプルすべての公開ファイルのブラウザー検証、route/localize/match/parseQuery の回帰テスト、多言語アセットガイドを追加しました。

### 修正

- Nuxt は `app.baseURL` を継承するようになりました。Next.js は従来の自動 `basePath` 動作を維持し、ベースの変更・削除時に CLI スナップショットを同期します。
- Vite は生成モジュールとベーススナップショットのアトミック書き込みを無視し、不要な監視処理を防ぎます。canonical ルート名はデプロイプレフィックスから独立し、リンクに二重プレフィックスを付けません。
- ビルドで CLI の shebang と実行権限を確認し、パッケージスモークテストでローカルインストールの有無両方の npm 実行ファイル解決を検証します。CLI ドキュメントでは無関係な非スコープパッケージを避けるため `npx @triooo/named-routes` を使用します。
- フレームワーク連携フック、ベースの上書き、翻訳パスの解決（曖昧性、クエリ・フラグメント保持、動的セグメントを含む）の回帰テストを追加しました。
- フレームワーク生成物の更新を待つことで TanStack Router の生成中にルートツリーを同時読み取りするのを防ぎます。
- Vite ウォッチャーは TanStack の一時生成ファイルを無視し、不要な再生成と Windows のファイルシステム競合を減らします。
- 全対応フレームワークの静的アセット E2E 検証を改善しました。画像デコード、固有寸法、HTTP ステータス、MIME タイプ、SVG 内容を確認します。
- E2E テストサーバーの静的ファイル応答を修正しました。明示的な Content-Length ヘッダー、HEAD リクエスト対応、ストリーミングエラー処理の改善を含みます。
- ルート既定値、アセットマニフェスト、i18n 設定、クエリスキーマ拡張の検証時の TypeScript 制御フロー型絞り込みを修正しました。
- canonical()、alternates()、withQuery()、withDefaults() の強い型付けをランタイム検証を削除せずに維持します。
- URL クエリ検証の Biome 抑制コメントの位置を修正しました。
- アセットマニフェストテストで制限付きパッケージサブパスではなくパッケージマニフェストを使い、TypeScript コンパイラーの解決を修正しました。
- 生成 TypeScript・JavaScript アセットの型チェック診断を改善しました。
- Windows の一時フィクスチャの削除とサブプロセスのエラー処理を改善しました。
- ブラウザーで安全な新しいアセット・URL ユーティリティモジュールを browser-safety テストの期待値に追加し、ランタイム依存関係の厳密な分離を維持しました。

### ドキュメント

- フレームワークガイドとサイトのコード例を、Astro ネイティブ連携、デプロイベース、CLI 上書き、ローカライズ URL に対応させました。

## 2.0.0 - 2026-11-25

必要な場合にのみ破壊的変更を行い、それぞれに移行手順を用意しました。`npx named-routes doctor --v2` で該当項目を確認し、生成モジュールが変わる場合は `npx named-routes migrate --to 2 --write` で 1.x の動作を固定します。単独リリースされなかった 1.1.1 の予定修正も含みます。

### 破壊的変更

- Node.js 22.12+ が必須です（Node.js 20 は 2026 年 4 月に EOL）。ES モジュールの `require()` と全環境でのネイティブ再帰監視に対応します。CI は 22.12、22、24、26 をテストします。
- エクスポート型に TypeScript 5.4+ が必須です（Zod 4 と Valibot 1 の最小要件でもあります）。CI は 5.4、5.9、6、7 をテストします。
- 生成モジュールと `createRoutes()` で `hrefs: "typed"` が既定となり、`route()` は Next.js の `typedRoutes` がキャストなしで受け入れる `` `/users/${string}` `` などのテンプレートリテラル型を返します。`route()` の結果を格納する変数に別の文字列を再代入できない場合は `string` 型注釈を付けるか、`hrefs: "string"` を設定します（生成モジュールに `"hrefs": "string"` が出力されます）。`withNamedRoutes()` と `doctor` は `typedRoutes` と `hrefs: "string"` の併用を警告します。
- フレームワーク検出が既定（`discovery: "framework"`）です。最終ルートテーブルが公開される場合はそこから命名し、コード宣言のパスも対象にします。Nuxt：新モジュール `@triooo/named-routes/nuxt` が `pages:resolved`（`definePageMeta({ path, alias })`、他モジュールのページ、別名には独自の名前）を読み取り、CLI 用に `.nuxt/named-routes/pages.json` を保存。Vue Router 5：生成 `typed-router.d.ts`（`definePage({ path })`）。React Router：`react-router routes --json`（`app/routes.ts` の `route()`、`index()`、`layout()`、`prefix()`）。TanStack Router：`routeTree.gen.ts`。テーブルができるまではファイルを走査し、CLI が理由を報告します。`discovery: "files"` は 1.x スキャナーを維持します。Next.js、SvelteKit、Astro は変更ありません。
- エラー種別ごとに単一のコードを使用します。不正な `router`、`pageExtensions`、`output`（ルートディレクトリ内の出力も含む）は `GENERATION_ERROR` ではなく `INVALID_CONFIG` を発生させます。メッセージは不変です。
- `typesVersions` を削除しました。型は `exports` でのみ公開するため、`moduleResolution` は `bundler`、`node16`、`nodenext` のいずれかが必要です。
- クエリスキーマを型のみとしてインポートする生成モジュール（`validateQuery` なし）は `TypeOnlyQueries<typeof schemas>` を使用し、`route.parseQuery()` が実際の動作どおり生のクエリを返す型になります。

### 追加

- `route.parseQuery(name, input)`：URL、クエリ文字列、`URLSearchParams`、`route.match().query` のクエリを、実行時スキーマがあればそれで読み取り、スキーマ出力型の `{ ok: true, value }` または `{ ok: false, issues }` を返します。文字列として拒否されるキーは `route()` が書いた数値や `true`/`false` を再変換し、単一値を配列にします。実行時スキーマがなければ生のクエリを返します。新しい型 `QueryOutput`、`QueryParseResult`、`QueryParseInput`、`TypeOnlyQuery`、`TypeOnlyQueries`。
- `named-routes doctor` はルートの出所（フレームワークテーブルまたはファイルと理由）、各方式だけに存在するルート、Nuxt モジュールの使用有無を報告します。`doctor --v2` は 1.x からの変更点（型付き href、検出方式によるルート変更、`exports` を読めない `moduleResolution`、`GENERATION_ERROR` を比較するコードのテキスト検査）を表示します。
- `named-routes migrate --to 2`（ドライラン、`--write` で適用）：`hrefs: "string"` と、ルートが異なる場合の `discovery: "files"` を設定に固定します（なければ `named-routes.config.mjs` を作成）。フレームワーク設定やアプリコードは変更しません。
- Vite プラグインはフレームワークがルートテーブルを書き換えた時と、全プラグインの `buildStart` 後にビルドで初めてモジュールを読む前に再生成します。`named-routes watch` も生成物を監視します。CLI の要約は出所を示します：`(5 routes, nuxt, from .nuxt/named-routes/pages.json)`。
- サンプル：Nuxt はモジュールと `definePageMeta({ path, alias })` ページ、Vue は `definePage({ path })` ページ、React Router は `app/routes.ts` の `route()` を使用し、E2E で実ブラウザーから移動します。
- `pnpm test:package` は [attw](https://github.com/arethetypeswrong/arethetypeswrong.github.io)（node16 と bundler 解決）と [publint](https://publint.dev)（strict）で tarball を検証します。
- `pnpm test:types`（および `pnpm check` と CI）は、全サンプルのルート名を含む生成モジュールを使って TypeScript 例を `hrefs: "string"` と `"typed"` で型チェックします。型エラーと記載された行は失敗する必要があります。
- 4 言語で 1.x からの移行ガイドを追加し、各フレームワークページでルートの出所を説明します。

### 修正

- 設定ファイルは内容変更時のみ再インポートされます（更新時刻ではなくハッシュ）。`watch`、`next dev`、Vite 中に内容を変えず `named-routes.config.*` を保存・touch してもメモリーに別インスタンスが残りません。Node.js は ES モジュールをアンロードできないため、異なる設定バージョンはプロセス再起動まで残ります。この制約を文書化しました。
- 型付き href：必須クエリキーのあるルートを `options.query` なしで呼ぶと `Expected 3 arguments, but got 1` の代わりに `Argument of type '"search"' is not assignable to parameter of type '"search" & QueryIsRequired<"search">'` を報告します。
- `pnpm test:package` はリリースと次のバージョン更新の間も失敗しなくなりました。`npm publish --dry-run` はパッケージングと `package.json` の正規化後に既存バージョンを拒否し、テストはそこまでを検証します。

## 1.1.0 - 2026-11-14

1.0 と後方互換性があります。新しい動作はオプトインまたは追加機能で、エラーコードとメッセージは不変です。

### 追加

- `hrefs: "typed"`（設定、`withNamedRoutes()`、Vite プラグイン、`createRoutes`）：`route()` は `` `/users/${string}` `` などのテンプレートリテラル型を返し、Next.js の `typedRoutes` が `<Link>`、`router.push()`、`replace()`、`prefetch()` でキャストなしで受け入れます。型のみの変更で URL は同じです。新型 `RouteHref`、`RouteHrefWithSuffix`、`TypedNamedRoutes`。`typedRoutes` 有効時に設定がなければ `withNamedRoutes()` が案内します。
- ルート別の型付きクエリ：Standard Schema バリデーター（Zod 3.24+、Valibot 1+、ArkType…）を使う `defineQuery({...})` または `defineQuery.type<T>()` を `query` オプションで指定します。不明キーと不適合値は型エラー、必須キーがあればクエリも必須です。既定は型のみインポート、`validateQuery: true` はスキーマをバンドルし無効値に `INVALID_QUERY` を発生させます。スキーマライブラリへの依存はありません。
- 逆引きルーティング：`route.match(url)`、`route.is(name, url, { exact })`、`route.breadcrumbs(url)`。決定的な優先順位（静的→動的→宣言順）、安全なデコード、`basePath`、末尾スラッシュ、ロケールプレフィックス、ローカライズパス、i18n ドメインに対応します。不一致・不正 URL は `null`、文字列以外の入力は `INVALID_URL` エラーをスローします。
- `named-routes doctor`：Node.js/TypeScript バージョン、設定、フレームワーク、ルート、競合、古い出力、Next.js/Vite 連携、型付き href なしの typedRoutes、i18n、スキャナーが検出できないコード宣言ルートの読み取り専用診断。`--json`、`--strict`、`--no-color`、エラー時終了コード 1。
- `NamedRouteError.details`（`file`、`files`、`route`、`pattern`、`option`、`hint`）でルート名、オプション、`names` キーの候補を提示し、CLI に表示します。
- 監視モード：`withNamedRoutes()` の `watchMode`（`auto`、`native`、`poll`）と `named-routes watch` の `--watch-mode`。
- 実フレームワーク E2E（`pnpm test:e2e`）：各サンプルで tarball インストール、型チェック、ビルド、実運用ビルド配信、Chromium の生成リンク操作を行い、開発サーバー中にページ作成・改名・削除を検証します。CI は Linux で全例、Windows/macOS で Next.js App Router と Vue を実行し、公開の条件とします。
- 実 Next.js `typedRoutes` 契約テスト（`next typegen` + `tsc`）、Next.js スモークの `next build` + `next start`、ランタイムの browser-safety テスト、TypeScript 5.0/5.4/5.9/6/7 型契約マトリックス、Biome lint/format（`pnpm lint`、`pnpm format`）、監視ベンチマーク（`pnpm bench:watch`）。
- サイト：プレイグラウンドで自身のルートに対する `route.match()` と `route.breadcrumbs()` を表示し、型付き href、型付きクエリ、逆引きルーティング、doctor を英語、ポルトガル語、スペイン語、日本語で文書化します。

### 変更

- Next.js dev と `named-routes watch` は 750 ms ごとの走査に代わり、ファイルイベント（デバウンス、直列化）と 5 秒の整合性再走査を使います。WSL の Windows ドライブ、`WATCHPACK_POLLING`/`CHOKIDAR_USEPOLLING`/`NAMED_ROUTES_WATCH=poll`、OS が監視を拒否した場合は自動ポーリング。`pnpm bench:watch` の測定（Linux、Node 26、3 回の中央値）：200 ルートでアイドル CPU 36 → 6 ms/s、追加→モジュール 478 → 90 ms、2000 ルートで 153 → 29 ms/s、582 → 203 ms。`watchMode: "poll"` で 1.0 の動作に戻ります。
- サンプル：Next.js App Router は `typedRoutes` と型付き href、クエリリンクを使用し、Pages Router は i18n、`pt` リンク、クエリリンクを使用します。両方に catch-all ドキュメントページがあります。Vue は Vue Router 5（`vue-router/vite`）と `_parent.vue` レイアウトを使用し、lockfile は package.json と再同期しました。
- CI：Windows/macOS のパッケージテスト、複数 TypeScript バージョンの型契約、ビルドのみのデモに代わる E2E ワークフロー。Dependabot は npm ツール、サンプル、サイトも更新します。

### 修正

- Vue Router 5 のファイルベースルーティングで `_parent.vue` はマッチ不可の親となり、`users._parent` のような架空ルートを生成しません。
- 監視が生成モジュールのアトミック書き込みの一時ファイルを無視し、追加の再生成を防ぎます。
- 旧 `@triooo/next-named-routes` が生成したモジュールを生成済みとして認識し、"Refusing to overwrite" で失敗せず置換します。
- CLI ヘルプとドキュメントで `named-routes` を自身の別名とする記述を削除し、デモに合わせ React Router 8 と Vue Router 5 を明記しました。SPEC で 1.0.0 を公開済みとしました。

## 1.0.0

- 自動命名、URL 生成、型付きパラメーター、CLI コマンド、Next 設定ラッパー、Vite プラグインの安定した v1 契約。
- アダプター：Next.js（App Router と Pages Router）、Nuxt（ページと Nitro サーバールート）、Vue Router ファイルベース、SvelteKit、Astro、React Router / Remix flat routes、TanStack Router、およびコード宣言ルート用 `manual` モード。package.json からフレームワークを検出します。
- `@triooo/named-routes/vite`：`namedRoutes()` が開始・ビルド時に生成し、Vite ウォッチャーでファイル追加・削除を追跡します。
- v1 からの i18n：`locale` オプション、`forLocale()`、`locales()`、`localePrefix`（always、as-needed、never、カスタムプレフィックス）、ローカライズ `pathnames`、`domains`、`[locale]`/`[lang]` フォルダーの自動除去、物理ロケールフォルダー、非ローカライズエンドポイント、型付き `RouteLocale`。next-intl の `defineRouting()` と同じ形式で、Next.js Pages Router の `i18n` は自動継承します。
- 新しいパターン：省略可能な単一パラメーター `[[id]]`、`v[major]-[minor]` のような混合セグメント、静的セグメントの前の catch-all。
- 設定：`named-routes.config.ts/.mts/.mjs/.js/.cjs/.json`、`defineConfig`、`routesDir`、`appDir`/`pagesDir`、`exclude` グロブ、`naming`（区切り、パラメータープレフィックス、home 名、transform）、`importSource`、`exportNames`、`.ts/.mts/.js/.mjs` 出力。不明なオプションは `INVALID_CONFIG`。
- CLI バイナリ `named-routes`（別名 `named-routes`）：`init`、`--framework`、`--routes-dir`、`--watch-interval`、`--version`。
- 安全性：`next start` はマニフェストを書きません（読み取り専用デプロイ）。公開の `basePath`、`trailingSlash`、`origin`、i18n 設定のみシリアライズします。一時ファイルは排他的に作成し、`importSource` とエクスポート名はコード書き込み前に検証します。
- リリース検証では実 tarball をクリーンな利用プロジェクトにインストールし、ランタイム、CLI、エクスポート、packlist、TypeScript 契約を検証します。CI で実 Next.js と Vite のスモークテストを実行します。
- 英語、ポルトガル語、スペイン語、日本語のドキュメントとサイト（`docs/locales.json`）。`scripts/sync-locales.mjs`（`pnpm locales`、`pnpm locales:check`）で CI の全言語を同期し、言語別 README を提供します。
- 公開ドキュメントと npm データに基づく代替パッケージおよびフレームワークネイティブ型付きルーティングとの比較ページ。
- ドキュメントサイト（`website/`、Vercel にデプロイ可能）を交通路線のメタファーで刷新しました。発車案内板、インタラクティブ路線図、正確な互換性表、アニメーションページ、新しい路線 N ロゴを提供します。全対応フレームワークの実行可能なデモは `examples/` にあります。
