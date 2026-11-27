# route.alternates()

[ドキュメント](index.md) / [SEO とメタデータ](seo.md)

[English](../en/topic-helper-alternates.md) · [Português](../pt/topic-helper-alternates.md) · [Español](../es/topic-helper-alternates.md) · [日本語](../ja/topic-helper-alternates.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-alternates"></a>

既存の pathnames、domains、パラメーター、クエリ設定からロケール別 URL マップを生成します。デフォルトはベースを含む絶対 URL です。非ローカライズルートまたは i18n なしの場合は空のマップです。hreflang や多言語サイトマップに使用し、動的パラメーターは実際の値を指定してください。slug は自動翻訳されません。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/en/about", pt: "https://example.com/pt/sobre" }
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/app/en/about", pt: "https://example.com/app/pt/sobre" }
```

---

← 前へ: [route.canonical()](topic-helper-canonical.md) · [全トピック](seo.md)
