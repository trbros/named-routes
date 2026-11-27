# Convenções de arquivos e descoberta

Topic: `astro-conventions` · Named Routes v2.2.0

Crie `src/pages/users/[id].astro` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** src/pages com páginas .astro, .md, .mdx, .markdown e .html; arquivos e pastas iniciados por _ são privados; [id]; [...slug] aceita zero ou mais segmentos ([[...slug]]); segmentos mistos como [lang]-[version]. Endpoints .ts/.js são opcionais via includeApi e mantêm a extensão interna (api/data.json.ts é /api/data.json).

**Limites e verificação.** Builds estáticos continuam precisando de getStaticPaths nas páginas dinâmicas: o pacote constrói URLs, não enumera parâmetros. Verificado por testes de convenção e pelo examples/astro, que compila e roda com Astro 5.

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
