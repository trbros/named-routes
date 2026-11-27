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
