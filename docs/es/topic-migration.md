# Actualizar desde la 1.x

[Documentación](index.md) / [Proyecto y versiones](project.md)

[English](../en/topic-migration.md) · [Português](../pt/topic-migration.md) · [Español](../es/topic-migration.md) · [日本語](../ja/topic-migration.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="migration"></a>

La 2.0 cambia valores por defecto solo donde el cambio compensa; todo cambio se puede deshacer en la configuración. Ejecuta npx @triooo/named-routes doctor --v2 para ver qué se aplica a tu proyecto, después npx @triooo/named-routes migrate --to 2 (simulación) y --write para fijar el comportamiento de la 1.x donde el módulo generado cambiaría. Quita las líneas fijadas cuando quieras adoptar los nuevos valores por defecto.

Se requiere Node.js 22.12+ (el 20 está fuera de soporte desde abril de 2026); trae require() de módulos ES y observación recursiva nativa de archivos en todas las plataformas. Se requiere TypeScript 5.4+ para los tipos exportados, que también es el mínimo de Zod 4 y Valibot 1.

route() devuelve hrefs tipados por defecto. Antes: string. Después: `/users/${string}`, aceptado por typedRoutes de Next.js sin cast. El código que guarda una ruta en una variable y después le asigna otro string deja de compilar: anótala como string, o usa hrefs: "string".

Las rutas salen del framework cuando publica su tabla (módulo de Nuxt, Vue Router 5, React Router, TanStack Router). Antes: las rutas de definePageMeta/definePage y las de app/routes.ts necesitaban extraRoutes. Después: se nombran como cualquier página, y las entradas de extraRoutes que las duplicaban se pueden quitar. Usa discovery: "files" para mantener el recorrido de archivos. En Nuxt, sustituye el plugin de Vite por modules: ["@triooo/named-routes/nuxt"].

Los valores no válidos de router, pageExtensions y output producen INVALID_CONFIG en lugar de GENERATION_ERROR, para que cada clase de error tenga un código; revisa las comparaciones con error.code. Se eliminó typesVersions: TypeScript debe resolver el paquete por sus exports, con moduleResolution bundler, node16 o nodenext (node10 no puede). Los módulos generados que importan schemas de query solo como tipos ahora usan TypeOnlyQueries, así que route.parseQuery() se tipa como si devolviera la query sin procesar en esos casos.

## Ejemplo

```sh
npx @triooo/named-routes doctor --v2
npx @triooo/named-routes migrate --to 2           # dry run
npx @triooo/named-routes migrate --to 2 --write   # pins hrefs/discovery in named-routes.config

# Keep a reassigned route as a string
const [href, setHref] = useState<string>(route("home"));
```

---

← Anterior: [Versiones y actualizaciones](topic-versioning.md) · [Todos los temas](project.md) · Siguiente: [Playground de helpers](topic-helpers-playground.md) →
