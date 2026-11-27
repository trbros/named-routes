# CLI、CI、トラブルシューティング

# CLI と CI

Topic: `cli` · Named Routes v2.2.0

バイナリ名は named-routes です。generate（デフォルト）はマニフェストを書き出します。list は検出したエントリーを JSON で出力します。check は書き込まずに比較し、古くなっていれば終了コード 1 で終わります。watch は最初に生成し、SIGINT/SIGTERM までモジュールを最新に保ちます（再スキャン付きのファイルイベント、または --watch-mode poll でポーリング）。init は検出したフレームワーク用の named-routes.config.mjs を書き出し、既存の設定は決して上書きしません。doctor は何も書き込まずにプロジェクトを診断します（「診断」を参照）。

フラグ: --root <directory>、--config <file>、--framework <name>、--output <file>、--routes-dir <dir>、--router <auto|app|pages>、--api、--watch-interval <ms>、--watch-mode <auto|native|poll>、--json・--strict・--no-color・--v2（doctor 用）、--to・--write（migrate 用）、--version (-v)、--help (-h)。コマンドは、パッケージをローカルにインストールした利用側のプロジェクトで実行してください。エラーは code と、わかっている場合はファイル、ルート、オプション、修正方法を表示します。

生成ファイルをコミットする場合は、ビルドの前に check を実行してください。統合はビルド時に再生成するため、ビルド後の check では、すでに古くなっていたコミット済みファイルを検出できません。生成は決定的かつアトミックで、タイムスタンプも含みません。ジェネレーターの署名がない既存のファイルは決して上書きしません。

migrate --to 2 は 1.x のプロジェクトを 2.0 に備えます。named-routes の設定に hrefs: "string" を固定し、フレームワークのルートがファイル走査と異なる場合は discovery: "files" も固定するので（設定がなければ named-routes.config.mjs を作成）、その行を消すまで生成されるモジュールは変わりません。--write を付けない限りドライランで、フレームワークの設定やアプリケーションのコードは編集しません。残りの項目（Node.js、TypeScript、moduleResolution、エラーコード）は doctor --v2 が一覧表示します。

単独実行には npx @triooo/named-routes generate を、インストール済みの場合は npm exec -- named-routes generate を使います。スコープなしの named-routes は別のパッケージです。--base-path /docs で今回のプレフィックスを上書きし、--base-path / で解除します。

**プレフィックスの上書き。** --base-path <path> は generate/check/watch と doctor で利用できます。その実行のキャッシュと共有デフォルトを上書きし、/ で解除します。統合のスナップショットは生成メタデータでありソースファイルではありません。

ローカルにインストールした場合は pnpm exec named-routes list (pnpm) または npm exec --package=@triooo/named-routes -- named-routes list (npm) を使います。Windows で CLI 起動前に MODULE_NOT_FOUND が出る場合は、生成された shim を確認し、元のパッケージマネージャーで再インストールしてください。node_modules の外を指す shim は実行されていない CLI から修復できません。bin は bin/named-routes.js を指し、そこから dist/cli.js を相対的に読み込み、作業ディレクトリを保持します。

```sh
npx @triooo/named-routes --help
```

Related topic IDs: cli-init, cli-generate, cli-list, cli-check, cli-watch, doctor, audit, cli-migrate
---

# init

Topic: `cli-init` · Named Routes v2.2.0

検出したフレームワークの初期設定を作ります。既存設定は上書きしません。

```sh
npx @triooo/named-routes init
```

Related topic IDs: cli, doctor, development
---

# generate

Topic: `cli-generate` · Named Routes v2.2.0

マニフェストを生成します。--base-path /app で今回のベースを上書きできます。

```sh
npx @triooo/named-routes generate
```

Related topic IDs: cli, doctor, development
---

# list

Topic: `cli-list` · Named Routes v2.2.0

生成モジュールを変更せずルートを JSON で表示します。

```sh
npx @triooo/named-routes list
```

Related topic IDs: cli, doctor, development
---

# check

Topic: `cli-check` · Named Routes v2.2.0

CI のビルド前に生成物を検査します。古い場合は書き込まず終了コード 1 になります。

```sh
npx @triooo/named-routes check
```

Related topic IDs: cli, doctor, development
---

# watch

Topic: `cli-watch` · Named Routes v2.2.0

生成後に変更を監視します。ファイルイベントが不安定なら --watch-mode poll を使います。

```sh
npx @triooo/named-routes watch
```

Related topic IDs: cli, doctor, development
---

# 診断: named-routes doctor

Topic: `doctor` · Named Routes v2.2.0

npx @triooo/named-routes doctor は、Node.js と TypeScript のバージョン、設定ファイル、検出したフレームワーク、検出したルート、競合と名前の衝突、生成されたモジュールが存在して最新かどうか、Next.js や Vite との統合、型付き href なしの typedRoutes、翻訳されたルートのない i18n、ファイルのスキャンでは見えないルートの宣言（Nuxt の definePageMeta({ path }) や React Router の app/routes.ts での route() の呼び出し）を確認します。

読み取り専用で、ファイルを書き込むことも、アプリケーションのコードを実行することもありません。統合と宣言のチェックはテキストによるヒューリスティックで、出力にもそう表示されます。プラグインに直接渡したオプションはコードなので、doctor からは見えないと報告されます。共有するオプションは named-routes.config.* に移すか、--output などのフラグを渡してください。

各診断は error、warning、info のいずれかで、安定した id と、わかっている場合はファイル、ルート、オプション、修正方法を含みます。--json は CI 向けの機械可読なレポートを出力し、--strict では warning でも失敗します。色は TTY のときだけ使われ、NO_COLOR や --no-color では使われません。終了コード 0 はエラーなし、1 はエラーあり（--strict では warning も含む）を意味します。

ルートの出どころ（フレームワークの表かファイルか、ファイルに戻った理由）も表示し、2 つのビューの片方にしかないルートを一覧表示します。doctor --v2 は、1.x 向けに書かれたプロジェクトが 2.0 で変える必要があるもの（型付き href、フレームワークによる検出で変わるルート、パッケージの exports を読めない moduleResolution、エラーコードを GENERATION_ERROR と比較しているコード）を追加で表示します。

```sh
npx @triooo/named-routes doctor
npx @triooo/named-routes doctor --json --strict   # CI
npx @triooo/named-routes doctor --v2              # upgrading from 1.x

# info     Routes come from the framework: typed-router.d.ts.
# info     /sobre (sobre) exists only in the framework's route table; the file conventions do not produce it.
#          file:  src/pages/about.vue
```
---

# ルートとアセットの監査

Topic: `audit` · Named Routes v2.2.0

利用プロジェクトで audit を実行すると、不明なルート・アセットのリテラル参照、大文字小文字の不一致、重複プレフィックス、ハードコードされたパスを検出します。ソースのみ走査し、生成物を除外してファイルを書き換えません。完全な構文解析ではなく保守的な字句監査のため、別名、複数行、動的 URL を見逃すことがあります。警告は確認してください。エラーは終了コード1、--strict は警告でも失敗、--json は機械可読診断を出力します。

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```
---

# migrate --to 2

Topic: `cli-migrate` · Named Routes v2.2.0

1.x から 2.x の移行をプレビューします。確認後にのみ --write を指定してください。

```sh
npx @triooo/named-routes migrate --to 2
```

Related topic IDs: cli, doctor, migration
---

# 検出のエッジケース

Topic: `discovery` · Named Routes v2.2.0

Next.js: スキャナーは app と pages を合わせて扱います。ルート直下の app ディレクトリは src/app より優先され、pages と src/pages にも同じルールが独立して適用されます。ほかのフレームワークは、routesDir を指定しない限り標準のフォルダー（Nuxt は app/pages または pages、Vue は src/pages、SvelteKit は src/routes、Astro は src/pages、React Router は app/routes、TanStack は src/routes）を使います。ディレクトリのシンボリックリンク、隠しフォルダー、node_modules はたどらず、.d.ts ファイルは無視します。

App Router: デフォルトでは page ファイルだけが対象です。グループとスロットは URL に含まれません。インターセプトは正規のパスに解決され、同等のバリエーションはひとつにまとめられます。_ で始まるプライベートフォルダーは無視され、%5F は公開のアンダースコアになります。layout、loading、default、error、メタデータのファイルは対象外です。

Pages Router: ルート直下の _app、_document、_error は対象外で、それ以外のアンダースコア付きページは有効です。index は取り除かれます。API Routes、Route Handlers、ほかのフレームワークのエンドポイントは includeApi または --api で有効にします。URL は HTTP メソッド、権限、エンドポイントの検証を表現しません。

URL の形の衝突（たとえば同じ場所の [id] と [slug]）や、推論された名前の衝突は生成を失敗させます。Next.js では、正規 URL の重複やオプションの catch-all との優先度の衝突も、Next と同じように失敗します。レイアウトをネストするルーター（Nuxt、Vue、React Router、TanStack）では、同じ URL を共有するレイアウトとその index はひとつのルートにまとめられます。

フレームワークによる検出では、ページの走査をフレームワークの表で置き換えます。エンドポイント（includeApi）は引き続きフォルダーから読み、exclude は報告されたファイルにも適用され、エイリアス（Nuxt の alias）には別の名前が付きます。named-routes doctor は 2 つのビューの片方にしかないルートをすべて一覧表示するので、definePageMeta、definePage、routes.ts で何が変わったかを確認できます。
---

# 開発中の自動更新

Topic: `development` · Named Routes v2.2.0

Next.js: ラッパーは Next の起動前に生成し、その後は開発プロセスの中でモジュールを最新に保ちます。デフォルト（watchMode: "auto"）では、ルートのディレクトリとプロジェクトのルートからのファイルイベントにデバウンスと直列化をかけて反応し、OS が取りこぼしたイベントに備えて 5 秒ごとに再スキャンします。ページの追加、削除、名前変更を検知し、モジュールは内容が変わったときだけ更新されます。webpack や Turbopack のフックには手を加えません。next start（本番サーバー）では一切書き込まないため、読み取り専用のデプロイでも安全です。

Vite 系フレームワーク：プラグインは buildStart で生成し、モジュールが最初に読み込まれる前（フレームワークがルート表を書き出した後）にもう一度生成します。Vite の watcher の add/unlink イベント、named-routes の設定ファイルの変更、typed-router.d.ts・routeTree.gen.ts・app/routes.ts の書き換えに反応します。プロジェクトルートは Vite のルートから package.json まで上にたどって見つけます。Nuxt モジュールは、ページが変わると Nuxt が呼ぶ pages:resolved のたびに再生成します。

watcher は本番ビルド中には動かず、それ自体がプロセスを生かし続けることもありません。編集中に生成エラーが起きても最後の有効なモジュールは保たれ、エラーがログに出ます。設定ファイルがインポートしているモジュールを変更したときは再起動が必要です。設定ファイル自体は内容が変わったときだけ再インポートされます。Node.js は ES モジュールをアンロードできないため、JavaScript / TypeScript の設定ファイルは内容の異なるバージョンごとに（設定モジュール本体のみで、そこからインポートしたものは含みません）プロセスを再起動するまでメモリに残ります。watch: false で止まるのは継続的な更新だけで、最初の生成は行われます。

ファイルイベントが信頼できない環境ではポーリングに切り替わります。/mnt 配下の WSL のパス、WATCHPACK_POLLING または CHOKIDAR_USEPOLLING が設定されている場合、NAMED_ROUTES_WATCH=poll の場合、OS が watcher を拒否した場合（EMFILE や ENOSPC など。一度だけ報告します）です。watchMode: "poll" で 1.0 の動作（watchInterval ごとの完全な再スキャン）に戻せます。再現可能なベンチマーク（pnpm bench:watch、Linux、Node 26）では、200 ルートでアイドル時の CPU が毎秒 36 ms から 6 ms に下がり、新しいページがモジュールに反映されるまでの時間が 478 ms から 90 ms になりました。2000 ルートでは毎秒 153 ms から 29 ms、582 ms から 203 ms です。
---

# エラーとトラブルシューティング

Topic: `errors` · Named Routes v2.2.0

NamedRouteError は Error を継承し、安定した code を公開しています。UNKNOWN_ROUTE は名前が存在しないこと、MISSING_PARAMETER は必須の値が省略されたこと、UNKNOWN_PARAMETER は余分なキーが query に属するか綴りが誤っていること、INVALID_PARAMETER は値の形が誤っているか禁止されたセグメントを含むこと、INVALID_LOCALE は i18n なしで言語を渡したか未設定の言語であることを意味します。

INVALID_PATTERN、INVALID_NAME、INVALID_MANIFEST は不正なルート定義を示します。INVALID_OPTIONS、INVALID_QUERY、INVALID_HASH は不正なオプションを示します。INVALID_BASE_PATH、INVALID_ORIGIN、INVALID_I18N は URL の defaults を拒否します。MISSING_ORIGIN は、絶対 URL を求める前に origin が必要であることを示します。GENERATION_ERROR は検出の衝突、名前を付けられないルート、check での古い結果を、INVALID_CONFIG は不正なオプションすべて（設定の欠落・不正・綴りの誤り、router、pageExtensions、discovery、output）を扱います。

routes.generated が見つからない場合: 統合が実行されているか確認し、generate を実行し、output とインポートのエイリアスを確認してください。basePath や言語が重複する場合: フレームワークのリンクには相対 URL を使い、basePath/locale は通常の URL のときだけ渡してください。名前が古い場合: watcher が有効か確認し、ターミナルのエラーを見てください。ページを移動した後の型エラーは想定どおりです。推論された名前を更新するか、固定名を定義してください。

生成処理は手書きの出力ファイルの上書きを拒否します。無関係なコードに生成の署名を付けるのではなく、別の output を選んでください。生成された出力はルーティング対象のファイルの外に置いてください。動的な補間はリクエストを認可するものではありません。権限とアプリケーションの入力は目的地で検証してください。

1.1 以降、すべての NamedRouteError は details: { file, files, route, pattern, option, hint } も持ち、わかっている情報が入ります。たとえばルートの競合では両方のファイル、名前・オプション・names のキーの綴りが誤っている場合は "Did you mean users.show?" です。INVALID_QUERY はクエリがスキーマを満たさないか、スキーマのマップが不正であることを、INVALID_URL は match() がパスでも URL でもないものを受け取ったことを意味します。2.0 からは、router、pageExtensions、output の不正な値は INVALID_CONFIG になります（1.x では GENERATION_ERROR）。メッセージは変わりません。

静的ファイルの 404 は、実際のデプロイ先パスと公開ディレクトリを確認してください。`asset()` は設定されたベースを使用し、バンドラーの出力や現在のリクエストは参照しません。`INVALID_ASSET_BASE`、`INVALID_ASSET`、`INVALID_OPTIONS` は無効なベース、パス、オプションを示します。

```ts
import { NamedRouteError } from "@triooo/named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```
---

# リライトと境界

Topic: `boundaries` · Named Routes v2.2.0

これは URL ビルダーであり、ルーター、ミドルウェア、認可システム、HTTP クライアントの代わりではありません。実行時にルートを作ったり、リソースの存在を確認したり、訪問者の言語を検出したり、バックエンドにリクエストしたりはしません。

リダイレクト、リライト、ミドルウェアによる言語検出は、引き続きアプリケーションの責任です。コードで宣言したパスに名前が付くのは、フレームワークがルート表を公開している場合だけです（「その他のフレームワーク」を参照）。必要な外部パターンやリライト後のパターンは extraRoutes で明示的に対応付け、言語や basePath を二重に付けないようにしてください。スキャナーはフレームワークの設定ファイルを読まないので、設定は withNamedRoutes かオプションで渡してください。

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```
