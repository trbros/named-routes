# API programática del generador

[Documentación](index.md) / [Generador y API de herramientas](generator.md)

[English](../en/topic-generator-api.md) · [Português](../pt/topic-generator-api.md) · [Español](../es/topic-generator-api.md) · [日本語](../ja/topic-generator-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-api"></a>

discoverRoutes(opciones?) devuelve root, framework, directories, routes, entries y los defaults del runtime sin escribir nada. Cada entrada tiene name, path, file, router, framework y, opcionalmente, variant y localized. Las rutas extra explícitas tienen file: null y router: explicit.

generateRoutes(opciones?, { check?: boolean }?) devuelve además output y changed. El modo check rechaza la salida desactualizada sin modificarla. validateOptions(opciones) lanza INVALID_CONFIG ante claves desconocidas. Importa /generator y /config solo en herramientas de Node, nunca en código de cliente. withNamedRoutes viene de /next y namedRoutes de /vite.

## Temas relacionados

- [discoverRoutes()](topic-generator-discover.md)
- [generateRoutes()](topic-generator-generate.md)
- [validateOptions()](topic-generator-validate.md)
- [Configuración del generador](topic-configuration.md)

---

[Todos los temas](generator.md) · Siguiente: [discoverRoutes()](topic-generator-discover.md) →
