# ベースパスとデプロイ

[ドキュメント](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-deployment.md) · [Português](../pt/topic-nextjs-deployment.md) · [Español](../es/topic-nextjs-deployment.md) · [日本語](../ja/topic-nextjs-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-deployment"></a>

Next.js で `basePath` を設定します。route() は内部パスを返し、route.url() は公開パスを返します。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

## 関連トピック

- [ベースパス — 内部と公開 URL](topic-base-path.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [assetBase と CDN](topic-asset-base.md)

---

← 前へ: [リンクとナビゲーション](topic-nextjs-navigation.md) · [全トピック](framework-nextjs.md) · 次へ: [公開アセット](topic-nextjs-assets.md) →
