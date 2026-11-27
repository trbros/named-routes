# Regras de nomes automáticos

Topic: `naming` · Named Routes v2.2.0

Segmentos estáticos são unidos por pontos. Parâmetros dinâmicos, opcionais, catch-all e catch-all opcionais usam $ seguido do nome do parâmetro; segmentos mistos como v[major]-[minor] viram v$major-$minor. A página raiz é home. O cifrão diferencia um parâmetro dinâmico de um segmento literal.

Nomes de arquivo do framework (page.tsx, index, +page.svelte, _index, route.tsx) não viram segmentos do nome. Grupos de rotas, slots paralelos e layouts sem caminho são omitidos. Criar, mover ou excluir uma página altera o nome público inferido; aliases opcionais preservam um nome estável quando URLs mudam.

O estilo é configurável com naming: separator (padrão "."), paramPrefix (padrão "$", pode ser vazio) e home (padrão "home"). Em uma configuração JavaScript ou TypeScript, naming.transform(rota) pode retornar outro nome para qualquer rota automática.

```text
App Router                           Pages Router                     Name
app/page.tsx                         pages/index.tsx                  home
app/user/page.tsx                    pages/user/index.tsx             user
app/user/profile/page.tsx            pages/user/profile.tsx           user.profile
app/users/[user]/page.tsx            pages/users/[user].tsx           users.$user
app/docs/[...slug]/page.tsx          pages/docs/[...slug].tsx          docs.$slug
app/shop/[[...path]]/page.tsx        pages/shop/[[...path]].tsx        shop.$path
```
