# route.asset()

[ドキュメント](index.md) / [アセットと CDN](public-assets.md)

[English](../en/topic-helper-route-asset.md) · [Português](../pt/topic-helper-route-asset.md) · [Español](../es/topic-helper-route-asset.md) · [日本語](../ja/topic-helper-route-asset.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-route-asset"></a>

型付きヘルパーを含むすべてのヘルパーに route.asset があり、生成モジュールの asset export と同じ既定値とマニフェストを使用します。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" });
route.asset("logo.svg"); // /logo.svg
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" }, { basePath: "/app" });
route.asset("logo.svg"); // /app/logo.svg
```

## 関連トピック

- [asset() / route.asset()](topic-assets.md)
- [assetBase と CDN](topic-asset-base.md)

---

← 前へ: [asset() / route.asset()](topic-assets.md) · [全トピック](public-assets.md) · 次へ: [assetBase と CDN](topic-asset-base.md) →
