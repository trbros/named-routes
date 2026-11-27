# リンクとナビゲーション

[ドキュメント](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-navigation.md) · [Português](../pt/topic-tanstack-router-navigation.md) · [Español](../es/topic-tanstack-router-navigation.md) · [日本語](../ja/topic-tanstack-router-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-navigation"></a>

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

**使いどころ。** TanStack Router は自前の <Link to> をルート ID で型付けしています。route() は普通の文字列が必要な場面で使ってください。<a href>、ほかのアプリへのリダイレクト、メール、サイトマップ、アナリティクス、言語プレフィックス付きの URL、モノレポでほかのフレームワークと共有する名前などです。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## 関連トピック

- [route()](topic-helper-route.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [クエリ文字列](topic-query-hash.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [ナビゲーション — window.location.assign()](topic-tanstack-router-programmatic.md)

---

← 前へ: [ファイル規則と検出](topic-tanstack-router-conventions.md) · [全トピック](framework-tanstack-router.md) · 次へ: [ナビゲーション — window.location.assign()](topic-tanstack-router-programmatic.md) →
