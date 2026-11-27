# App Router — redirect()

Topic: `nextjs-redirect` · Named Routes v2.2.0

Usa redirect de Next.js en contexto de servidor. Named Routes solo construye la URL.

## Sin base path

URL en el navegador: `/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## Con base path

URL en el navegador: `/app/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

Related topic IDs: app-router, nextjs-router-push
