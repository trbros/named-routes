# App Router — プログラム遷移

Topic: `nextjs-router-push` · Named Routes v2.2.0

Client Component では next/navigation の useRouter に内部パスを渡します。basePath はルーターが付加します。

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

Related topic IDs: app-router, nextjs-navigation, helper-route
