# Guías · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/guides.md) · [Português](../pt/guides.md) · [Español](../es/guides.md) · [日本語](../ja/guides.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Casos límite del descubrimiento](#discovery)
- [Actualizaciones automáticas en desarrollo](#development)
- [CLI e integración continua](#cli)
- [Diagnóstico: named-routes doctor](#doctor)
- [Errores y solución de problemas](#errors)
- [Rewrites y límites](#boundaries)

<a id="discovery"></a>

## Casos límite del descubrimiento

Next.js: el escáner considera app y pages a la vez. El directorio app de la raíz tiene prioridad sobre src/app, de forma independiente de la misma regla entre pages y src/pages. Los demás frameworks usan sus carpetas estándar (Nuxt app/pages o pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes) salvo que se defina routesDir. No se siguen los enlaces simbólicos de directorios, las carpetas ocultas ni node_modules; los archivos .d.ts se ignoran.

App Router: por defecto solo se incluyen los archivos page. Los grupos y los slots no forman parte de las URLs. Las intercepciones se resuelven a rutas canónicas y las variantes equivalentes se consolidan. Las carpetas privadas _ se ignoran; %5F produce un guion bajo público. Los archivos layout, loading, default, error y de metadatos se excluyen.

Pages Router: _app, _document y _error de la raíz se excluyen; las demás páginas con guion bajo siguen siendo válidas. index se elimina. Las API Routes, los Route Handlers y los endpoints de otros frameworks son opcionales mediante includeApi o --api. Las URLs no modelan métodos HTTP, permisos ni validación de endpoints.

Las formas de URL en conflicto (por ejemplo, [id] y [slug] en el mismo lugar) y las colisiones de nombres inferidos hacen fallar la generación. En Next.js, las URLs canónicas duplicadas y los conflictos de especificidad con catch-all opcional también fallan, igual que en Next. En los routers con layouts anidados (Nuxt, Vue, React Router, TanStack), un layout y su index que comparten URL se fusionan en una sola ruta.

Con el descubrimiento por el framework, su tabla sustituye al recorrido de páginas; los endpoints (includeApi) se siguen leyendo de sus carpetas, exclude sigue aplicándose a los archivos informados y los alias (alias de Nuxt) reciben nombres propios. named-routes doctor enumera cada ruta que existe solo en una de las dos vistas, para que veas qué cambiaron definePageMeta, definePage o routes.ts.

<a id="development"></a>

## Actualizaciones automáticas en desarrollo

Next.js: el wrapper genera antes de que Next arranque y luego mantiene el módulo al día dentro del proceso de desarrollo. Por defecto (watchMode: "auto"), reacciona a eventos de archivos de los directorios de rutas y de la raíz del proyecto, con debounce y ejecución serializada, más un nuevo escaneo cada 5 segundos para los eventos que el sistema operativo haya perdido. Detecta páginas añadidas, eliminadas y renombradas; el módulo solo cambia cuando cambia su contenido. No se modifican hooks de webpack ni de Turbopack. Nunca escribe durante next start (servidor de producción), así que los despliegues de solo lectura son seguros.

Frameworks Vite: el plugin genera en buildStart, una vez más antes de que el módulo se cargue por primera vez (después de que el framework escriba su tabla de rutas), y reacciona a eventos add/unlink del watcher de Vite, a cambios en el archivo de configuración de named-routes y a reescrituras de typed-router.d.ts, routeTree.gen.ts o app/routes.ts. Encuentra la raíz del proyecto subiendo desde la raíz de Vite hasta package.json. El módulo de Nuxt vuelve a generar en cada pages:resolved, que Nuxt llama cuando cambian las páginas.

Los watchers no se ejecutan durante las compilaciones de producción y no mantienen el proceso vivo por sí mismos. Un error de generación durante la edición conserva el último módulo válido y registra el error. Los cambios en módulos importados por la configuración requieren reiniciar. El propio archivo de configuración solo se vuelve a importar cuando cambia su contenido; Node.js no puede descargar módulos ES, así que cada versión distinta de una configuración JavaScript o TypeScript permanece en memoria (solo el módulo de la configuración, no lo que importa) hasta que el proceso se reinicia. watch: false solo desactiva las actualizaciones continuas, no la generación inicial.

Donde los eventos de archivos no son fiables, el sondeo toma el control: rutas de WSL bajo /mnt, WATCHPACK_POLLING o CHOKIDAR_USEPOLLING definidos, NAMED_ROUTES_WATCH=poll o cuando el sistema operativo rechaza los watchers (por ejemplo, EMFILE o ENOSPC, que se informa una vez). watchMode: "poll" restablece el comportamiento de la 1.0 (un escaneo completo cada watchInterval). En un benchmark reproducible (pnpm bench:watch, Linux, Node 26) con 200 rutas, la CPU en reposo bajó de 36 a 6 ms por segundo y una página nueva llegó al módulo en 90 ms en lugar de 478 ms; con 2000 rutas, de 153 a 29 ms por segundo y 203 ms en lugar de 582 ms.

<a id="cli"></a>

## CLI e integración continua

El binario se llama named-routes. generate (por defecto) escribe el manifiesto. list imprime las entradas descubiertas en JSON. check compara sin escribir y sale con código 1 cuando está desactualizado. watch genera al inicio y mantiene el módulo al día hasta SIGINT/SIGTERM (eventos de archivos con un nuevo escaneo, o sondeo con --watch-mode poll). init escribe named-routes.config.mjs para el framework detectado y nunca sobrescribe una configuración existente. doctor diagnostica el proyecto sin escribir nada (consulta Diagnóstico).

Opciones: --root <directorio>, --config <archivo>, --framework <nombre>, --output <archivo>, --routes-dir <carpeta>, --router <auto|app|pages>, --api, --watch-interval <ms>, --watch-mode <auto|native|poll>, --json, --strict, --no-color y --v2 (doctor), --to y --write (migrate), --version (-v), --help (-h). Ejecuta los comandos desde el proyecto consumidor con el paquete instalado localmente. Los errores muestran su code y, cuando se conocen, el archivo, la ruta, la opción y una corrección.

Si versionas el archivo generado, ejecuta check antes del build. Las integraciones regeneran durante el build, así que un check posterior no puede detectar un archivo versionado que ya estaba desactualizado. La generación es determinista, atómica y sin marcas de tiempo. Los archivos existentes sin la firma del generador nunca se sobrescriben.

migrate --to 2 prepara un proyecto 1.x para la 2.0: fija hrefs: "string" y, cuando las rutas del framework difieren del recorrido de archivos, discovery: "files" en la configuración de named-routes (creando named-routes.config.mjs si no existe), para que el módulo generado siga igual hasta que quites esas líneas. Es una simulación salvo que pases --write, y nunca edita configuraciones de framework ni código de la aplicación. doctor --v2 enumera el resto (Node.js, TypeScript, moduleResolution, códigos de error).

Usa npx @triooo/named-routes generate para una ejecución independiente o npm exec -- named-routes generate con el paquete instalado. El paquete named-routes sin scope no pertenece a este proyecto. --base-path /docs sobrescribe el prefijo; --base-path / lo elimina.

**Sobrescritura del prefijo.** --base-path <path> funciona en generación/check/watch y doctor. Sobrescribe el prefijo en caché y el default compartido para esa ejecución; / elimina el prefijo. Los snapshots de integraciones son metadatos generados, no código fuente.

```sh
# Run with the scoped package name (standalone or installed)
npx @triooo/named-routes init
npx @triooo/named-routes generate --root ./apps/web
npx @triooo/named-routes list --framework sveltekit
npx @triooo/named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx @triooo/named-routes generate --base-path /app
npx @triooo/named-routes check --base-path /app
npx @triooo/named-routes generate --base-path / # clear the prefix
npx @triooo/named-routes watch
npx @triooo/named-routes --help
npx @triooo/named-routes watch --watch-mode poll
npx @triooo/named-routes doctor --json --strict
npx @triooo/named-routes doctor --v2
npx @triooo/named-routes migrate --to 2 --write
# With the package installed locally:
npm exec -- named-routes generate
npx @triooo/named-routes audit --strict --json
```

<a id="doctor"></a>

## Diagnóstico: named-routes doctor

npx @triooo/named-routes doctor comprueba las versiones de Node.js y TypeScript, el archivo de configuración, el framework detectado, las rutas descubiertas, los conflictos y las colisiones de nombres, si el módulo generado existe y está al día, la integración con Next.js o Vite, typedRoutes sin hrefs tipados, i18n sin rutas localizadas y las declaraciones de rutas que el escáner de archivos no ve (definePageMeta({ path }) de Nuxt y llamadas a route() en un app/routes.ts de React Router).

Es de solo lectura: nunca escribe archivos ni ejecuta código de la aplicación. Las comprobaciones de integración y de declaraciones son heurísticas de texto, y así lo indica. Las opciones pasadas directamente a un plugin son código, así que doctor avisa de que no puede verlas; mueve las opciones compartidas a named-routes.config.* o pasa opciones como --output.

Cada diagnóstico es error, warning o info, con un id estable y, cuando se conocen, el archivo, la ruta, la opción y una corrección. --json imprime un informe legible por máquinas para CI y --strict también falla con warnings; los colores solo se usan en un TTY y nunca con NO_COLOR o --no-color. El código de salida 0 indica que no hay errores; 1, que hay errores, o warnings con --strict.

También indica de dónde salieron las rutas (la tabla del framework o los archivos, y por qué volvió a los archivos) y enumera las rutas que existen solo en una de las dos vistas. doctor --v2 añade lo que un proyecto escrito para la 1.x debe cambiar para la 2.0: hrefs tipados, rutas que cambia el descubrimiento por el framework, un moduleResolution que no puede leer los exports del paquete y código que compara códigos de error con GENERATION_ERROR.

```sh
npx @triooo/named-routes doctor
npx @triooo/named-routes doctor --json --strict   # CI
npx @triooo/named-routes doctor --v2              # upgrading from 1.x

# info     Routes come from the framework: typed-router.d.ts.
# info     /sobre (sobre) exists only in the framework's route table; the file conventions do not produce it.
#          file:  src/pages/about.vue
```

<a id="errors"></a>

## Errores y solución de problemas

NamedRouteError extiende Error y expone un code estable. UNKNOWN_ROUTE indica que el nombre no existe; MISSING_PARAMETER, que se omitió un valor obligatorio; UNKNOWN_PARAMETER, que una clave extra pertenece a la query o está mal escrita; INVALID_PARAMETER, que un valor tiene una forma incorrecta o contiene un segmento prohibido; INVALID_LOCALE, que se pasó un idioma sin i18n o que no está configurado.

INVALID_PATTERN, INVALID_NAME e INVALID_MANIFEST identifican definiciones de ruta mal formadas. INVALID_OPTIONS, INVALID_QUERY e INVALID_HASH identifican opciones inválidas. INVALID_BASE_PATH, INVALID_ORIGIN e INVALID_I18N rechazan defaults de URL. MISSING_ORIGIN exige un origin antes de pedir URLs absolutas. GENERATION_ERROR cubre conflictos de descubrimiento, rutas que no se pueden nombrar y checks desactualizados; INVALID_CONFIG cubre toda opción no válida: configuraciones ausentes, mal formadas o mal escritas, router, pageExtensions, discovery y output.

No se encuentra routes.generated: confirma que la integración se ejecuta, ejecuta generate y revisa output y los alias de import. basePath o idioma duplicados: usa URLs relativas con los enlaces del framework y pasa basePath/locale solo para URLs simples. Nombres desactualizados: confirma que el watcher está activo y revisa los errores de la terminal. Un error de tipos después de mover una página es lo esperado: actualiza el nombre inferido o define un nombre estable.

La generación se niega a sobrescribir un archivo de salida escrito a mano. Elige otro output en lugar de añadir la firma de generado a código no relacionado. Mantén la salida generada fuera de los archivos enrutables. La interpolación dinámica no autoriza una petición; valida los permisos y las entradas de la aplicación en el destino.

Desde la 1.1, todo NamedRouteError también tiene details: { file, files, route, pattern, option, hint } con lo que se conozca, por ejemplo los dos archivos de un conflicto de rutas o "Did you mean users.show?" para un nombre, una opción o una clave de names mal escritos. INVALID_QUERY indica que una query no cumplió su schema o que un mapa de schemas no es válido; INVALID_URL, que match() recibió algo que no es una ruta ni una URL. Desde la 2.0, los valores no válidos de router, pageExtensions y output producen INVALID_CONFIG (GENERATION_ERROR en la 1.x); los mensajes no cambian.

Ante un error 404 de archivos estáticos, comprueba la ruta real de despliegue y el directorio público. `asset()` utiliza la base configurada, no la salida del bundler ni la petición actual. `INVALID_ASSET_BASE`, `INVALID_ASSET` e `INVALID_OPTIONS` identifican bases, rutas y opciones inválidas.

```ts
import { NamedRouteError } from "@triooo/named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```

<a id="boundaries"></a>

## Rewrites y límites

Es un constructor de URLs, no un reemplazo del router, un middleware, un sistema de autorización ni un cliente HTTP. No crea rutas en runtime, no valida que existan los recursos, no detecta el idioma del visitante ni hace peticiones al backend.

Los redirects, los rewrites y la detección de idioma por middleware siguen siendo responsabilidad de la aplicación; las rutas declaradas en código solo reciben nombre cuando el framework publica su tabla de rutas (ver Otros frameworks). Mapea explícitamente con extraRoutes cualquier patrón externo o reescrito que necesites y evita aplicar el idioma o el basePath dos veces. El escáner no lee los archivos de configuración del framework; usa withNamedRoutes o las opciones para pasar ajustes.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← Anterior: [Referencia de la API](api-reference.md) · [Volver al README](../../README.es.md) · Siguiente: [Proyecto](project.md) →
