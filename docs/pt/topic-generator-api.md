# API programática do gerador

[Documentação](index.md) / [Gerador e API de ferramentas](generator.md)

[English](../en/topic-generator-api.md) · [Português](../pt/topic-generator-api.md) · [Español](../es/topic-generator-api.md) · [日本語](../ja/topic-generator-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-api"></a>

discoverRoutes(opções?) retorna root, framework, directories, routes, entries e os defaults do runtime sem escrever. Cada entrada tem name, path, file, router, framework e, opcionalmente, variant e localized. Rotas extras explícitas têm file: null e router: explicit.

generateRoutes(opções?, { check?: boolean }?) também retorna output e changed. O modo check rejeita saída desatualizada sem modificá-la. validateOptions(opções) lança INVALID_CONFIG para chaves desconhecidas. Importe /generator e /config apenas em ferramentas Node, nunca em código cliente. withNamedRoutes vem de /next e namedRoutes de /vite.

## Tópicos relacionados

- [discoverRoutes()](topic-generator-discover.md)
- [generateRoutes()](topic-generator-generate.md)
- [validateOptions()](topic-generator-validate.md)
- [Configuração do gerador](topic-configuration.md)

---

[Todos os tópicos](generator.md) · Próximo: [discoverRoutes()](topic-generator-discover.md) →
