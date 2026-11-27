# ナビゲーション — window.location.assign()

[ドキュメント](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-programmatic.md) · [Português](../pt/topic-tanstack-router-programmatic.md) · [Español](../es/topic-tanstack-router-programmatic.md) · [日本語](../ja/topic-tanstack-router-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-programmatic"></a>

ページ全体の遷移用です。SPA では TanStack の型付き navigate/Link に固有 ID と params を渡します。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## 関連トピック

- [リンクとナビゲーション](topic-tanstack-router-navigation.md)
- [ベースパスとデプロイ](topic-tanstack-router-deployment.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [リンクとナビゲーション](topic-tanstack-router-navigation.md) · [全トピック](framework-tanstack-router.md) · 次へ: [ベースパスとデプロイ](topic-tanstack-router-deployment.md) →
