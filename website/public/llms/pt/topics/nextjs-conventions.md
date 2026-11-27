# Convenções de arquivos e descoberta

Topic: `nextjs-conventions` · Named Routes v2.2.0

Crie `app/users/[user]/page.tsx` no seu projeto. No modo de nomes por caminho, o nome será `users.$user`. O framework continua responsável por renderizar a página.

**Convenções.** app/ e pages/ (ou src/app e src/pages) são lidos juntos. App Router: apenas arquivos page; grupos de rotas e slots paralelos são omitidos, interceptações resolvem para a URL canônica, pastas _privadas são ignoradas e %5F vira underscore. Pages Router: index é removido e _app, _document e _error são ignorados. Route Handlers e pages/api são opcionais via includeApi. appDir e pagesDir apontam para pastas personalizadas (ou false para ignorar uma).

**Verificado.** Servidores reais do Next 16 (App Router e Pages Router, com basePath e descoberta de páginas ao vivo) rodam no CI. Demos: examples/app-router e examples/pages-router. Veja também as receitas de App Router e Pages Router.

```text
app/users/[user]/page.tsx
  → users.$user
  → /users/[user]
```

Related topic IDs: naming, semantic-names, discovery
