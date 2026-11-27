# アセットと CDN

# asset() / route.asset()

Topic: `assets` · Named Routes v2.2.0

対応フレームワークの公開 URL には `asset(path, { absolute?: boolean })` または `route.asset()` を使用します。名前付きルートとは異なり、デフォルトで有効な `basePath` を含みます。ロケール、trailingSlash、ルート名、クエリスキーマの影響は受けません。このヘルパーは URL を生成するだけで、ファイルの存在確認、アップロード、CDN 設定、インポート済みアセット、画像最適化やバンドラーのハッシュ処理を置き換えるものではありません。

Next.js、Nuxt、Astro、一般的な Vite アプリでは `public/`、SvelteKit ではデフォルトの `static/` にファイルを置きます。ディレクトリ名や既に付与したベースを含めず、そのフォルダーからの相対パス（先頭のスラッシュは任意）を渡します。ベースが `/app` の場合、`asset("images/logo.svg")` は `/app` を一度だけ付けます。Unicode と空白は URL エンコードされ、クエリとフラグメントは保持されます。信頼できない入力はアプリ側で検証してください。

named-routes.config の `defaults.assetBase` でアセットのベースを `"/files"`、`"/"`（ルート）、`"https://cdn.example.com/public"` などに変更できます。デフォルトは Next、Nuxt、Astro の有効な `basePath`、または Vite と手動マニフェストで設定したルーターのベースです。Vite の base、Nuxt の CDN、Next の assetPrefix が異なる場合は assetBase を明示してください。バンドラー固有のプレフィックスは推測しません。ファイルはその URL に配信してください。URL または assetBase が絶対 URL でない場合、`absolute: true` には defaults.origin が必要です。リクエストのホストやロケールドメインは使用しません。有効な HTTP(S) URL は保持されますが、プロトコル相対 URL、他のスキーム、認証情報、曖昧なパスやトラバーサルは拒否されます。

生成モジュールは `route`、`routes` とともに `asset` を公開します。手動マニフェストは `route.asset` を提供します。ナビゲーションベースとは別の場所にファイルを配信する場合は assetBase と CDN のガイドを参照してください。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

## ベースパスなし

公開ファイルの URL: `/images/logo.svg`。

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /images/logo.svg
```

## ベースパスあり

公開ファイルの URL: `/app/images/logo.svg`。

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: asset-base, asset-absolute, typed-assets, asset-has, asset-versioning
---

# route.asset()

Topic: `helper-route-asset` · Named Routes v2.2.0

型付きヘルパーを含むすべてのヘルパーに route.asset があり、生成モジュールの asset export と同じ既定値とマニフェストを使用します。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" });
route.asset("logo.svg"); // /logo.svg
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" }, { basePath: "/app" });
route.asset("logo.svg"); // /app/logo.svg
```

Related topic IDs: assets, asset-base
---

# assetBase と CDN

Topic: `asset-base` · Named Routes v2.2.0

`defaults.assetBase` は `basePath` と独立して公開ファイルのプレフィックスを上書きします。HTTP(S) CDN URL、ルート相対のプレフィックス、またはナビゲーションベースを無効にする `/` を使えます。ファイル配信や CDN の設定は行いません。defaults は生成モジュールにシリアライズされるので秘密を含めないでください。named-routes.config でも同じ defaults オブジェクトを使用します。

## ベースパスなし

公開ファイルの URL: `https://cdn.example.com/public/logo.svg`。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

## ベースパスあり

公開ファイルの URL: `https://cdn.example.com/public/logo.svg`。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /app/about
const rootAssets = route.withDefaults({ assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```
---

# アセットの絶対 URL

Topic: `asset-absolute` · Named Routes v2.2.0

absolute: true で信頼できるオリジンを付加します。絶対 CDN URL はそのままです。言語設定は影響しません。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/images/logo.svg
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/app/images/logo.svg
```

Related topic IDs: assets, asset-base, absolute-urls
---

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
---

# asset.has() / paths() / info()

Topic: `asset-metadata` · Named Routes v2.2.0

デプロイ先ではなく生成済みマニフェストを参照します。has は先頭スラッシュ、クエリ、ハッシュ付きローカルパスを扱い、paths はエンコード済みの名前を返します。info は path、拡張子、バイト数、version または null を返します。検出を無効にするとマニフェストは空です。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.paths(); // ["images/logo.svg"]
asset.info("images/logo.svg"); // { path, extension, size, version }
asset.info("missing.svg"); // null
```

Related topic IDs: asset-has, asset-paths, asset-info, typed-assets
---

# asset.has()

Topic: `asset-has` · Named Routes v2.2.0

生成マニフェスト内のパスを確認します。デプロイ先への通信は行いません。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.has("missing.svg"); // false
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# asset.paths()

Topic: `asset-paths` · Named Routes v2.2.0

マニフェスト内のエンコード済み公開パスを列挙します。未設定なら空配列です。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# asset.info()

Topic: `asset-info` · Named Routes v2.2.0

既知のファイルのメタデータを返します。不明なパスには null を返します。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
const logo = asset.info("images/logo.svg");
console.log(logo?.size); // 64
asset.info("missing.svg"); // null
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# アセットのバージョン管理

Topic: `asset-versioning` · Named Routes v2.2.0

`{ version: true }` はコンテンツの SHA-256 の先頭12桁を v に追加または置換します。既存のクエリとフラグメントを保持します。アセット検出を有効にし、内容変更時に再生成してください。外部 URL や未検出ファイルには使えません。キャッシュ回避であり、暗号学的整合性保証や CDN のパージではありません。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /css/custom.css?theme=dark&v=a8f32c910123#top
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  basePath: "/app",
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /app/css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /app/css/custom.css?theme=dark&v=a8f32c910123#top
```
