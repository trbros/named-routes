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
