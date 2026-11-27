# リンクとナビゲーション

[ドキュメント](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-navigation.md) · [Português](../pt/topic-astro-navigation.md) · [Español](../es/topic-astro-navigation.md) · [日本語](../ja/topic-astro-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-navigation"></a>

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## 関連トピック

- [route()](topic-helper-route.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [クエリ文字列](topic-query-hash.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [ナビゲーション — Astro.redirect()](topic-astro-programmatic.md)

---

← 前へ: [ファイル規則と検出](topic-astro-conventions.md) · [全トピック](framework-astro.md) · 次へ: [ナビゲーション — Astro.redirect()](topic-astro-programmatic.md) →
