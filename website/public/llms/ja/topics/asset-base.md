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
