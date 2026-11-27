# App Router — redirect()

Topic: `nextjs-redirect` · Named Routes v2.2.0

Use Next.js redirect in a supported server context. Named Routes builds the URL only; Next.js controls the redirect response. Do not catch the framework redirect as an ordinary error.

## Without base path

Browser URL: `/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## With base path

Browser URL: `/app/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

Related topic IDs: app-router, nextjs-router-push
