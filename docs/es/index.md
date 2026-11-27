# Documentación

`@triooo/named-routes` · **v2.2.0**

[Volver al README](../../README.es.md) · [English](../en/index.md) · [Português](../pt/index.md) · [Español](../es/index.md) · [日本語](../ja/index.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

## Primeros pasos

- [Qué hace](topic-overview.md)
- [Instalación](topic-installation.md)
- [Elige tu framework](topic-frameworks.md)
- [Tu primera ruta con nombre (Next.js)](topic-quick-start.md)
- [Reglas de nombres automáticos](topic-naming.md)
- [Lee el manifiesto generado](topic-generated-source.md)
- [Comparación con alternativas](topic-comparison.md)
- [Cómo funciona la generación](topic-architecture.md)

## Next.js

- [Next.js: configuración](topic-nextjs.md)
- [Convenciones y descubrimiento](topic-nextjs-conventions.md)
- [Enlaces y navegación](topic-nextjs-navigation.md)
- [Base path y despliegue](topic-nextjs-deployment.md)
- [Archivos públicos](topic-nextjs-assets.md)
- [Enlaces localizados](topic-nextjs-i18n.md)
- [Endpoints HTTP](topic-nextjs-endpoints.md)
- [Recetas para el App Router](topic-app-router.md)
- [Recetas para el Pages Router](topic-pages-router.md)
- [Hrefs tipados para typedRoutes de Next.js](topic-typed-hrefs.md)
- [App Router — navegación programática](topic-nextjs-router-push.md)
- [App Router — redirect()](topic-nextjs-redirect.md)

## Nuxt

- [Nuxt: configuración](topic-nuxt.md)
- [Convenciones y descubrimiento](topic-nuxt-conventions.md)
- [Enlaces y navegación](topic-nuxt-navigation.md)
- [Navegación — navigateTo()](topic-nuxt-programmatic.md)
- [Base path y despliegue](topic-nuxt-deployment.md)
- [Archivos públicos](topic-nuxt-assets.md)
- [Enlaces localizados](topic-nuxt-i18n.md)
- [Endpoints HTTP](topic-nuxt-endpoints.md)

## Vue Router

- [Vue Router: configuración](topic-vue.md)
- [Convenciones y descubrimiento](topic-vue-conventions.md)
- [Enlaces y navegación](topic-vue-navigation.md)
- [Navegación — router.push()](topic-vue-programmatic.md)
- [Base path y despliegue](topic-vue-deployment.md)
- [Archivos públicos](topic-vue-assets.md)
- [Enlaces localizados](topic-vue-i18n.md)
- [Límites de HTTP](topic-vue-endpoints.md)

## SvelteKit

- [SvelteKit: configuración](topic-sveltekit.md)
- [Convenciones y descubrimiento](topic-sveltekit-conventions.md)
- [Enlaces y navegación](topic-sveltekit-navigation.md)
- [Navegación — goto()](topic-sveltekit-programmatic.md)
- [Base path y despliegue](topic-sveltekit-deployment.md)
- [Archivos públicos](topic-sveltekit-assets.md)
- [Enlaces localizados](topic-sveltekit-i18n.md)
- [Endpoints HTTP](topic-sveltekit-endpoints.md)

## Astro

- [Astro: configuración](topic-astro.md)
- [Convenciones y descubrimiento](topic-astro-conventions.md)
- [Enlaces y navegación](topic-astro-navigation.md)
- [Navegación — Astro.redirect()](topic-astro-programmatic.md)
- [Base path y despliegue](topic-astro-deployment.md)
- [Archivos públicos](topic-astro-assets.md)
- [Enlaces localizados](topic-astro-i18n.md)
- [Endpoints HTTP](topic-astro-endpoints.md)

## React Router / Remix

- [React Router / Remix: configuración](topic-react-router.md)
- [Convenciones y descubrimiento](topic-react-router-conventions.md)
- [Enlaces y navegación](topic-react-router-navigation.md)
- [Navegación — useNavigate()](topic-react-router-programmatic.md)
- [Base path y despliegue](topic-react-router-deployment.md)
- [Archivos públicos](topic-react-router-assets.md)
- [Enlaces localizados](topic-react-router-i18n.md)
- [Límites de HTTP](topic-react-router-endpoints.md)

## TanStack Router

- [TanStack Router: configuración](topic-tanstack-router.md)
- [Convenciones y descubrimiento](topic-tanstack-router-conventions.md)
- [Enlaces y navegación](topic-tanstack-router-navigation.md)
- [Navegación — window.location.assign()](topic-tanstack-router-programmatic.md)
- [Base path y despliegue](topic-tanstack-router-deployment.md)
- [Archivos públicos](topic-tanstack-router-assets.md)
- [Enlaces localizados](topic-tanstack-router-i18n.md)
- [Límites de HTTP](topic-tanstack-router-endpoints.md)

## Rutas manuales

- [Rutas manuales (React, Vue, cualquier router)](topic-manual-routes.md)

## Construcción de URL y nombres

- [route()](topic-helper-route.md)
- [route.url() — URL públicas](topic-public-url.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Parámetros opcionales](topic-optional-parameters.md)
- [Parámetros catch-all](topic-catch-all-parameters.md)
- [Segmentos mixtos](topic-mixed-parameters.md)
- [Cadenas de consulta](topic-query-hash.md)
- [Fragmentos de URL (hash)](topic-hash-fragments.md)
- [Base path — URL interna y pública](topic-base-path.md)
- [URL absolutas y origin](topic-absolute-urls.md)
- [Barras finales](topic-trailing-slash.md)
- [Nombres semánticos y grupos](topic-semantic-names.md)
- [Nombres estables opcionales](topic-stable-names.md)
- [TypeScript y typedRoutes de Next](topic-typescript.md)

## Referencia de rutas e inspección

- [Enrutamiento inverso y ruta activa](topic-reverse-routing.md)
- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)
- [route.has()](topic-helper-has.md)
- [route.names()](topic-helper-names.md)
- [route.pattern()](topic-helper-pattern.md)
- [createRoutes()](topic-helper-create-routes.md)
- [route.withDefaults()](topic-helper-with-defaults.md)
- [parsePattern()](topic-helper-parse-pattern.md)
- [formatPattern()](topic-helper-format-pattern.md)
- [patternParameters()](topic-helper-pattern-parameters.md)

## Consultas tipadas y actualización de URL

- [Parámetros de query tipados](topic-typed-query.md)
- [Conectar un esquema de consulta](topic-query-schema-config.md)
- [Usar consultas tipadas](topic-query-schema-use.md)
- [defineQuery()](topic-helper-define-query.md)
- [defineQuery.type<T>()](topic-helper-define-query-type.md)
- [route.parseQuery()](topic-helper-parse-query.md)
- [route.withQuery()](topic-helper-with-query.md)

## Internacionalización

- [Idiomas e i18n](topic-i18n.md)
- [Generar una URL localizada](topic-localized-url.md)
- [route.localize()](topic-helper-localize.md)
- [route.locales()](topic-helper-locales.md)
- [route.forLocale()](topic-helper-for-locale.md)

## Assets y CDN

- [asset() / route.asset()](topic-assets.md)
- [route.asset()](topic-helper-route-asset.md)
- [assetBase y CDN](topic-asset-base.md)
- [URL absolutas de assets](topic-asset-absolute.md)
- [Assets tipados](topic-typed-assets.md)
- [asset.has() / paths() / info()](topic-asset-metadata.md)
- [asset.has()](topic-asset-has.md)
- [asset.paths()](topic-asset-paths.md)
- [asset.info()](topic-asset-info.md)
- [Versionado de assets](topic-asset-versioning.md)

## SEO y metadatos

- [route.canonical()](topic-helper-canonical.md)
- [route.alternates()](topic-helper-alternates.md)

## Endpoints HTTP

- [api generada — descriptores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Parámetros dinámicos de endpoints](topic-endpoint-dynamic.md)

## Configuración y referencia del runtime

- [Referencia de la API del runtime](topic-runtime-api.md)
- [Configuración del generador](topic-configuration.md)
- [Descubrimiento y directorios](topic-config-discovery.md)
- [Salida y exports generados](topic-config-output.md)
- [Convenciones de nombres](topic-config-naming.md)
- [Valores predeterminados de URL](topic-config-defaults.md)
- [Añadir rutas explícitas](topic-config-extra-routes.md)
- [Activar descubrimiento de API](topic-config-api.md)
- [Watch y opciones de desarrollo](topic-config-watch.md)

## Generador y API de herramientas

- [API programática del generador](topic-generator-api.md)
- [discoverRoutes()](topic-generator-discover.md)
- [generateRoutes()](topic-generator-generate.md)
- [validateOptions()](topic-generator-validate.md)

## CLI, CI y resolución de problemas

- [CLI e integración continua](topic-cli.md)
- [init](topic-cli-init.md)
- [generate](topic-cli-generate.md)
- [list](topic-cli-list.md)
- [check](topic-cli-check.md)
- [watch](topic-cli-watch.md)
- [Diagnóstico: named-routes doctor](topic-doctor.md)
- [Auditoría de rutas y assets](topic-audit.md)
- [migrate --to 2](topic-cli-migrate.md)
- [Casos límite del descubrimiento](topic-discovery.md)
- [Actualizaciones automáticas en desarrollo](topic-development.md)
- [Errores y solución de problemas](topic-errors.md)
- [Rewrites y límites](topic-boundaries.md)

## Agentes de IA y MCP

- [Agentes de IA y MCP](topic-ai-agents.md)
- [Instalar e iniciar MCP](topic-mcp-installation.md)
- [Conectar un proyecto local](topic-mcp-project.md)
- [Claude Desktop y Claude Code](topic-mcp-claude.md)
- [Configuración de Cursor](topic-mcp-cursor.md)
- [Configuración de Codex](topic-mcp-codex.md)
- [VS Code / GitHub Copilot](topic-mcp-vscode.md)
- [Windows y lanzador Node directo](topic-mcp-windows.md)
- [Herramientas y recursos](topic-mcp-tools.md)
- [Ejemplo: crear un enlace con rutas reales](topic-mcp-workflow.md)
- [Seguridad y alcance](topic-mcp-security.md)
- [Inspector y solución de problemas](topic-mcp-troubleshooting.md)

## Proyecto y versiones

- [Sitio de documentación](topic-website.md)
- [Pruébalo: demos por framework](topic-demos.md)
- [Contribuye paso a paso](topic-contributing.md)
- [Versiones y actualizaciones](topic-versioning.md)
- [Actualizar desde la 1.x](topic-migration.md)
- [Playground de helpers](topic-helpers-playground.md)
