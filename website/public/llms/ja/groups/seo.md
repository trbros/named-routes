# SEO とメタデータ

# route.canonical()

Topic: `helper-canonical` · Named Routes v2.2.0

明示・固定・デフォルトのロケール（設定済みの場合）でメタデータ用の絶対 URL を生成します。ナビゲーションベースを含み、クエリとハッシュは明示された場合のみ追加します。正規コンテンツの判定やトラッキングパラメーターの自動削除は行いません。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/pt/sobre
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/app/pt/sobre
```
---

# route.alternates()

Topic: `helper-alternates` · Named Routes v2.2.0

既存の pathnames、domains、パラメーター、クエリ設定からロケール別 URL マップを生成します。デフォルトはベースを含む絶対 URL です。非ローカライズルートまたは i18n なしの場合は空のマップです。hreflang や多言語サイトマップに使用し、動的パラメーターは実際の値を指定してください。slug は自動翻訳されません。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/en/about", pt: "https://example.com/pt/sobre" }
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/app/en/about", pt: "https://example.com/app/pt/sobre" }
```
