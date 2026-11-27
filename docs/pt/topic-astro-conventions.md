# Convenções de arquivos e descoberta

[Documentação](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-conventions.md) · [Português](../pt/topic-astro-conventions.md) · [Español](../es/topic-astro-conventions.md) · [日本語](../ja/topic-astro-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-conventions"></a>

Crie `src/pages/users/[id].astro` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** src/pages com páginas .astro, .md, .mdx, .markdown e .html; arquivos e pastas iniciados por _ são privados; [id]; [...slug] aceita zero ou mais segmentos ([[...slug]]); segmentos mistos como [lang]-[version]. Endpoints .ts/.js são opcionais via includeApi e mantêm a extensão interna (api/data.json.ts é /api/data.json).

**Limites e verificação.** Builds estáticos continuam precisando de getStaticPaths nas páginas dinâmicas: o pacote constrói URLs, não enumera parâmetros. Verificado por testes de convenção e pelo examples/astro, que compila e roda com Astro 5.

## Exemplo

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

## Tópicos relacionados

- [Regras de nomes automáticos](topic-naming.md)
- [Nomes semânticos e grupos](topic-semantic-names.md)
- [Casos especiais de descoberta](topic-discovery.md)

---

← Anterior: [Astro: configuração](topic-astro.md) · [Todos os tópicos](framework-astro.md) · Próximo: [Links e navegação](topic-astro-navigation.md) →
