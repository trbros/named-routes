# ベースパス — 内部と公開 URL

Topic: `base-path` · Named Routes v2.2.0

Next.js、Nuxt、Vue Router、React Router、TanStack Router のナビゲーションには route() を使います。Astro、SvelteKit、手動生成ではベースを既定で付加します。公開 URL には route.url() を使います。defaults.includeBasePath と呼び出し時の basePath で変更でき、絶対 URL にはベースが含まれます。

フレームワーク別のデプロイガイドを参照してください。CLI は .named-routes/ のベースまたは --base-path /app を使い、/ で解除します。CDN とナビゲーションベースは別です。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" });

route("about"); // /about
route.url("about"); // /about
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app" });

route("about"); // /about
route.url("about"); // /app/about
route.withDefaults({ includeBasePath: true })("about"); // /app/about
```

Related topic IDs: public-url, absolute-urls, trailing-slash, asset-base, cli-generate
