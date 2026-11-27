# Convenções de arquivos e descoberta

Topic: `nuxt-conventions` · Named Routes v2.2.0

Crie `app/pages/users/[id].vue` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** app/pages ou pages: index.vue, [id], [[id]] opcional, [...slug] (também aceita resto vazio, então vira [[...slug]]), pastas (grupo), segmentos mistos como v[major]-[minor] e aninhamento parent.vue + parent/ mesclado em uma rota. Arquivos iniciados por - são ignorados. Com includeApi, server/api (com prefixo /api) e server/routes são lidos e os sufixos .get/.post são removidos.

**Limites e verificação.** O módulo também grava .nuxt/named-routes/pages.json, então named-routes check e generate veem as mesmas rotas depois do nuxt prepare. Liste-o antes de @nuxtjs/i18n em modules, para que ele veja as rotas antes de serem localizadas. O plugin Vite continua funcionando no Nuxt, mas só enxerga os arquivos. Os nomes seguem o estilo com pontos deste pacote (users.$id), não os nomes de rota do Nuxt (users-id). Verificado por testes de convenção e pelo examples/nuxt, que compila e roda com Nuxt 4, incluindo uma página com definePageMeta({ path }).

```text
app/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
