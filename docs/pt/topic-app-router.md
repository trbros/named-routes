# Exemplos com App Router

[Documentação](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-app-router.md) · [Português](../pt/topic-app-router.md) · [Español](../es/topic-app-router.md) · [日本語](../ja/topic-app-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="app-router"></a>

O helper retorna uma string de URL normal. Use com next/link, redirect ou useRouter do App Router, importado de next/navigation. Execute redirects no fluxo de servidor ou evento adequado; rotas nomeadas não mudam a semântica de redirect do Next.

Cada nome abaixo pressupõe uma página correspondente: posts/page.tsx, posts/[post]/page.tsx e posts/[post]/edit/page.tsx.

**Prefixo e URLs traduzidas.** O wrapper herda basePath. Mantenha Next Link e navegação do router internos; use basePath: true em âncoras comuns. Para redirecionar aliases traduzidos recebidos, use route.localize() com o idioma já selecionado no proxy ou middleware; consulte i18n.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

## Tópicos relacionados

- [Links e navegação](topic-nextjs-navigation.md)
- [App Router — navegação programática](topic-nextjs-router-push.md)
- [App Router — redirect()](topic-nextjs-redirect.md)
- [Base path e deploy](topic-nextjs-deployment.md)

---

← Anterior: [Endpoints HTTP](topic-nextjs-endpoints.md) · [Todos os tópicos](framework-nextjs.md) · Próximo: [Exemplos com Pages Router](topic-pages-router.md) →
