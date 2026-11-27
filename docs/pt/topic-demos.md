# Teste: demos por framework

[Documentação](index.md) / [Projeto e versões](project.md)

[English](../en/topic-demos.md) · [Português](../pt/topic-demos.md) · [Español](../es/topic-demos.md) · [日本語](../ja/topic-demos.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="demos"></a>

examples/ tem um app pequeno e executável para cada configuração suportada: app-router e pages-router (Next.js), nuxt, vue (Vue Router 5), sveltekit, astro, react-router (flat routes), tanstack-router e react (rotas declaradas manualmente com createRoutes). Cada um aponta por nome para uma página estática, uma página dinâmica de usuários ou posts e uma página catch-all de docs; os demos do Next.js também usam typedRoutes com hrefs tipados (App Router) e i18n com query strings (Pages Router). pnpm test:e2e instala o tarball empacotado em uma cópia de cada demo e verifica build, servidor de produção, navegação no navegador e descoberta de páginas em tempo real.

As demos dependem do pacote via file:../.., então compile o pacote uma vez na raiz do repositório e depois instale e rode qualquer demo com npm. O módulo gerado aparece no primeiro dev ou build e muda conforme você cria páginas. Cada demo é compilada com o framework real.

## Exemplo

```sh
# Repository root, once:
pnpm install && pnpm build

# Any demo:
cd examples/nuxt        # or vue, sveltekit, astro, react-router, tanstack-router, react
npm install
npm run dev
# create a page and watch routes.generated.ts update
```

---

← Anterior: [Site de documentação](topic-website.md) · [Todos os tópicos](project.md) · Próximo: [Contribua passo a passo](topic-contributing.md) →
