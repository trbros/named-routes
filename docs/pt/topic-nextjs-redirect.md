# App Router — redirect()

[Documentação](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-redirect.md) · [Português](../pt/topic-nextjs-redirect.md) · [Español](../es/topic-nextjs-redirect.md) · [日本語](../ja/topic-nextjs-redirect.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-redirect"></a>

Use redirect do Next.js em contexto de servidor suportado. Named Routes apenas constrói a URL; Next.js controla a resposta. Não capture o redirect como erro comum.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## Tópicos relacionados

- [Exemplos com App Router](topic-app-router.md)
- [App Router — navegação programática](topic-nextjs-router-push.md)

---

← Anterior: [App Router — navegação programática](topic-nextjs-router-push.md) · [Todos os tópicos](framework-nextjs.md)
