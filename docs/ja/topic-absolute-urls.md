# 絶対 URL と origin

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-absolute-urls.md) · [Português](../pt/topic-absolute-urls.md) · [Español](../es/topic-absolute-urls.md) · [日本語](../ja/topic-absolute-urls.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="absolute-urls"></a>

defaults.origin に信頼できる HTTP(S) オリジンを設定します。認証情報、パス、クエリ、フラグメントは不可です。absolute: true でベースを含む絶対 URL を生成します。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

## 関連トピック

- [ベースパス — 内部と公開 URL](topic-base-path.md)
- [route.canonical()](topic-helper-canonical.md)
- [route.withDefaults()](topic-helper-with-defaults.md)

---

← 前へ: [ベースパス — 内部と公開 URL](topic-base-path.md) · [全トピック](build-with-routes.md) · 次へ: [末尾スラッシュ](topic-trailing-slash.md) →
