# アセットの絶対 URL

[ドキュメント](index.md) / [アセットと CDN](public-assets.md)

[English](../en/topic-asset-absolute.md) · [Português](../pt/topic-asset-absolute.md) · [Español](../es/topic-asset-absolute.md) · [日本語](../ja/topic-asset-absolute.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-absolute"></a>

absolute: true で信頼できるオリジンを付加します。絶対 CDN URL はそのままです。言語設定は影響しません。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/images/logo.svg
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/app/images/logo.svg
```

## 関連トピック

- [asset() / route.asset()](topic-assets.md)
- [assetBase と CDN](topic-asset-base.md)
- [絶対 URL と origin](topic-absolute-urls.md)

---

← 前へ: [assetBase と CDN](topic-asset-base.md) · [全トピック](public-assets.md) · 次へ: [型付きアセット](topic-typed-assets.md) →
