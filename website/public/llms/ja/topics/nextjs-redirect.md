# App Router — redirect()

Topic: `nextjs-redirect` · Named Routes v2.2.0

サーバーで Next.js の redirect を使います。Named Routes は URL の生成のみ行います。

## ベースパスなし

ブラウザーの URL: `/user/profile`。

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## ベースパスあり

ブラウザーの URL: `/app/user/profile`。

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

Related topic IDs: app-router, nextjs-router-push
