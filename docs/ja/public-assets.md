# 公開アセット · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/public-assets.md) · [Português](../pt/public-assets.md) · [Español](../es/public-assets.md) · [日本語](../ja/public-assets.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [asset() / route.asset()](#assets)
- [assetBase と CDN](#asset-base)

<a id="assets"></a>

## asset() / route.asset()

対応フレームワークの公開 URL には `asset(path, { absolute?: boolean })` または `route.asset()` を使用します。名前付きルートとは異なり、デフォルトで有効な `basePath` を含みます。ロケール、trailingSlash、ルート名、クエリスキーマの影響は受けません。このヘルパーは URL を生成するだけで、ファイルの存在確認、アップロード、CDN 設定、インポート済みアセット、画像最適化やバンドラーのハッシュ処理を置き換えるものではありません。

Next.js、Nuxt、Astro、一般的な Vite アプリでは `public/`、SvelteKit ではデフォルトの `static/` にファイルを置きます。ディレクトリ名や既に付与したベースを含めず、そのフォルダーからの相対パス（先頭のスラッシュは任意）を渡します。ベースが `/app` の場合、`asset("images/logo.svg")` は `/app` を一度だけ付けます。Unicode と空白は URL エンコードされ、クエリとフラグメントは保持されます。信頼できない入力はアプリ側で検証してください。

named-routes.config の `defaults.assetBase` でアセットのベースを `"/files"`、`"/"`（ルート）、`"https://cdn.example.com/public"` などに変更できます。デフォルトは Next、Nuxt、Astro の有効な `basePath`、または Vite と手動マニフェストで設定したルーターのベースです。Vite の base、Nuxt の CDN、Next の assetPrefix が異なる場合は assetBase を明示してください。バンドラー固有のプレフィックスは推測しません。ファイルはその URL に配信してください。URL または assetBase が絶対 URL でない場合、`absolute: true` には defaults.origin が必要です。リクエストのホストやロケールドメインは使用しません。有効な HTTP(S) URL は保持されますが、プロトコル相対 URL、他のスキーム、認証情報、曖昧なパスやトラバーサルは拒否されます。

生成モジュールは `route`、`routes` とともに `asset` を公開します。手動マニフェストは `route.asset` を提供します。ナビゲーションベースとは別の場所にファイルを配信する場合は assetBase と CDN のガイドを参照してください。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

```ts
// Generated module (adjust the import path to your project):
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg with basePath: "/app"
asset("logo.svg?v=2#icon"); // /app/logo.svg?v=2#icon

// Manual manifest:
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
urls.asset("images/logo.svg", { absolute: true });
// https://example.com/app/images/logo.svg
```

<a id="asset-base"></a>

## assetBase と CDN

`defaults.assetBase` は `basePath` と独立して公開ファイルのプレフィックスを上書きします。HTTP(S) CDN URL、ルート相対のプレフィックス、またはナビゲーションベースを無効にする `/` を使えます。ファイル配信や CDN の設定は行いません。defaults は生成モジュールにシリアライズされるので秘密を含めないでください。named-routes.config でも同じ defaults オブジェクトを使用します。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  basePath: "/app",
  assetBase: "https://cdn.example.com/public",
  origin: "https://example.com",
});
urls.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
urls("about", {}, { basePath: true }); // /app/about
const rootAssets = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```

---

← 前へ: [ルートヘルパー](route-helpers.md) · [README に戻る](../../README.ja.md) · 次へ: [API リファレンス](api-reference.md) →
