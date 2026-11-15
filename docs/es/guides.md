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

<a id="development"></a>

## Actualizaciones automáticas en desarrollo

Next.js: el wrapper genera antes de que Next arranque y luego mantiene el módulo al día dentro del proceso de desarrollo. Por defecto (watchMode: "auto"), reacciona a eventos de archivos de los directorios de rutas y de la raíz del proyecto, con debounce y ejecución serializada, más un nuevo escaneo cada 5 segundos para los eventos que el sistema operativo haya perdido. Detecta páginas añadidas, eliminadas y renombradas; el módulo solo cambia cuando cambia su contenido. No se modifican hooks de webpack ni de Turbopack. Nunca escribe durante next start (servidor de producción), así que los despliegues de solo lectura son seguros.

Frameworks con Vite: el plugin genera en buildStart y reacciona a los eventos add/unlink del watcher de Vite, además de los cambios en el archivo de configuración de named-routes. Encuentra la raíz del proyecto subiendo desde la raíz de Vite hasta package.json, así que el srcDir de Nuxt funciona.

Los watchers no se ejecutan durante las compilaciones de producción y no mantienen el proceso vivo por sí mismos. Un error de generación durante la edición conserva el último módulo válido y registra el error. Los cambios en módulos importados por la configuración requieren reiniciar. watch: false solo desactiva las actualizaciones continuas, no la generación inicial.

Donde los eventos de archivos no son fiables, el sondeo toma el control: rutas de WSL bajo /mnt, WATCHPACK_POLLING o CHOKIDAR_USEPOLLING definidos, NAMED_ROUTES_WATCH=poll o cuando el sistema operativo rechaza los watchers (por ejemplo, EMFILE o ENOSPC, que se informa una vez). watchMode: "poll" restablece el comportamiento de la 1.0 (un escaneo completo cada watchInterval). En un benchmark reproducible (pnpm bench:watch, Linux, Node 26) con 200 rutas, la CPU en reposo bajó de 36 a 6 ms por segundo y una página nueva llegó al módulo en 90 ms en lugar de 478 ms; con 2000 rutas, de 153 a 29 ms por segundo y 203 ms en lugar de 582 ms.

<a id="cli"></a>

## CLI e integración continua

El binario se llama named-routes. generate (por defecto) escribe el manifiesto. list imprime las entradas descubiertas en JSON. check compara sin escribir y sale con código 1 cuando está desactualizado. watch genera al inicio y mantiene el módulo al día hasta SIGINT/SIGTERM (eventos de archivos con un nuevo escaneo, o sondeo con --watch-mode poll). init escribe named-routes.config.mjs para el framework detectado y nunca sobrescribe una configuración existente. doctor diagnostica el proyecto sin escribir nada (consulta Diagnóstico).

Opciones: --root <directorio>, --config <archivo>, --framework <nombre>, --output <archivo>, --routes-dir <carpeta>, --router <auto|app|pages>, --api, --watch-interval <ms>, --watch-mode <auto|native|poll>, --json, --strict y --no-color (doctor), --version (-v), --help (-h). Ejecuta los comandos desde el proyecto consumidor con el paquete instalado localmente. Los errores muestran su code y, cuando se conocen, el archivo, la ruta, la opción y una corrección.

Si versionas el archivo generado, ejecuta check antes del build. Las integraciones regeneran durante el build, así que un check posterior no puede detectar un archivo versionado que ya estaba desactualizado. La generación es determinista, atómica y sin marcas de tiempo. Los archivos existentes sin la firma del generador nunca se sobrescriben.

```sh
npx named-routes init
npx named-routes generate --root ./apps/web
npx named-routes list --framework sveltekit
npx named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx named-routes check
npx named-routes watch
npx named-routes --help
npx named-routes watch --watch-mode poll   # containers, network drives
npx named-routes doctor --json --strict    # CI
```

<a id="doctor"></a>

## Diagnóstico: named-routes doctor

npx named-routes doctor comprueba las versiones de Node.js y TypeScript, el archivo de configuración, el framework detectado, las rutas descubiertas, los conflictos y las colisiones de nombres, si el módulo generado existe y está al día, la integración con Next.js o Vite, typedRoutes sin hrefs tipados, i18n sin rutas localizadas y las declaraciones de rutas que el escáner de archivos no ve (definePageMeta({ path }) de Nuxt y llamadas a route() en un app/routes.ts de React Router).

Es de solo lectura: nunca escribe archivos ni ejecuta código de la aplicación. Las comprobaciones de integración y de declaraciones son heurísticas de texto, y así lo indica. Las opciones pasadas directamente a un plugin son código, así que doctor avisa de que no puede verlas; mueve las opciones compartidas a named-routes.config.* o pasa opciones como --output.

Cada diagnóstico es error, warning o info, con un id estable y, cuando se conocen, el archivo, la ruta, la opción y una corrección. --json imprime un informe legible por máquinas para CI y --strict también falla con warnings; los colores solo se usan en un TTY y nunca con NO_COLOR o --no-color. El código de salida 0 indica que no hay errores; 1, que hay errores, o warnings con --strict.

```sh
npx named-routes doctor
npx named-routes doctor --json --strict   # CI

# warning  Next.js typedRoutes is enabled but hrefs is not "typed"; <Link> will reject route() results.
#          option: hrefs
#          fix:   Set hrefs: "typed" in withNamedRoutes() options or named-routes.config.
```

<a id="errors"></a>

## Errores y solución de problemas

NamedRouteError extiende Error y expone un code estable. UNKNOWN_ROUTE indica que el nombre no existe; MISSING_PARAMETER, que se omitió un valor obligatorio; UNKNOWN_PARAMETER, que una clave extra pertenece a la query o está mal escrita; INVALID_PARAMETER, que un valor tiene una forma incorrecta o contiene un segmento prohibido; INVALID_LOCALE, que se pasó un idioma sin i18n o que no está configurado.

INVALID_PATTERN, INVALID_NAME e INVALID_MANIFEST identifican definiciones de ruta mal formadas. INVALID_OPTIONS, INVALID_QUERY e INVALID_HASH identifican opciones inválidas. INVALID_BASE_PATH, INVALID_ORIGIN e INVALID_I18N rechazan defaults de URL. MISSING_ORIGIN exige un origin antes de pedir URLs absolutas. GENERATION_ERROR cubre conflictos de descubrimiento, salidas inseguras y checks desactualizados; INVALID_CONFIG cubre configuraciones ausentes, mal formadas o mal escritas.

No se encuentra routes.generated: confirma que la integración se ejecuta, ejecuta generate y revisa output y los alias de import. basePath o idioma duplicados: usa URLs relativas con los enlaces del framework y pasa basePath/locale solo para URLs simples. Nombres desactualizados: confirma que el watcher está activo y revisa los errores de la terminal. Un error de tipos después de mover una página es lo esperado: actualiza el nombre inferido o define un nombre estable.

La generación se niega a sobrescribir un archivo de salida escrito a mano. Elige otro output en lugar de añadir la firma de generado a código no relacionado. Mantén la salida generada fuera de los archivos enrutables. La interpolación dinámica no autoriza una petición; valida los permisos y las entradas de la aplicación en el destino.

Desde la 1.1, todo NamedRouteError también tiene details: { file, files, route, pattern, option, hint } con lo que se conozca, por ejemplo los dos archivos de un conflicto de rutas o "Did you mean users.show?" para un nombre, una opción o una clave de names mal escritos. INVALID_QUERY indica que una query no cumplió su schema o que un mapa de schemas no es válido; INVALID_URL, que match() recibió algo que no es una ruta ni una URL. Los codes y los mensajes no cambian.

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

Los redirects, los rewrites, la detección de idioma por middleware y las rutas declaradas en el código de los componentes siguen siendo responsabilidad de la aplicación. Mapea explícitamente con extraRoutes cualquier patrón externo o reescrito que necesites y evita aplicar el idioma o el basePath dos veces. El escáner no lee los archivos de configuración del framework; usa withNamedRoutes o las opciones para pasar ajustes.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← Anterior: [Referencia de la API](api-reference.md) · [Volver al README](../../README.es.md) · Siguiente: [Proyecto](project.md) →
