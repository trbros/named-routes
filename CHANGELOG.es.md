# Historial de cambios

## 2.2.0 - 2026-11-26

Esta versión hace más explícita la generación de URL con nombre, mejora las rutas de despliegue según el framework y el descubrimiento de endpoints, amplía la documentación e integra agentes de IA en el paquete principal. También refuerza la ejecución de la CLI y el reemplazo atómico de archivos en Windows.

### Añadido

- `route.url(name, { params, query, ... })`: genera URL públicas con la base configurada por defecto mediante un objeto de opciones explícito, sin argumentos posicionales vacíos. Los nombres y parámetros siguen tipados.
- Nombres semánticos opcionales con `naming.style: "semantic"`, incluidas las convenciones `index` y `show`. Los mapeos explícitos `names` siguen disponibles para alias estables propios de la aplicación.
- Descriptores HTTP tipados mediante `route.endpoint(name, method)` y el export generado `api` cuando `includeApi` está habilitado y los métodos pueden identificarse estáticamente. Contienen método y URL; no ejecutan handlers ni envían solicitudes. El descubrimiento depende del framework.
- `llms.txt`, `llms-full.txt`, convenciones para agentes y referencias Markdown versionadas por framework y tema, sincronizadas con la documentación en inglés, portugués, español y japonés.
- Servidor Model Context Protocol (MCP) de solo lectura distribuido directamente en `@triooo/named-routes`, disponible mediante `named-routes mcp` y `named-routes-mcp`. No requiere otro paquete npm. Usa stdio y dependencias opcionales, manteniendo MCP fuera del runtime del navegador.
- Seis herramientas MCP: `get_agent_contract`, `search_docs`, `get_topic`, `get_framework_guide`, `list_routes` y `get_route`. Los agentes consultan documentación versionada e inspeccionan un manifiesto generado existente sin ejecutar código de la aplicación ni modificar archivos.

### Modificado

- Los helpers generados incluyen automáticamente la base de navegación configurada para Astro, SvelteKit y manifiestos manuales generados. Next.js, Nuxt, Vue Router, React Router y TanStack Router conservan rutas internas por defecto para la navegación de sus routers nativos.
- `route.url()` ofrece la alternativa de ruta pública entre frameworks. `basePath: true` o `basePath: false` explícitos controlan la inclusión de la base en `route()`; `createRoutes()` directo conserva su comportamiento anterior.
- Los manifiestos generados incluyen comentarios con rutas relativas de origen y claves literales de cadena normales cuando es seguro, en lugar de claves calculadas innecesarias. La clave `__proto__` sigue protegida mediante sintaxis calculada.
- Se reemplaza el punto de entrada compilado de la CLI en el mapeo npm `bin` por un launcher estable que resuelve la implementación respecto de su propia ubicación, independientemente del directorio actual.
- Ejemplos de frameworks ampliados más allá de páginas estáticas, con navegación multipágina, parámetros dinámicos y ejemplos específicos de endpoints cuando se admiten.

### Corregido

- Exposición explícita del helper `asset` en `TypedNamedRoutes` para evitar errores de propiedad ausente en módulos TypeScript generados.
- Mejor empaquetado y resolución de ejecutables CLI para invocaciones npm con ámbito, incluidas `npx @triooo/named-routes`, y diagnóstico explícito de archivos compilados ausentes.
- Reintentos ante errores transitorios `EPERM`, `EACCES` y `EBUSY` al reemplazar atómicamente manifiestos y snapshots de frameworks. El backoff progresivo acotado preserva el último archivo válido y propaga fallos persistentes o no transitorios. Aborda el fallo de Windows observado al eliminar rutas en vivo en TanStack Router.

### Documentación

- Documentación reorganizada en temas navegables, guías por framework, referencias API específicas, configuración, comandos CLI y recetas prácticas. Conserva los ID de temas y anclas Markdown anteriores.
- Ejemplos separados para despliegues en la raíz del dominio y bajo `base` o `basePath`, explicando cuándo el router nativo aplica el prefijo y cuándo se necesita una URL pública.
- Actualización de los cuatro README y páginas Markdown generadas; navegación por temas relacionados, búsqueda mejorada y componentes Accordion y Button de shadcn/ui en el índice temático.
- Guías MCP de instalación, configuración de proyectos locales, Claude Desktop y Claude Code, Cursor, Codex, VS Code y GitHub Copilot, launcher Windows, referencia de herramientas, flujos de ejemplo, límites de seguridad y diagnóstico con MCP Inspector.
- Catálogo MCP, referencias para agentes, documentación web y README sincronizados desde la fuente de documentación compartida.
- Añade historiales de cambios completamente localizados en inglés, portugués, español y japonés, incluida la página de versiones y el selector de versiones de la documentación en el idioma activo.

### Sitio web y SEO

- Generación de `sitemap.xml` a partir del catálogo e idiomas compatibles, y `robots.txt` para descubrir el sitemap.
- Títulos y descripciones localizados, URL canónicas, alternates `hreflang` recíprocos con `x-default`, metadatos Open Graph y Twitter Card, y datos estructurados de software y breadcrumbs.
- Origen público y base de despliegue centralizados para URL SEO coherentes. Verificación de Google Search Console y exclusión de previews, páginas de demostración parametrizadas y copias de documentación legibles por máquinas de la indexación como contenido duplicado.

### Pruebas y herramientas de publicación

- Más cobertura de regresión y contratos TypeScript para URL públicas, bases por framework, nombres semánticos, descriptores de endpoints generados y assets tipados.
- Pruebas de empaquetado ampliadas para launchers estables, ejecución npm con ámbito y puntos de entrada MCP integrados; pruebas de catálogo, parsing de manifiestos y protocolo MCP.
- Pruebas de regresión de reintentos acotados ante errores transitorios del sistema de archivos, fallos persistentes y conservación del archivo generado anterior.
- Comprobación de ejemplos de documentación y validación SEO de URL del sitemap, metadatos canónicos, alternates por idioma y rutas de despliegue.
- Genera los archivos Markdown traducidos del historial de cambios y un catálogo estático del sitio web a partir del historial en inglés y las traducciones por entrada; CI rechaza las traducciones ausentes o desactualizadas.

### Notas de actualización

- Los proyectos Astro, SvelteKit y manuales generados que antes añadían el prefijo a `route()` deben quitarlo o solicitar una ruta interna explícitamente con `{ basePath: false }` en el tercer argumento. Use `route.url()` para URL públicas en vez de concatenar la base.
- Los nombres semánticos siguen siendo opcionales; los nombres automáticos existentes no cambian salvo que se configure el nuevo estilo o alias explícitos.
- Tras actualizar, regenere el módulo con `pnpm exec named-routes generate` o reinicie la integración. No edite manualmente el manifiesto generado.
- MCP incluido en el paquete principal. Use `npx @triooo/named-routes mcp` en lugar de instalar otro paquete MCP. Instale las dependencias opcionales si omitió el soporte MCP.

## 2.1.0 - 2026-11-26

Documentación de helpers de rutas y assets públicos dividida en páginas multilingües específicas, con ejemplos por API y configuración CDN independiente.

### Añadido

- `@triooo/named-routes/astro`: integración nativa que hereda el `base` final de Astro independientemente de la base de assets Vite.
- `namedRoutes({ routerBase })` acepta prefijo o getter para SvelteKit, Vue Router, React Router/Remix y TanStack Router; `inheritViteBase` permite usar la base Vite si también es la de navegación.
- `route.localize(url, locale?, options?)` resuelve alias traducidos entre idiomas incluso sin prefijo de locale, conserva parámetros decodificados y query/fragmento originales, admite prefijos personalizados, bases y dominios configurados, y devuelve `null` para rutas ambiguas o no localizadas. `route.match()` conserva su semántica.
- `--base-path` para generación independiente, watch, check, list y doctor; integraciones guardan la última base pública efectiva correcta en `.named-routes/` para que la CLI no la descarte al regenerar.
- Descubrimiento opcional de assets públicos, tipos estrictos de rutas generadas, asset.has(), asset.paths() y asset.info().
- Hash de contenido de assets y URL de invalidación de caché con asset(path, { version: true }); los cambios observados regeneran manifiestos.
- route.withQuery() para cambios de query, valores repetidos y validación opcional por schema nombrado.
- route.canonical(), route.alternates() y contextos aislados route.withDefaults() para SEO, SSR y URL multi-tenant.
- CLI audit de solo lectura con diagnóstico de rutas y assets, salida JSON y modo estricto para CI.
- Documentación multilingüe de helpers avanzados, playground URL con runtime real, pruebas unitarias/de tipos/del generador y comprobaciones E2E de versiones de assets en producción.
- `asset()` / `route.asset()` y `defaults.assetBase` independiente para rutas públicas y CDN; tipos de assets exportados y exports generados personalizables. Comprobaciones de archivos públicos en navegador en nueve ejemplos, regresiones route/localize/match/parseQuery y guías multilingües de assets.

### Corregido

- Nuxt hereda `app.baseURL`; Next.js mantiene el comportamiento automático de `basePath` y sincroniza el snapshot CLI cuando la base cambia o se elimina.
- Vite ignora escrituras atómicas del módulo y snapshots de base, evitando ejecuciones redundantes del watcher. Los nombres canónicos no dependen del prefijo de despliegue; los enlaces no reciben doble prefijo.
- Builds validan shebang y permisos ejecutables CLI; pruebas del paquete ejercitan resolución npm con y sin instalación local. La documentación usa `npx @triooo/named-routes` para evitar el paquete sin ámbito no relacionado.
- Regresiones cubren hooks de integración, overrides de base y resolución de rutas traducidas, con ambigüedad, preservación de query/fragmento y segmentos dinámicos.
- Evita lecturas simultáneas del árbol de rutas durante la generación TanStack Router esperando actualizaciones del artefacto del framework.
- El watcher Vite ignora archivos temporales del generador TanStack, reduciendo regeneraciones y contención del sistema de archivos en Windows.
- Mejor comprobación E2E de assets estáticos en todos los frameworks compatibles: decodificación, dimensiones intrínsecas, estado HTTP, tipo MIME y contenido SVG.
- Corrección de respuestas estáticas en servidor E2E con encabezados Content-Length explícitos, soporte HEAD y mejor tratamiento de errores de streaming.
- Corrección del narrowing por flujo de control TypeScript al validar defaults de rutas, manifiestos de assets, configuración i18n y extensiones de schemas de query.
- Opciones fuertemente tipadas conservadas en canonical(), alternates(), withQuery() y withDefaults() sin quitar validación en runtime.
- Corrección de ubicación de supresión Biome en validación de query URL.
- Corrección de resolución del compilador TypeScript en pruebas de manifiestos de assets mediante manifiesto del paquete en vez de subruta restringida.
- Mejores diagnósticos de typecheck de assets generados TypeScript y JavaScript.
- Mejor limpieza de fixtures temporales y manejo de errores de subprocesos en Windows.
- Expectativas browser-safety actualizadas para incluir nuevos módulos de assets y utilidades URL seguros para navegador, preservando aislamiento estricto de dependencias del runtime.

### Documentación

- Guías por framework y ejemplos web actualizados para integración nativa Astro, bases de despliegue, overrides CLI y URL localizadas.

## 2.0.0 - 2026-11-25

Cambios incompatibles solo cuando compensan, cada uno con migración: ejecute `npx named-routes doctor --v2` para saber qué aplica y `npx named-routes migrate --to 2 --write` para fijar el comportamiento 1.x cuando cambiaría el módulo. Incluye correcciones previstas para 1.1.1, no publicada por separado.

### Cambios incompatibles

- Node.js 22.12+ obligatorio (Node.js 20 terminó soporte en abril de 2026): `require()` de módulos ES y observación recursiva nativa en todas las plataformas. CI prueba 22.12, 22, 24 y 26.
- TypeScript 5.4+ obligatorio para tipos exportados (también mínimo de Zod 4 y Valibot 1). CI prueba 5.4, 5.9, 6 y 7.
- `hrefs: "typed"` es el valor predeterminado en módulos generados y `createRoutes()`: `route()` devuelve tipos template literal como `` `/users/${string}` `` que `typedRoutes` de Next.js acepta sin casts. Una variable con `route()` reasignada a otra cadena ya no compila; anótela `string` o configure `hrefs: "string"` (serializa `"hrefs": "string"`). `withNamedRoutes()` y `doctor` advierten si `typedRoutes` coincide con `hrefs: "string"`.
- Descubrimiento por framework por defecto (`discovery: "framework"`): si publica la tabla final, los nombres provienen de ella, incluyendo rutas declaradas en código. Nuxt: nuevo módulo `@triooo/named-routes/nuxt` lee `pages:resolved` (`definePageMeta({ path, alias })`, páginas de módulos; alias con nombres propios) y guarda `.nuxt/named-routes/pages.json` para CLI. Vue Router 5: `typed-router.d.ts` generado (`definePage({ path })`). React Router: `react-router routes --json` (`route()`, `index()`, `layout()`, `prefix()` en `app/routes.ts`). TanStack Router: `routeTree.gen.ts`. Hasta existir la tabla se escanean archivos y la CLI explica el motivo. `discovery: "files"` conserva scanner 1.x; Next.js, SvelteKit y Astro no cambian.
- Un código por clase de error: valores inválidos de `router`, `pageExtensions` y `output` (incluida salida dentro de carpeta de rutas) lanzan `INVALID_CONFIG` en vez de `GENERATION_ERROR`. Mensajes sin cambios.
- Se eliminó `typesVersions`; tipos publicados solo mediante `exports`, por lo que `moduleResolution` debe ser `bundler`, `node16` o `nodenext`.
- Módulos generados que importan schemas de query solo como tipos (sin `validateQuery`) usan `TypeOnlyQueries<typeof schemas>`, así `route.parseQuery()` se tipa como devolviendo la query cruda, que es su resultado real.

### Añadido

- `route.parseQuery(name, input)`: lee la query de URL (URL, cadena, `URLSearchParams` o `route.match().query`) con el schema de ruta si existe en runtime, devuelve `{ ok: true, value }` con tipo de salida o `{ ok: false, issues }`. Para claves rechazadas como cadenas se reconvierten números y `true`/`false` escritos por `route()`, y valores únicos pasan a arrays. Sin schema runtime devuelve query cruda. Nuevos tipos `QueryOutput`, `QueryParseResult`, `QueryParseInput`, `TypeOnlyQuery` y `TypeOnlyQueries`.
- `named-routes doctor` informa el origen de rutas (tabla del framework o archivos y motivo), rutas exclusivas de cada vista y si Nuxt usa el módulo. `doctor --v2` lista cambios para 1.x: hrefs tipados, rutas cambiadas por descubrimiento, `moduleResolution` que no lee `exports` y código que compara `GENERATION_ERROR` (verificación textual).
- `named-routes migrate --to 2` (simulación; `--write` aplica): fija `hrefs: "string"` y, si las rutas difieren, `discovery: "files"` en la configuración (crea `named-routes.config.mjs` si falta). No modifica configuraciones de frameworks ni código de aplicación.
- Plugin Vite regenera cuando el framework reescribe su tabla y antes de la primera carga del módulo en build, tras `buildStart` de todos los plugins. `named-routes watch` observa también el artefacto. Resumen CLI indica origen: `(5 routes, nuxt, from .nuxt/named-routes/pages.json)`.
- Ejemplos: Nuxt usa módulo con página `definePageMeta({ path, alias })`, Vue una `definePage({ path })` y React Router una `route()` en `app/routes.ts`; E2E navega a cada una en navegador real.
- `pnpm test:package` comprueba tarball con [attw](https://github.com/arethetypeswrong/arethetypeswrong.github.io) (resolución node16 y bundler) y [publint](https://publint.dev) (estricto).
- `pnpm test:types` (y por tanto `pnpm check` y CI) verifica muestras TypeScript con módulo generado que contiene todos los nombres usados, con `hrefs: "string"` y `"typed"`; líneas documentadas como error de tipo deben fallar.
- Documentación: actualización desde 1.x en cuatro idiomas, y cada página de framework describe el origen de sus rutas.

### Corregido

- Configuraciones se reimportan solo al cambiar contenido (hash en vez de fecha de modificación). Guardar o tocar `named-routes.config.*` sin cambios durante `watch`, `next dev` o Vite ya no deja otra instancia en memoria. Node.js no descarga módulos ES, por lo que cada versión distinta sigue cargada hasta reiniciar; se documenta.
- Href tipado: llamar ruta con claves query obligatorias sin `options.query` informa `Argument of type '"search"' is not assignable to parameter of type '"search" & QueryIsRequired<"search">'` en vez de `Expected 3 arguments, but got 1`.
- `pnpm test:package` ya no falla entre releases: `npm publish --dry-run` rechaza una versión ya publicada tras empaquetar y normalizar `package.json`, que es lo que comprueba la prueba.

## 1.1.0 - 2026-11-14

Compatible con 1.0: nuevos comportamientos opcionales o aditivos; códigos y mensajes de error sin cambios.

### Añadido

- `hrefs: "typed"` (configuración, `withNamedRoutes()`, plugin Vite o `createRoutes`): `route()` devuelve tipos template literal como `` `/users/${string}` `` aceptados por `typedRoutes` de Next.js en `<Link>`, `router.push()`, `replace()` y `prefetch()` sin casts. Solo tipos; URL idénticas. Nuevos tipos `RouteHref`, `RouteHrefWithSuffix` y `TypedNamedRoutes`. `withNamedRoutes()` sugiere la opción si `typedRoutes` está habilitado sin ella.
- Query tipada por ruta: `defineQuery({...})` con validadores Standard Schema (Zod 3.24+, Valibot 1+, ArkType…) o `defineQuery.type<T>()`, configurada con `query`. Claves desconocidas y valores incompatibles son errores de tipo; claves obligatorias hacen obligatoria la query. Importación solo de tipos por defecto; `validateQuery: true` empaqueta schemas y lanza `INVALID_QUERY` para valores inválidos. Ninguna biblioteca schema es dependencia.
- Reverse routing: `route.match(url)`, `route.is(name, url, { exact })` y `route.breadcrumbs(url)`, precedencia determinista (estático antes de dinámico, luego orden de declaración), decodificación segura, `basePath`, barra final, prefijos de locale, rutas localizadas y dominios i18n. URL sin coincidencia o inválidas devuelven `null`; entrada no string lanza `INVALID_URL`.
- `named-routes doctor`: diagnóstico de solo lectura de versiones Node.js/TypeScript, configuración, framework, rutas, conflictos, salida obsoleta, integración Next.js/Vite, typedRoutes sin hrefs tipados, i18n y rutas declaradas en código invisibles al scanner. `--json`, `--strict` y `--no-color`; salida 1 en errores.
- `NamedRouteError.details` (`file`, `files`, `route`, `pattern`, `option`, `hint`) con sugerencias de nombres, opciones y claves `names`. La CLI las muestra.
- Modos watcher: `watchMode` (`auto`, `native`, `poll`) para `withNamedRoutes()` y `--watch-mode` para `named-routes watch`.
- E2E con frameworks reales (`pnpm test:e2e`): cada ejemplo instala tarball, verifica tipos, compila, sirve build de producción, navega en Chromium mediante enlaces generados y crea, renombra y elimina una página con dev server activo. CI ejecuta todos en Linux y Next.js App Router y Vue en Windows/macOS; condiciona publicación.
- Prueba real Next.js `typedRoutes` (`next typegen` + `tsc`), `next build` + `next start` en smoke test Next.js, prueba browser-safety del runtime, matriz TypeScript 5.0/5.4/5.9/6/7, lint/formato Biome (`pnpm lint`, `pnpm format`) y benchmark watcher (`pnpm bench:watch`).
- Web: playground muestra `route.match()` y `route.breadcrumbs()` en rutas propias; documentación de hrefs y query tipados, reverse routing y doctor en inglés, portugués, español y japonés.

### Modificado

- Next.js dev y `named-routes watch` reaccionan a eventos de archivos (debounce, serialización) con escaneo de reconciliación de 5 s en vez de cada 750 ms. Polling automático en discos Windows WSL, con `WATCHPACK_POLLING`/`CHOKIDAR_USEPOLLING`/`NAMED_ROUTES_WATCH=poll` o si el sistema rechaza watchers. Medidas `pnpm bench:watch` (Linux, Node 26, mediana de 3): 200 rutas, CPU inactiva 36 → 6 ms/s y adición → módulo 478 → 90 ms; 2000 rutas, 153 → 29 ms/s y 582 → 203 ms. `watchMode: "poll"` restaura comportamiento 1.0.
- Ejemplos: Next.js App Router usa `typedRoutes` con hrefs tipados y enlace query; Pages Router usa i18n, enlace `pt` y query; ambos tienen página docs catch-all. Vue usa Vue Router 5 (`vue-router/vite`) con layout `_parent.vue`. Lockfiles sincronizados nuevamente con package.json.
- CI: pruebas de paquetes en Windows/macOS, contratos en varias versiones TypeScript y workflow E2E (sustituye demos solo build); Dependabot actualiza herramientas npm, ejemplos y web.

### Corregido

- Vue Router 5 file-based: `_parent.vue` es padre no navegable y ya no produce ruta fantasma como `users._parent`.
- Watcher ignora archivo temporal de escritura atómica del módulo generado, evitando regeneración extra.
- Módulos del antiguo `@triooo/next-named-routes` se reconocen como generados y reemplazan en lugar de fallar con "Refusing to overwrite".
- Ayuda CLI y documentación ya no describen `named-routes` como alias de sí mismo; React Router 8 y Vue Router 5 se nombran en sus demos; SPEC marca 1.0.0 como publicada.

## 1.0.0

- Contrato v1 estable para nombres automáticos, generación URL, parámetros tipados, CLI, wrapper config Next y plugin Vite.
- Adaptadores: Next.js (App Router y Pages Router), Nuxt (páginas y rutas Nitro), Vue Router file-based, SvelteKit, Astro, React Router / Remix flat routes y TanStack Router, más modo `manual` para rutas declaradas en código. Framework detectado desde package.json.
- `@triooo/named-routes/vite`: `namedRoutes()` genera al iniciar/compilar y sigue adición/eliminación de archivos mediante watcher Vite.
- i18n desde v1: opción `locale`, `forLocale()`, `locales()`, `localePrefix` (always, as-needed, never, prefijos personalizados), `pathnames` localizados, `domains`, eliminación automática de carpetas `[locale]`/`[lang]`, carpetas físicas de idioma, endpoints no localizados y `RouteLocale` tipado. Opciones reflejan `defineRouting()` de next-intl; `i18n` de Next.js Pages Router se hereda automáticamente.
- Nuevos patrones: parámetros individuales opcionales `[[id]]`, segmentos mixtos como `v[major]-[minor]` y catch-all antes de segmentos estáticos.
- Configuración: `named-routes.config.ts/.mts/.mjs/.js/.cjs/.json`, `defineConfig`, `routesDir`, `appDir`/`pagesDir`, globs `exclude`, `naming` (separador, prefijo parámetro, nombre home, transform), `importSource`, `exportNames` y salidas `.ts/.mts/.js/.mjs`. Opciones desconocidas lanzan `INVALID_CONFIG`.
- Binario CLI `named-routes` (alias `named-routes`) con `init`, `--framework`, `--routes-dir`, `--watch-interval` y `--version`.
- Seguridad: `next start` nunca escribe el manifiesto (despliegues solo lectura); solo `basePath`, `trailingSlash`, `origin` e i18n públicos se serializan; temporales creados exclusivamente; `importSource` y nombres de exports se validan antes de escribir código.
- Verificación de releases instala tarball real en consumidor limpio y comprueba runtime, CLI, exports, packlist y contratos TypeScript; smoke tests reales Next.js y Vite en CI.
- Documentación y web en inglés, portugués, español y japonés (`docs/locales.json`), con `scripts/sync-locales.mjs` (`pnpm locales`, `pnpm locales:check`) sincronizando idiomas en CI y un README por idioma.
- Página comparativa con paquetes alternativos y routing tipado nativo, basada en documentación publicada y datos npm.
- Web de documentación (`website/`, desplegable en Vercel) rediseñada con metáfora de transporte: panel de salidas, mapa interactivo, tabla de compatibilidad transparente y páginas animadas; nuevo logo N de línea de ruta. Demos ejecutables para todos los frameworks compatibles en `examples/`.
