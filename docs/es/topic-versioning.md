# Versiones y actualizaciones

[Documentación](index.md) / [Proyecto y versiones](project.md)

[English](../en/topic-versioning.md) · [Português](../pt/topic-versioning.md) · [Español](../es/topic-versioning.md) · [日本語](../ja/topic-versioning.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="versioning"></a>

La versión 2.x define el contrato público de los nombres inferidos, la generación tipada de URLs, los adaptadores y el descubrimiento por el framework, i18n, el wrapper de Next.js, el módulo de Nuxt, el plugin de Vite y la CLI. La 1.x no recibe funcionalidades nuevas.

Las versiones de parche preservan la API documentada mientras corrigen errores. Las versiones menores añaden funcionalidad compatible, como nuevos adaptadores de framework. Los cambios incompatibles requieren una nueva versión mayor. Revisa el changelog antes de actualizar.

Después de actualizar, reinicia el servidor de desarrollo para regenerar el manifiesto y ejecuta la comprobación de tipos y las pruebas de navegación de tu aplicación. Si mueves una página y necesitas conservar su nombre de ruta público, usa un alias explícito.

## Ejemplo

```sh
npm install @triooo/named-routes@^2
npx @triooo/named-routes check
npx tsc --noEmit
```

---

← Anterior: [Contribuye paso a paso](topic-contributing.md) · [Todos los temas](project.md) · Siguiente: [Actualizar desde la 1.x](topic-migration.md) →
