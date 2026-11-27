# Convenções de arquivos e descoberta

Topic: `vue-conventions` · Named Routes v2.2.0

Crie `src/pages/users/[id].vue` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** index.vue e (nome).vue são rotas index; pontos aninham (users.edit.vue é /users/edit); [id] e [[id]]; [id]+ é parâmetro repetível de um ou mais ([...id]) e [[id]]+ de zero ou mais ([[...id]]); [...path] também aceita resto vazio ([[...path]]); pastas (grupo) são omitidas; aninhamento parent.vue + parent/ é mesclado; segmentos mistos como v[major]-[minor] funcionam.

**Verificado.** Os nomes vêm do typed-router.d.ts que o Vue Router 5 grava (opção dts), então sobrescritas com definePage({ path }) são nomeadas pela URL que servem; antes de ele existir, os arquivos são varridos. Um servidor Vite real com essas convenções roda no CI, e o examples/vue compila, roda e é navegado em um navegador com Vue Router 5 (vue-router/vite), incluindo um layout users/_parent.vue e uma página com definePage({ path }).

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
