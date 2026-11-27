# ナビゲーション — navigateTo()

[ドキュメント](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-programmatic.md) · [Português](../pt/topic-nuxt-programmatic.md) · [Español](../es/topic-nuxt-programmatic.md) · [日本語](../ja/topic-nuxt-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-programmatic"></a>

コンポーネントやイベント内で使用します。Named Routes はパスを構築し、ネイティブ関数が遷移を実行します。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

## 関連トピック

- [リンクとナビゲーション](topic-nuxt-navigation.md)
- [ベースパスとデプロイ](topic-nuxt-deployment.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [リンクとナビゲーション](topic-nuxt-navigation.md) · [全トピック](framework-nuxt.md) · 次へ: [ベースパスとデプロイ](topic-nuxt-deployment.md) →
