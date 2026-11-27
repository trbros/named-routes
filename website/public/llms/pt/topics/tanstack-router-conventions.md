# Convenções de arquivos e descoberta

Topic: `tanstack-router-conventions` · Named Routes v2.2.0

Crie `src/routes/users/$id.tsx` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** __root é ignorado; index e route.tsx são a rota da pasta; arquivos planos (posts.$postId.tsx) e em pastas se misturam; $param; {-$locale} é opcional ([[locale]]); prefixo{$id}sufixo vira um segmento misto; um $ isolado é um splat chamado _splat ([[..._splat]]); _layout não tem caminho; posts_ sai do aninhamento; arquivos com prefixo - e pastas (grupo) são ignorados; arquivos .lazy pertencem à mesma rota.

**Verificado.** Os nomes vêm do routeTree.gen.ts que o plugin ou a CLI do TanStack Router gera (seus caminhos navegáveis); antes de ele existir, os arquivos são varridos. Testes de convenção mais o examples/tanstack-router, que compila e roda com o plugin do TanStack Router.

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
