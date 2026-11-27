# ナビゲーション — goto()

[ドキュメント](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-programmatic.md) · [Português](../pt/topic-sveltekit-programmatic.md) · [Español](../es/topic-sveltekit-programmatic.md) · [日本語](../ja/topic-sveltekit-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-programmatic"></a>

コンポーネントやイベント内で使用します。Named Routes はパスを構築し、ネイティブ関数が遷移を実行します。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

## 関連トピック

- [リンクとナビゲーション](topic-sveltekit-navigation.md)
- [ベースパスとデプロイ](topic-sveltekit-deployment.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [リンクとナビゲーション](topic-sveltekit-navigation.md) · [全トピック](framework-sveltekit.md) · 次へ: [ベースパスとデプロイ](topic-sveltekit-deployment.md) →
