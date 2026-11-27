# route.withDefaults()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-with-defaults.md) · [Português](../pt/topic-helper-with-defaults.md) · [Español](../es/topic-helper-with-defaults.md) · [日本語](../ja/topic-helper-with-defaults.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-with-defaults"></a>

origin、basePath、assetBase、trailingSlash を上書きした独立ヘルパーを作成します。ルート、ロケール設定、固定ロケール、マニフェスト、スキーマは維持され、元のヘルパーは変更されません。任意の Host ヘッダーではなく信頼できるテナント設定を使用してください。戻り値の href 型は安全側の string です。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

## 関連トピック

- [ベースパス — 内部と公開 URL](topic-base-path.md)
- [絶対 URL と origin](topic-absolute-urls.md)
- [createRoutes()](topic-helper-create-routes.md)

---

← 前へ: [createRoutes()](topic-helper-create-routes.md) · [全トピック](route-helpers.md) · 次へ: [parsePattern()](topic-helper-parse-pattern.md) →
