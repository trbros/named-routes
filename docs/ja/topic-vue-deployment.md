# ベースパスとデプロイ

[ドキュメント](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-deployment.md) · [Português](../pt/topic-vue-deployment.md) · [Español](../es/topic-vue-deployment.md) · [日本語](../ja/topic-vue-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-deployment"></a>

Vue Router で `history base` を設定します。route() は内部パスを返し、route.url() は公開パスを返します。

namedRoutes({ routerBase: "/app" }) に同じプレフィックスを設定します。Vite base がルーターのベースと同じ場合のみ inheritViteBase: true を使用できます。

src/main.ts で createWebHistory(import.meta.env.BASE_URL) を設定します。

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

← 前へ: [ナビゲーション — router.push()](topic-vue-programmatic.md) · [全トピック](framework-vue.md) · 次へ: [公開アセット](topic-vue-assets.md) →
