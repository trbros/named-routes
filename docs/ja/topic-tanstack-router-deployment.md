# ベースパスとデプロイ

[ドキュメント](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-deployment.md) · [Português](../pt/topic-tanstack-router-deployment.md) · [Español](../es/topic-tanstack-router-deployment.md) · [日本語](../ja/topic-tanstack-router-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-deployment"></a>

TanStack Router で `basepath` を設定します。route() は内部パスを返し、route.url() は公開パスを返します。

namedRoutes({ routerBase: "/app" }) に同じプレフィックスを設定します。Vite base がルーターのベースと同じ場合のみ inheritViteBase: true を使用できます。

既存ルーターで createRouter({ routeTree, basepath: "/app" }) を使い、ネイティブ Link には固有 ID を渡します。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

## 関連トピック

- [ベースパス — 内部と公開 URL](topic-base-path.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [assetBase と CDN](topic-asset-base.md)

---

← 前へ: [ナビゲーション — window.location.assign()](topic-tanstack-router-programmatic.md) · [全トピック](framework-tanstack-router.md) · 次へ: [公開アセット](topic-tanstack-router-assets.md) →
