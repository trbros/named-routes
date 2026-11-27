# Convenções de arquivos e descoberta

[Documentação](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-conventions.md) · [Português](../pt/topic-vue-conventions.md) · [Español](../es/topic-vue-conventions.md) · [日本語](../ja/topic-vue-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-conventions"></a>

Crie `src/pages/users/[id].vue` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** index.vue e (nome).vue são rotas index; pontos aninham (users.edit.vue é /users/edit); [id] e [[id]]; [id]+ é parâmetro repetível de um ou mais ([...id]) e [[id]]+ de zero ou mais ([[...id]]); [...path] também aceita resto vazio ([[...path]]); pastas (grupo) são omitidas; aninhamento parent.vue + parent/ é mesclado; segmentos mistos como v[major]-[minor] funcionam.

**Verificado.** Os nomes vêm do typed-router.d.ts que o Vue Router 5 grava (opção dts), então sobrescritas com definePage({ path }) são nomeadas pela URL que servem; antes de ele existir, os arquivos são varridos. Um servidor Vite real com essas convenções roda no CI, e o examples/vue compila, roda e é navegado em um navegador com Vue Router 5 (vue-router/vite), incluindo um layout users/_parent.vue e uma página com definePage({ path }).

## Exemplo

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

## Tópicos relacionados

- [Regras de nomes automáticos](topic-naming.md)
- [Nomes semânticos e grupos](topic-semantic-names.md)
- [Casos especiais de descoberta](topic-discovery.md)

---

← Anterior: [Vue Router: configuração](topic-vue.md) · [Todos os tópicos](framework-vue.md) · Próximo: [Links e navegação](topic-vue-navigation.md) →
