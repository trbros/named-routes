# リンクとナビゲーション

[ドキュメント](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-navigation.md) · [Português](../pt/topic-nextjs-navigation.md) · [Español](../es/topic-nextjs-navigation.md) · [日本語](../ja/topic-nextjs-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-navigation"></a>

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

## 関連トピック

- [route()](topic-helper-route.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [クエリ文字列](topic-query-hash.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [ファイル規則と検出](topic-nextjs-conventions.md) · [全トピック](framework-nextjs.md) · 次へ: [ベースパスとデプロイ](topic-nextjs-deployment.md) →
