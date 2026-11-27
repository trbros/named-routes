# Convenções de arquivos e descoberta

[Documentação](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-conventions.md) · [Português](../pt/topic-tanstack-router-conventions.md) · [Español](../es/topic-tanstack-router-conventions.md) · [日本語](../ja/topic-tanstack-router-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-conventions"></a>

Crie `src/routes/users/$id.tsx` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** __root é ignorado; index e route.tsx são a rota da pasta; arquivos planos (posts.$postId.tsx) e em pastas se misturam; $param; {-$locale} é opcional ([[locale]]); prefixo{$id}sufixo vira um segmento misto; um $ isolado é um splat chamado _splat ([[..._splat]]); _layout não tem caminho; posts_ sai do aninhamento; arquivos com prefixo - e pastas (grupo) são ignorados; arquivos .lazy pertencem à mesma rota.

**Verificado.** Os nomes vêm do routeTree.gen.ts que o plugin ou a CLI do TanStack Router gera (seus caminhos navegáveis); antes de ele existir, os arquivos são varridos. Testes de convenção mais o examples/tanstack-router, que compila e roda com o plugin do TanStack Router.

## Exemplo

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

## Tópicos relacionados

- [Regras de nomes automáticos](topic-naming.md)
- [Nomes semânticos e grupos](topic-semantic-names.md)
- [Casos especiais de descoberta](topic-discovery.md)

---

← Anterior: [TanStack Router: configuração](topic-tanstack-router.md) · [Todos os tópicos](framework-tanstack-router.md) · Próximo: [Links e navegação](topic-tanstack-router-navigation.md) →
