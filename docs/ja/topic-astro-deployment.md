# ベースパスとデプロイ

[ドキュメント](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-deployment.md) · [Português](../pt/topic-astro-deployment.md) · [Español](../es/topic-astro-deployment.md) · [日本語](../ja/topic-astro-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-deployment"></a>

Astro で `base` を設定します。route() はベースを含みます。

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
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

## 関連トピック

- [ベースパス — 内部と公開 URL](topic-base-path.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [assetBase と CDN](topic-asset-base.md)

---

← 前へ: [ナビゲーション — Astro.redirect()](topic-astro-programmatic.md) · [全トピック](framework-astro.md) · 次へ: [公開アセット](topic-astro-assets.md) →
