# App Router — navegação programática

[Documentação](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-router-push.md) · [Português](../pt/topic-nextjs-router-push.md) · [Español](../es/topic-nextjs-router-push.md) · [日本語](../ja/topic-nextjs-router-push.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-router-push"></a>

Em Client Component, use useRouter de next/navigation e passe uma rota interna tipada. O roteador aplica basePath.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/posts/42/edit`.

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
## Com base path

URL no navegador: `/app/posts/42/edit`.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

## Tópicos relacionados

- [Exemplos com App Router](topic-app-router.md)
- [Links e navegação](topic-nextjs-navigation.md)
- [route()](topic-helper-route.md)

---

← Anterior: [Hrefs tipados para o typedRoutes do Next.js](topic-typed-hrefs.md) · [Todos os tópicos](framework-nextjs.md) · Próximo: [App Router — redirect()](topic-nextjs-redirect.md) →
