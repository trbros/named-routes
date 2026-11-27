# CLI e CI

[Documentação](index.md) / [CLI, CI e solução de problemas](guides.md)

[English](../en/topic-cli.md) · [Português](../pt/topic-cli.md) · [Español](../es/topic-cli.md) · [日本語](../ja/topic-cli.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="cli"></a>

O binário se chama named-routes. generate (padrão) escreve o manifesto. list imprime as entradas descobertas em JSON. check compara sem escrever e sai com código 1 quando está desatualizado. watch gera inicialmente e mantém o módulo atualizado até SIGINT/SIGTERM (eventos de arquivo com varredura, ou polling com --watch-mode poll). init cria named-routes.config.mjs para o framework detectado e nunca sobrescreve uma configuração existente. doctor diagnostica o projeto sem escrever nada (veja Diagnóstico).

Flags: --root <diretório>, --config <arquivo>, --framework <nome>, --output <arquivo>, --routes-dir <pasta>, --router <auto|app|pages>, --api, --watch-interval <ms>, --watch-mode <auto|native|poll>, --json, --strict, --no-color e --v2 (doctor), --to e --write (migrate), --version (-v), --help (-h). Execute os comandos no projeto consumidor com o pacote instalado localmente. Erros mostram o code e, quando conhecidos, o arquivo, a rota, a opção e uma correção.

Se você versiona o arquivo gerado, rode check antes do build. As integrações regeneram durante o build, então um check após esse build não detecta um arquivo versionado que já estava desatualizado. A geração é determinística, atômica e sem timestamps. Arquivos existentes sem a assinatura do gerador nunca são sobrescritos.

migrate --to 2 prepara um projeto 1.x para a 2.0: fixa hrefs: "string" e, quando as rotas do framework diferem da varredura de arquivos, discovery: "files" no config do named-routes (criando named-routes.config.mjs se não houver), para que o módulo gerado continue igual até você remover essas linhas. É uma simulação, a menos que você passe --write, e nunca edita configs de framework nem código da aplicação. doctor --v2 lista o resto (Node.js, TypeScript, moduleResolution, códigos de erro).

Use npx @triooo/named-routes generate para execução independente ou npm exec -- named-routes generate com o pacote instalado. O pacote sem escopo named-routes não é este projeto. --base-path /docs sobrescreve o prefixo nesta execução; --base-path / o limpa.

**Sobrescrita do prefixo.** --base-path <path> funciona em geração/check/watch e doctor. Sobrescreve o prefixo em cache e o default compartilhado nessa execução; / limpa o prefixo. Os snapshots das integrações são metadados gerados, não arquivos-fonte.

Com o pacote instalado localmente, use pnpm exec named-routes list (pnpm) ou npm exec --package=@triooo/named-routes -- named-routes list (npm). Se o Windows informar MODULE_NOT_FOUND antes de iniciar a CLI, inspecione o atalho gerado e reinstale com o gerenciador original. Um atalho que aponta para fora de node_modules não pode ser corrigido por código da CLI que nem chega a executar. O bin do pacote aponta para bin/named-routes.js; o launcher carrega dist/cli.js relativo a si mesmo e preserva o diretório de trabalho.

## Exemplo

```sh
npx @triooo/named-routes --help
```

## Tópicos relacionados

- [init](topic-cli-init.md)
- [generate](topic-cli-generate.md)
- [list](topic-cli-list.md)
- [check](topic-cli-check.md)
- [watch](topic-cli-watch.md)
- [Diagnóstico: named-routes doctor](topic-doctor.md)
- [Auditoria de rotas e assets](topic-audit.md)
- [migrate --to 2](topic-cli-migrate.md)

---

[Todos os tópicos](guides.md) · Próximo: [init](topic-cli-init.md) →
