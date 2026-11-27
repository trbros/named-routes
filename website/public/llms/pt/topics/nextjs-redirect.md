# App Router — redirect()

Topic: `nextjs-redirect` · Named Routes v2.2.0

Use redirect do Next.js em contexto de servidor suportado. Named Routes apenas constrói a URL; Next.js controla a resposta. Não capture o redirect como erro comum.

## Sem base path

URL no navegador: `/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## Com base path

URL no navegador: `/app/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

Related topic IDs: app-router, nextjs-router-push
