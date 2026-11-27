# Referência da API de runtime

[Documentação](index.md) / [Configuração e referência do runtime](api-reference.md)

[English](../en/topic-runtime-api.md) · [Português](../pt/topic-runtime-api.md) · [Español](../es/topic-runtime-api.md) · [日本語](../ja/topic-runtime-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="runtime-api"></a>

createRoutes(manifesto, defaults?) cria um helper congelado e independente e copia o manifesto. Defaults contém basePath, assetBase, trailingSlash, origin e i18n. parsePattern(padrão) retorna segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed e valida a sintaxe; formatPattern faz o inverso e patternParameters lista os nomes dos parâmetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes e PatternSegment são tipos exportados.

Um manifesto tipado como Record<string, string> simples (por exemplo, carregado de JSON) também funciona: os nomes viram string e os parâmetros, um registro flexível, enquanto o runtime continua validando cada chamada.

## Tópicos relacionados

- [route()](topic-helper-route.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [createRoutes()](topic-helper-create-routes.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [route.match()](topic-helper-match.md)
- [parsePattern()](topic-helper-parse-pattern.md)
- [defineQuery()](topic-helper-define-query.md)
- [asset() / route.asset()](topic-assets.md)

---

[Todos os tópicos](api-reference.md) · Próximo: [Configuração do gerador](topic-configuration.md) →
