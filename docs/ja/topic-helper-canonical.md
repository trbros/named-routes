# route.canonical()

[ドキュメント](index.md) / [SEO とメタデータ](seo.md)

[English](../en/topic-helper-canonical.md) · [Português](../pt/topic-helper-canonical.md) · [Español](../es/topic-helper-canonical.md) · [日本語](../ja/topic-helper-canonical.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-canonical"></a>

明示・固定・デフォルトのロケール（設定済みの場合）でメタデータ用の絶対 URL を生成します。ナビゲーションベースを含み、クエリとハッシュは明示された場合のみ追加します。正規コンテンツの判定やトラッキングパラメーターの自動削除は行いません。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/pt/sobre
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/app/pt/sobre
```

---

[全トピック](seo.md) · 次へ: [route.alternates()](topic-helper-alternates.md) →
