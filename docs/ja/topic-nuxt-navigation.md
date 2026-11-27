# リンクとナビゲーション

[ドキュメント](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-navigation.md) · [Português](../pt/topic-nuxt-navigation.md) · [Español](../es/topic-nuxt-navigation.md) · [日本語](../ja/topic-nuxt-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-navigation"></a>

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

## 関連トピック

- [route()](topic-helper-route.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [クエリ文字列](topic-query-hash.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [ナビゲーション — navigateTo()](topic-nuxt-programmatic.md)

---

← 前へ: [ファイル規則と検出](topic-nuxt-conventions.md) · [全トピック](framework-nuxt.md) · 次へ: [ナビゲーション — navigateTo()](topic-nuxt-programmatic.md) →
