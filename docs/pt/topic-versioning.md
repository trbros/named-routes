# Versões e atualizações

[Documentação](index.md) / [Projeto e versões](project.md)

[English](../en/topic-versioning.md) · [Português](../pt/topic-versioning.md) · [Español](../es/topic-versioning.md) · [日本語](../ja/topic-versioning.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="versioning"></a>

A versão 2.x define o contrato público para nomes inferidos, geração tipada de URLs, adaptadores e descoberta pelo framework, i18n, o wrapper do Next.js, o módulo do Nuxt, o plugin Vite e a CLI. A 1.x não recebe novas funcionalidades.

Versões patch preservam a API documentada enquanto corrigem bugs. Versões minor adicionam funcionalidades compatíveis, como novos adaptadores de framework. Mudanças incompatíveis exigem uma nova versão major. Consulte o changelog antes de atualizar.

Depois de atualizar, reinicie o servidor de desenvolvimento para regenerar o manifesto e execute o type check e os testes de navegação da aplicação. Se mover uma página e precisar preservar o nome público da rota, use um alias explícito.

## Exemplo

```sh
npm install @triooo/named-routes@^2
npx @triooo/named-routes check
npx tsc --noEmit
```

---

← Anterior: [Contribua passo a passo](topic-contributing.md) · [Todos os tópicos](project.md) · Próximo: [Atualizando da 1.x](topic-migration.md) →
