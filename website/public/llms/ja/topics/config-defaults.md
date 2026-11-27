# URL の既定値

Topic: `config-defaults` · Named Routes v2.2.0

defaults に basePath、includeBasePath、origin、trailingSlash、assetBase を設定できます。公開される値なので秘密情報は含めないでください。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

Related topic IDs: base-path, asset-base, absolute-urls
