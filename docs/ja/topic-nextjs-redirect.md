# App Router — redirect()

[ドキュメント](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-redirect.md) · [Português](../pt/topic-nextjs-redirect.md) · [Español](../es/topic-nextjs-redirect.md) · [日本語](../ja/topic-nextjs-redirect.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-redirect"></a>

サーバーで Next.js の redirect を使います。Named Routes は URL の生成のみ行います。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/user/profile`。

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/user/profile`。

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## 関連トピック

- [App Router のレシピ](topic-app-router.md)
- [App Router — プログラム遷移](topic-nextjs-router-push.md)

---

← 前へ: [App Router — プログラム遷移](topic-nextjs-router-push.md) · [全トピック](framework-nextjs.md)
