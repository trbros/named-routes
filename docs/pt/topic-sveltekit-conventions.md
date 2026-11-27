# Convenções de arquivos e descoberta

[Documentação](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-conventions.md) · [Português](../pt/topic-sveltekit-conventions.md) · [Español](../es/topic-sveltekit-conventions.md) · [日本語](../ja/topic-sveltekit-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-conventions"></a>

Crie `src/routes/users/[id]/+page.svelte` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** src/routes com +page.svelte, +page.ts ou +page.server.ts (eles se mesclam em uma rota); pastas (grupo) são omitidas; [id=matcher] mantém o parâmetro e descarta o matcher; [[lang]] é opcional; [...rest] aceita zero ou mais segmentos ([[...rest]]) e pode vir antes de segmentos estáticos; resets de layout +page@ são páginas normais; escapes [x+2f] e [u+0041] são decodificados. Endpoints +server são opcionais via includeApi.

**Verificação.** Os testes de convenção e a integração examples/sveltekit cobrem descoberta e navegação; o exemplo atual usa SvelteKit 3 com Svelte 5.

## Exemplo

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

## Tópicos relacionados

- [Regras de nomes automáticos](topic-naming.md)
- [Nomes semânticos e grupos](topic-semantic-names.md)
- [Casos especiais de descoberta](topic-discovery.md)

---

← Anterior: [SvelteKit: configuração](topic-sveltekit.md) · [Todos os tópicos](framework-sveltekit.md) · Próximo: [Links e navegação](topic-sveltekit-navigation.md) →
