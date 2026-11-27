# App Router — redirect()

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-redirect.md) · [Português](../pt/topic-nextjs-redirect.md) · [Español](../es/topic-nextjs-redirect.md) · [日本語](../ja/topic-nextjs-redirect.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-redirect"></a>

Usa redirect de Next.js en contexto de servidor. Named Routes solo construye la URL.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## Temas relacionados

- [Recetas para el App Router](topic-app-router.md)
- [App Router — navegación programática](topic-nextjs-router-push.md)

---

← Anterior: [App Router — navegación programática](topic-nextjs-router-push.md) · [Todos los temas](framework-nextjs.md)
