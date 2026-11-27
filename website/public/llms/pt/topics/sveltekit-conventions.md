# Convenções de arquivos e descoberta

Topic: `sveltekit-conventions` · Named Routes v2.2.0

Crie `src/routes/users/[id]/+page.svelte` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** src/routes com +page.svelte, +page.ts ou +page.server.ts (eles se mesclam em uma rota); pastas (grupo) são omitidas; [id=matcher] mantém o parâmetro e descarta o matcher; [[lang]] é opcional; [...rest] aceita zero ou mais segmentos ([[...rest]]) e pode vir antes de segmentos estáticos; resets de layout +page@ são páginas normais; escapes [x+2f] e [u+0041] são decodificados. Endpoints +server são opcionais via includeApi.

**Verificação.** Os testes de convenção e a integração examples/sveltekit cobrem descoberta e navegação; o exemplo atual usa SvelteKit 3 com Svelte 5.

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
