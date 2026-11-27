# App Router — navegación programática

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-router-push.md) · [Português](../pt/topic-nextjs-router-push.md) · [Español](../es/topic-nextjs-router-push.md) · [日本語](../ja/topic-nextjs-router-push.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-router-push"></a>

En un Client Component usa useRouter de next/navigation con una ruta interna. El router aplica basePath.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/posts/42/edit`.

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
## Con base path

URL en el navegador: `/app/posts/42/edit`.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

## Temas relacionados

- [Recetas para el App Router](topic-app-router.md)
- [Enlaces y navegación](topic-nextjs-navigation.md)
- [route()](topic-helper-route.md)

---

← Anterior: [Hrefs tipados para typedRoutes de Next.js](topic-typed-hrefs.md) · [Todos los temas](framework-nextjs.md) · Siguiente: [App Router — redirect()](topic-nextjs-redirect.md) →
