# Referência da API de runtime

Topic: `runtime-api` · Named Routes v2.2.0

createRoutes(manifesto, defaults?) cria um helper congelado e independente e copia o manifesto. Defaults contém basePath, assetBase, trailingSlash, origin e i18n. parsePattern(padrão) retorna segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed e valida a sintaxe; formatPattern faz o inverso e patternParameters lista os nomes dos parâmetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes e PatternSegment são tipos exportados.

Um manifesto tipado como Record<string, string> simples (por exemplo, carregado de JSON) também funciona: os nomes viram string e os parâmetros, um registro flexível, enquanto o runtime continua validando cada chamada.

Related topic IDs: helper-route, public-url, helper-create-routes, helper-endpoint, helper-match, helper-parse-pattern, helper-define-query, assets
