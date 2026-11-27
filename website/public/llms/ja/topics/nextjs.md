# Next.js: セットアップ

Topic: `nextjs` · Named Routes v2.2.0

next.config を @triooo/named-routes/next の withNamedRoutes でラップします。モジュールは next dev と next build の前に生成され、next dev の中では watcher が最新に保ち、next start では一切書き込まないため、読み取り専用のデプロイでも安全です。ラッパーは pageExtensions、basePath、trailingSlash、Pages Router の i18n 設定を引き継ぎます。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

Related topic IDs: nextjs-conventions, nextjs-navigation, installation, configuration
