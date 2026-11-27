# リンクとナビゲーション

Topic: `sveltekit-navigation` · Named Routes v2.2.0

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, sveltekit-programmatic
