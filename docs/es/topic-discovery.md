# Casos límite del descubrimiento

[Documentación](index.md) / [CLI, CI y resolución de problemas](guides.md)

[English](../en/topic-discovery.md) · [Português](../pt/topic-discovery.md) · [Español](../es/topic-discovery.md) · [日本語](../ja/topic-discovery.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="discovery"></a>

Next.js: el escáner considera app y pages a la vez. El directorio app de la raíz tiene prioridad sobre src/app, de forma independiente de la misma regla entre pages y src/pages. Los demás frameworks usan sus carpetas estándar (Nuxt app/pages o pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes) salvo que se defina routesDir. No se siguen los enlaces simbólicos de directorios, las carpetas ocultas ni node_modules; los archivos .d.ts se ignoran.

App Router: por defecto solo se incluyen los archivos page. Los grupos y los slots no forman parte de las URLs. Las intercepciones se resuelven a rutas canónicas y las variantes equivalentes se consolidan. Las carpetas privadas _ se ignoran; %5F produce un guion bajo público. Los archivos layout, loading, default, error y de metadatos se excluyen.

Pages Router: _app, _document y _error de la raíz se excluyen; las demás páginas con guion bajo siguen siendo válidas. index se elimina. Las API Routes, los Route Handlers y los endpoints de otros frameworks son opcionales mediante includeApi o --api. Las URLs no modelan métodos HTTP, permisos ni validación de endpoints.

Las formas de URL en conflicto (por ejemplo, [id] y [slug] en el mismo lugar) y las colisiones de nombres inferidos hacen fallar la generación. En Next.js, las URLs canónicas duplicadas y los conflictos de especificidad con catch-all opcional también fallan, igual que en Next. En los routers con layouts anidados (Nuxt, Vue, React Router, TanStack), un layout y su index que comparten URL se fusionan en una sola ruta.

Con el descubrimiento por el framework, su tabla sustituye al recorrido de páginas; los endpoints (includeApi) se siguen leyendo de sus carpetas, exclude sigue aplicándose a los archivos informados y los alias (alias de Nuxt) reciben nombres propios. named-routes doctor enumera cada ruta que existe solo en una de las dos vistas, para que veas qué cambiaron definePageMeta, definePage o routes.ts.

---

← Anterior: [migrate --to 2](topic-cli-migrate.md) · [Todos los temas](guides.md) · Siguiente: [Actualizaciones automáticas en desarrollo](topic-development.md) →
