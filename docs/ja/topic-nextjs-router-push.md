# App Router — プログラム遷移

[ドキュメント](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-router-push.md) · [Português](../pt/topic-nextjs-router-push.md) · [Español](../es/topic-nextjs-router-push.md) · [日本語](../ja/topic-nextjs-router-push.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-router-push"></a>

Client Component では next/navigation の useRouter に内部パスを渡します。basePath はルーターが付加します。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/posts/42/edit`。

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/posts/42/edit`。

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

## 関連トピック

- [App Router のレシピ](topic-app-router.md)
- [リンクとナビゲーション](topic-nextjs-navigation.md)
- [route()](topic-helper-route.md)

---

← 前へ: [Next.js の typedRoutes 向けの型付き href](topic-typed-hrefs.md) · [全トピック](framework-nextjs.md) · 次へ: [App Router — redirect()](topic-nextjs-redirect.md) →
