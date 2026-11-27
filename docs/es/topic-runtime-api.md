# Referencia de la API del runtime

[Documentación](index.md) / [Configuración y referencia del runtime](api-reference.md)

[English](../en/topic-runtime-api.md) · [Português](../pt/topic-runtime-api.md) · [Español](../es/topic-runtime-api.md) · [日本語](../ja/topic-runtime-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="runtime-api"></a>

createRoutes(manifiesto, defaults?) crea un helper independiente y congelado y copia el manifiesto. Defaults contiene basePath, assetBase, trailingSlash, origin e i18n. parsePattern(patrón) devuelve segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed y valida la sintaxis; formatPattern es su inverso y patternParameters lista los nombres de los parámetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes y PatternSegment son tipos exportados.

Un manifiesto tipado como un simple Record<string, string> (por ejemplo, cargado desde JSON) sigue funcionando: los nombres pasan a ser string y los parámetros un registro flexible, mientras el runtime sigue validando cada llamada.

## Temas relacionados

- [route()](topic-helper-route.md)
- [route.url() — URL públicas](topic-public-url.md)
- [createRoutes()](topic-helper-create-routes.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [route.match()](topic-helper-match.md)
- [parsePattern()](topic-helper-parse-pattern.md)
- [defineQuery()](topic-helper-define-query.md)
- [asset() / route.asset()](topic-assets.md)

---

[Todos los temas](api-reference.md) · Siguiente: [Configuración del generador](topic-configuration.md) →
