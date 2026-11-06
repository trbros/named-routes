# Guías · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/guides.md) · [Português](../pt/guides.md) · [Español](../es/guides.md) · [日本語](../ja/guides.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Casos límite del descubrimiento](#discovery)
- [Actualizaciones automáticas en desarrollo](#development)
- [CLI e integración continua](#cli)
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

Next.js: el wrapper genera antes de que Next arranque y luego ejecuta un watcher por sondeo, serializado, dentro del proceso de desarrollo. Detecta páginas añadidas, eliminadas y renombradas; el módulo solo cambia cuando cambia su contenido. No se modifican hooks de webpack ni de Turbopack. Nunca escribe durante next start (servidor de producción), así que los despliegues de solo lectura son seguros.

Frameworks con Vite: el plugin genera en buildStart y reacciona a los eventos add/unlink del watcher de Vite, además de los cambios en el archivo de configuración de named-routes. Encuentra la raíz del proyecto subiendo desde la raíz de Vite hasta package.json, así que el srcDir de Nuxt funciona.

Los watchers no se ejecutan durante las compilaciones de producción y no mantienen el proceso vivo por sí mismos. Un error de generación durante la edición conserva el último módulo válido y registra el error. Los cambios en módulos importados por la configuración requieren reiniciar. watch: false solo desactiva las actualizaciones continuas, no la generación inicial.

<a id="cli"></a>

## CLI e integración continua

El binario se llama named-routes (next-named-routes es un alias). generate (por defecto) escribe el manifiesto. list imprime las entradas descubiertas en JSON. check compara sin escribir y sale con código 1 cuando está desactualizado. watch genera al inicio y sondea hasta SIGINT/SIGTERM. init escribe named-routes.config.mjs para el framework detectado y nunca sobrescribe una configuración existente.

Opciones: --root <directorio>, --config <archivo>, --framework <nombre>, --output <archivo>, --routes-dir <carpeta>, --router <auto|app|pages>, --api, --watch-interval <ms>, --version (-v), --help (-h). Ejecuta los comandos desde el proyecto consumidor con el paquete instalado localmente.

Si versionas el archivo generado, ejecuta check antes del build. Las integraciones regeneran durante el build, así que un check posterior no puede detectar un archivo versionado que ya estaba desactualizado. La generación es determinista, atómica y sin marcas de tiempo. Los archivos existentes sin la firma del generador nunca se sobrescriben.

```sh
npx named-routes init
npx named-routes generate --root ./apps/web
npx named-routes list --framework sveltekit
npx named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx named-routes check
npx named-routes watch
npx named-routes --help
```

<a id="errors"></a>

## Errores y solución de problemas

NamedRouteError extiende Error y expone un code estable. UNKNOWN_ROUTE indica que el nombre no existe; MISSING_PARAMETER, que se omitió un valor obligatorio; UNKNOWN_PARAMETER, que una clave extra pertenece a la query o está mal escrita; INVALID_PARAMETER, que un valor tiene una forma incorrecta o contiene un segmento prohibido; INVALID_LOCALE, que se pasó un idioma sin i18n o que no está configurado.

INVALID_PATTERN, INVALID_NAME e INVALID_MANIFEST identifican definiciones de ruta mal formadas. INVALID_OPTIONS, INVALID_QUERY e INVALID_HASH identifican opciones inválidas. INVALID_BASE_PATH, INVALID_ORIGIN e INVALID_I18N rechazan defaults de URL. MISSING_ORIGIN exige un origin antes de pedir URLs absolutas. GENERATION_ERROR cubre conflictos de descubrimiento, salidas inseguras y checks desactualizados; INVALID_CONFIG cubre configuraciones ausentes, mal formadas o mal escritas.

No se encuentra routes.generated: confirma que la integración se ejecuta, ejecuta generate y revisa output y los alias de import. basePath o idioma duplicados: usa URLs relativas con los enlaces del framework y pasa basePath/locale solo para URLs simples. Nombres desactualizados: confirma que el watcher está activo y revisa los errores de la terminal. Un error de tipos después de mover una página es lo esperado: actualiza el nombre inferido o define un nombre estable.

La generación se niega a sobrescribir un archivo de salida escrito a mano. Elige otro output en lugar de añadir la firma de generado a código no relacionado. Mantén la salida generada fuera de los archivos enrutables. La interpolación dinámica no autoriza una petición; valida los permisos y las entradas de la aplicación en el destino.

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
