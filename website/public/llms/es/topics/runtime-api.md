# Referencia de la API del runtime

Topic: `runtime-api` · Named Routes v2.2.0

createRoutes(manifiesto, defaults?) crea un helper independiente y congelado y copia el manifiesto. Defaults contiene basePath, assetBase, trailingSlash, origin e i18n. parsePattern(patrón) devuelve segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed y valida la sintaxis; formatPattern es su inverso y patternParameters lista los nombres de los parámetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes y PatternSegment son tipos exportados.

Un manifiesto tipado como un simple Record<string, string> (por ejemplo, cargado desde JSON) sigue funcionando: los nombres pasan a ser string y los parámetros un registro flexible, mientras el runtime sigue validando cada llamada.

Related topic IDs: helper-route, public-url, helper-create-routes, helper-endpoint, helper-match, helper-parse-pattern, helper-define-query, assets
