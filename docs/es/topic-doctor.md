# Diagnóstico: named-routes doctor

[Documentación](index.md) / [CLI, CI y resolución de problemas](guides.md)

[English](../en/topic-doctor.md) · [Português](../pt/topic-doctor.md) · [Español](../es/topic-doctor.md) · [日本語](../ja/topic-doctor.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="doctor"></a>

npx @triooo/named-routes doctor comprueba las versiones de Node.js y TypeScript, el archivo de configuración, el framework detectado, las rutas descubiertas, los conflictos y las colisiones de nombres, si el módulo generado existe y está al día, la integración con Next.js o Vite, typedRoutes sin hrefs tipados, i18n sin rutas localizadas y las declaraciones de rutas que el escáner de archivos no ve (definePageMeta({ path }) de Nuxt y llamadas a route() en un app/routes.ts de React Router).

Es de solo lectura: nunca escribe archivos ni ejecuta código de la aplicación. Las comprobaciones de integración y de declaraciones son heurísticas de texto, y así lo indica. Las opciones pasadas directamente a un plugin son código, así que doctor avisa de que no puede verlas; mueve las opciones compartidas a named-routes.config.* o pasa opciones como --output.

Cada diagnóstico es error, warning o info, con un id estable y, cuando se conocen, el archivo, la ruta, la opción y una corrección. --json imprime un informe legible por máquinas para CI y --strict también falla con warnings; los colores solo se usan en un TTY y nunca con NO_COLOR o --no-color. El código de salida 0 indica que no hay errores; 1, que hay errores, o warnings con --strict.

También indica de dónde salieron las rutas (la tabla del framework o los archivos, y por qué volvió a los archivos) y enumera las rutas que existen solo en una de las dos vistas. doctor --v2 añade lo que un proyecto escrito para la 1.x debe cambiar para la 2.0: hrefs tipados, rutas que cambia el descubrimiento por el framework, un moduleResolution que no puede leer los exports del paquete y código que compara códigos de error con GENERATION_ERROR.

## Ejemplo

```sh
npx @triooo/named-routes doctor
npx @triooo/named-routes doctor --json --strict   # CI
npx @triooo/named-routes doctor --v2              # upgrading from 1.x

# info     Routes come from the framework: typed-router.d.ts.
# info     /sobre (sobre) exists only in the framework's route table; the file conventions do not produce it.
#          file:  src/pages/about.vue
```

---

← Anterior: [watch](topic-cli-watch.md) · [Todos los temas](guides.md) · Siguiente: [Auditoría de rutas y assets](topic-audit.md) →
