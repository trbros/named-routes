# ナビゲーション — router.push()

[ドキュメント](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-programmatic.md) · [Português](../pt/topic-vue-programmatic.md) · [Español](../es/topic-vue-programmatic.md) · [日本語](../ja/topic-vue-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-programmatic"></a>

コンポーネントやイベント内で使用します。Named Routes はパスを構築し、ネイティブ関数が遷移を実行します。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## 関連トピック

- [リンクとナビゲーション](topic-vue-navigation.md)
- [ベースパスとデプロイ](topic-vue-deployment.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [リンクとナビゲーション](topic-vue-navigation.md) · [全トピック](framework-vue.md) · 次へ: [ベースパスとデプロイ](topic-vue-deployment.md) →
