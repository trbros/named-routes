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
