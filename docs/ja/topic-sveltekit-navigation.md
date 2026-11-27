# リンクとナビゲーション

[ドキュメント](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-navigation.md) · [Português](../pt/topic-sveltekit-navigation.md) · [Español](../es/topic-sveltekit-navigation.md) · [日本語](../ja/topic-sveltekit-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-navigation"></a>

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## 関連トピック

- [route()](topic-helper-route.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [クエリ文字列](topic-query-hash.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [ナビゲーション — goto()](topic-sveltekit-programmatic.md)

---

← 前へ: [ファイル規則と検出](topic-sveltekit-conventions.md) · [全トピック](framework-sveltekit.md) · 次へ: [ナビゲーション — goto()](topic-sveltekit-programmatic.md) →
