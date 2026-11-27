# アセットのバージョン管理

[ドキュメント](index.md) / [アセットと CDN](public-assets.md)

[English](../en/topic-asset-versioning.md) · [Português](../pt/topic-asset-versioning.md) · [Español](../es/topic-asset-versioning.md) · [日本語](../ja/topic-asset-versioning.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-versioning"></a>

`{ version: true }` はコンテンツの SHA-256 の先頭12桁を v に追加または置換します。既存のクエリとフラグメントを保持します。アセット検出を有効にし、内容変更時に再生成してください。外部 URL や未検出ファイルには使えません。キャッシュ回避であり、暗号学的整合性保証や CDN のパージではありません。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /css/custom.css?theme=dark&v=a8f32c910123#top
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  basePath: "/app",
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /app/css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /app/css/custom.css?theme=dark&v=a8f32c910123#top
```

---

← 前へ: [asset.info()](topic-asset-info.md) · [全トピック](public-assets.md)
