# API programática do gerador

Topic: `generator-api` · Named Routes v2.2.0

discoverRoutes(opções?) retorna root, framework, directories, routes, entries e os defaults do runtime sem escrever. Cada entrada tem name, path, file, router, framework e, opcionalmente, variant e localized. Rotas extras explícitas têm file: null e router: explicit.

generateRoutes(opções?, { check?: boolean }?) também retorna output e changed. O modo check rejeita saída desatualizada sem modificá-la. validateOptions(opções) lança INVALID_CONFIG para chaves desconhecidas. Importe /generator e /config apenas em ferramentas Node, nunca em código cliente. withNamedRoutes vem de /next e namedRoutes de /vite.

Related topic IDs: generator-discover, generator-generate, generator-validate, configuration
