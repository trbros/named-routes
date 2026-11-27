# App Router — programmatic navigation

Topic: `nextjs-router-push` · Named Routes v2.2.0

In a Client Component, use next/navigation useRouter and pass an internal typed route. The router applies basePath.

## Without base path

Browser URL: `/posts/42/edit`.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

## With base path

Browser URL: `/app/posts/42/edit`.

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
