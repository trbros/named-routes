# Site de documentação

[Documentação](index.md) / [Projeto e versões](project.md)

[English](../en/topic-website.md) · [Português](../pt/topic-website.md) · [Español](../es/topic-website.md) · [日本語](../ja/topic-website.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="website"></a>

Esta documentação é um app Next.js em website/. É o site público do projeto, construído com o próprio pacote: todos os links internos usam route(), o playground e as páginas de destino são rotas reais do App Router, e o conteúdo em inglês, português, espanhol e japonês vem do mesmo docs/content.json que gera os READMEs.

A landing page mostra cada framework suportado como uma linha de um mapa de metrô, um painel de partidas alimentado com saídas reais do gerador, uma tabela de compatibilidade e uma jornada de instalação. As animações são finitas ou acionadas pelo usuário, pausam fora da tela e são desativadas por prefers-reduced-motion.

Para publicar na Vercel, crie um projeto com Root Directory em website e mantenha "Include files outside the root directory" ativado. O website/vercel.json instala o repositório, compila o pacote e depois compila o site. Nenhuma variável de ambiente é necessária.

## Exemplo

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```

---

[Todos os tópicos](project.md) · Próximo: [Teste: demos por framework](topic-demos.md) →
