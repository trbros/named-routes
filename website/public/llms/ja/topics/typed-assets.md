# 型付きアセット

Topic: `typed-assets` · Named Routes v2.2.0

named-routes.config の `assets` を有効にすると public/（SvelteKit は static/）を走査します。隠しファイルとシンボリックリンクを除外し、exclude の *, **, ? グロブをサポートします。エンコードされた相対パスと SHA-256 ハッシュのマニフェストを生成します。strict: true で生成された asset のリテラルパスを型検査し、route.asset() は実行時に検証します。外部 HTTP(S) URL は許可され、ファイルのアップロードはしません。assets.directory で公開ディレクトリを変更できます。build/check で更新し、CLI watch で再帰的に監視できます。

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```
