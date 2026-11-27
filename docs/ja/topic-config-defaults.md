# URL の既定値

[ドキュメント](index.md) / [設定とランタイムリファレンス](api-reference.md)

[English](../en/topic-config-defaults.md) · [Português](../pt/topic-config-defaults.md) · [Español](../es/topic-config-defaults.md) · [日本語](../ja/topic-config-defaults.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-defaults"></a>

defaults に basePath、includeBasePath、origin、trailingSlash、assetBase を設定できます。公開される値なので秘密情報は含めないでください。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

## 関連トピック

- [ベースパス — 内部と公開 URL](topic-base-path.md)
- [assetBase と CDN](topic-asset-base.md)
- [絶対 URL と origin](topic-absolute-urls.md)

---

← 前へ: [命名規則](topic-config-naming.md) · [全トピック](api-reference.md) · 次へ: [明示ルートの追加](topic-config-extra-routes.md) →
