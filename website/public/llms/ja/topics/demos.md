# 試してみる: フレームワーク別デモ

Topic: `demos` · Named Routes v2.2.0

examples/ には、対応する構成ごとに小さな実行可能アプリがあります。app-router と pages-router（Next.js）、nuxt、vue（Vue Router 5）、sveltekit、astro、react-router（flat routes）、tanstack-router、react（createRoutes でルートを手書き）です。どれも静的ページ、ユーザーや投稿の動的ページ、ドキュメントの catch-all ページに名前でリンクしています。Next.js のデモでは、typedRoutes と型付き href（App Router）、クエリ文字列付きの i18n（Pages Router）も使っています。pnpm test:e2e は各デモのコピーにパッケージ化した tarball をインストールし、ビルド、本番サーバー、ブラウザーでの遷移、ページのリアルタイム検出を確認します。

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
