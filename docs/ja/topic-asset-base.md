# assetBase と CDN

[ドキュメント](index.md) / [アセットと CDN](public-assets.md)

[English](../en/topic-asset-base.md) · [Português](../pt/topic-asset-base.md) · [Español](../es/topic-asset-base.md) · [日本語](../ja/topic-asset-base.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-base"></a>

`defaults.assetBase` は `basePath` と独立して公開ファイルのプレフィックスを上書きします。HTTP(S) CDN URL、ルート相対のプレフィックス、またはナビゲーションベースを無効にする `/` を使えます。ファイル配信や CDN の設定は行いません。defaults は生成モジュールにシリアライズされるので秘密を含めないでください。named-routes.config でも同じ defaults オブジェクトを使用します。

<a id="without-base"></a>
## ベースパスなし

公開ファイルの URL: `https://cdn.example.com/public/logo.svg`。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

<a id="with-base"></a>
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

← 前へ: [route.asset()](topic-helper-route-asset.md) · [全トピック](public-assets.md) · 次へ: [アセットの絶対 URL](topic-asset-absolute.md) →
