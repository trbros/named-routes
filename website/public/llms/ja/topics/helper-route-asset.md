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
