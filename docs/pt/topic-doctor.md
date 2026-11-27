# Diagnóstico: named-routes doctor

[Documentação](index.md) / [CLI, CI e solução de problemas](guides.md)

[English](../en/topic-doctor.md) · [Português](../pt/topic-doctor.md) · [Español](../es/topic-doctor.md) · [日本語](../ja/topic-doctor.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="doctor"></a>

npx @triooo/named-routes doctor verifica as versões do Node.js e do TypeScript, o arquivo de configuração, o framework detectado, as rotas descobertas, conflitos e colisões de nomes, se o módulo gerado existe e está atualizado, a integração com Next.js ou Vite, typedRoutes sem hrefs tipados, i18n sem rotas traduzidas e declarações de rotas que a leitura de arquivos não enxerga (definePageMeta({ path }) do Nuxt e chamadas route() em um app/routes.ts do React Router).

É somente leitura: nunca escreve arquivos e nunca executa código da aplicação. As verificações de integração e de declarações são heurísticas de texto, e isso é indicado na saída. Opções passadas diretamente a um plugin são código, então o doctor avisa que não consegue vê-las; mova as opções compartilhadas para o named-routes.config.* ou passe flags como --output.

Cada diagnóstico é error, warning ou info, com um id estável e, quando conhecidos, o arquivo, a rota, a opção e uma correção. --json imprime um relatório para CI e --strict também falha com warnings; cores só são usadas em um TTY e nunca com NO_COLOR ou --no-color. O código de saída 0 indica nenhum erro; 1 indica erros, ou warnings com --strict.

Ele também diz de onde vieram as rotas (a tabela do framework ou os arquivos, e por que caiu para os arquivos) e lista as rotas que existem em só uma das duas visões. doctor --v2 acrescenta o que um projeto escrito para a 1.x precisa mudar para a 2.0: hrefs tipados, rotas que a descoberta pelo framework muda, um moduleResolution que não lê os exports do pacote e código que compara códigos de erro com GENERATION_ERROR.

## Exemplo

```sh
npx @triooo/named-routes doctor
npx @triooo/named-routes doctor --json --strict   # CI
npx @triooo/named-routes doctor --v2              # upgrading from 1.x

# info     Routes come from the framework: typed-router.d.ts.
# info     /sobre (sobre) exists only in the framework's route table; the file conventions do not produce it.
#          file:  src/pages/about.vue
```

---

← Anterior: [watch](topic-cli-watch.md) · [Todos os tópicos](guides.md) · Próximo: [Auditoria de rotas e assets](topic-audit.md) →
