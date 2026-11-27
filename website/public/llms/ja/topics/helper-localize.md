# route.localize()

Topic: `helper-localize` · Named Routes v2.2.0

`route.localize(url, locale?, options?)` はルート表を使い既存 URL を翻訳し、クエリとフラグメントを保持します。言語切り替えやリダイレクトに使えます。曖昧でないローカライズ済みルートがなければ null を返します。basePath を含む公開 URL には `{ basePath: true }` を指定し、必要なら `sourceLocale` でプレフィックスのないパスを区別します。動的な slug の値の翻訳や訪問者の言語検出は行いません。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/pt/sobre?tab=info#top", "en");
// /en/about?tab=info#top
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/app/pt/sobre?tab=info#top", "en", { basePath: true });
// /app/en/about?tab=info#top
```
