# Versiones y actualizaciones

Topic: `versioning` · Named Routes v2.2.0

La versión 2.x define el contrato público de los nombres inferidos, la generación tipada de URLs, los adaptadores y el descubrimiento por el framework, i18n, el wrapper de Next.js, el módulo de Nuxt, el plugin de Vite y la CLI. La 1.x no recibe funcionalidades nuevas.

Las versiones de parche preservan la API documentada mientras corrigen errores. Las versiones menores añaden funcionalidad compatible, como nuevos adaptadores de framework. Los cambios incompatibles requieren una nueva versión mayor. Revisa el changelog antes de actualizar.

Después de actualizar, reinicia el servidor de desarrollo para regenerar el manifiesto y ejecuta la comprobación de tipos y las pruebas de navegación de tu aplicación. Si mueves una página y necesitas conservar su nombre de ruta público, usa un alias explícito.

```sh
npm install @triooo/named-routes@^2
npx @triooo/named-routes check
npx tsc --noEmit
```
