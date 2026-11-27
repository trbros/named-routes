# 最初の名前付きルート (Next.js)

Topic: `quick-start` · Named Routes v2.2.0

Next.js の最小設定です。next.config.ts にラッパーを追加し、開発サーバーを起動してナビゲーションガイドへ進みます。別のフレームワークには専用ガイドを使用してください。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

Related topic IDs: nextjs-navigation, frameworks, generated-source, mcp-installation
