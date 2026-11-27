# Atualizando da 1.x

[Documentação](index.md) / [Projeto e versões](project.md)

[English](../en/topic-migration.md) · [Português](../pt/topic-migration.md) · [Español](../es/topic-migration.md) · [日本語](../ja/topic-migration.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="migration"></a>

A 2.0 muda padrões só onde a mudança compensa; toda mudança pode ser desfeita no config. Rode npx @triooo/named-routes doctor --v2 para ver o que se aplica ao seu projeto, depois npx @triooo/named-routes migrate --to 2 (simulação) e --write para fixar o comportamento da 1.x onde o módulo gerado mudaria. Remova as linhas fixadas quando quiser adotar os novos padrões.

Node.js 22.12+ é obrigatório (o 20 está em fim de vida desde abril de 2026); ele traz require() de módulos ES e observação recursiva nativa de arquivos em todas as plataformas. TypeScript 5.4+ é obrigatório para os tipos exportados, que também é o mínimo do Zod 4 e do Valibot 1.

route() retorna hrefs tipados por padrão. Antes: string. Depois: `/users/${string}`, aceito pelo typedRoutes do Next.js sem cast. Código que guarda uma rota numa variável e depois atribui outra string a ela deixa de compilar: anote-a como string, ou use hrefs: "string".

As rotas vêm do framework quando ele publica sua tabela (módulo do Nuxt, Vue Router 5, React Router, TanStack Router). Antes: caminhos de definePageMeta/definePage e rotas de app/routes.ts precisavam de extraRoutes. Depois: são nomeados como qualquer página, e as entradas de extraRoutes que os duplicavam podem sair. Use discovery: "files" para manter a varredura de arquivos. No Nuxt, troque o plugin Vite por modules: ["@triooo/named-routes/nuxt"].

Valores inválidos de router, pageExtensions e output geram INVALID_CONFIG em vez de GENERATION_ERROR, para que cada classe de erro tenha um código; revise comparações com error.code. typesVersions foi removido: o TypeScript precisa resolver o pacote pelos exports, com moduleResolution bundler, node16 ou nodenext (node10 não consegue). Módulos gerados que importam schemas de query só como tipos agora usam TypeOnlyQueries, então route.parseQuery() é tipado como retornando a query crua nesses casos.

## Exemplo

```sh
npx @triooo/named-routes doctor --v2
npx @triooo/named-routes migrate --to 2           # dry run
npx @triooo/named-routes migrate --to 2 --write   # pins hrefs/discovery in named-routes.config

# Keep a reassigned route as a string
const [href, setHref] = useState<string>(route("home"));
```

---

← Anterior: [Versões e atualizações](topic-versioning.md) · [Todos os tópicos](project.md) · Próximo: [Playground dos helpers](topic-helpers-playground.md) →
