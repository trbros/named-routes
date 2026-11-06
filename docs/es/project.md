# Proyecto · @triooo/next-named-routes

[← Volver al README](../../README.es.md) · [English](../en/project.md) · [Português](../pt/project.md) · [Español](../es/project.md) · [日本語](../ja/project.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Sitio de documentación](#website)
- [Pruébalo: demos por framework](#demos)
- [Contribuye paso a paso](#contributing)
- [Versiones y actualizaciones](#versioning)

<a id="website"></a>

## Sitio de documentación

Esta documentación es una app Next.js en website/. Es el sitio público del proyecto, construido con el propio paquete: todos los enlaces internos usan route(), el playground y las páginas de destino son rutas reales del App Router, y el contenido en inglés, portugués, español y japonés sale del mismo docs/content.json que genera los README.

La página principal muestra cada framework compatible como una línea de un mapa de transporte, un panel de salidas alimentado con resultados reales del generador, una tabla de compatibilidad y un recorrido de instalación. Las animaciones son finitas o las inicia el usuario, se pausan fuera de pantalla y se desactivan con prefers-reduced-motion.

Para desplegar en Vercel, crea un proyecto con Root Directory en website y deja activada la opción "Include files outside the root directory". website/vercel.json instala el repositorio, compila el paquete y después compila el sitio. No se necesitan variables de entorno.

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```

<a id="demos"></a>

## Pruébalo: demos por framework

examples/ contiene una pequeña app ejecutable para cada configuración compatible: app-router y pages-router (Next.js), nuxt, vue (unplugin-vue-router), sveltekit, astro, react-router (flat routes), tanstack-router y react (rutas declaradas a mano con createRoutes). Cada una enlaza por nombre a una página estática, una página dinámica de usuarios y una página catch-all de documentación.

Las demos dependen del paquete mediante file:../.., así que compila el paquete una vez en la raíz del repositorio y después instala y ejecuta cualquier demo con npm. El módulo generado aparece en la primera ejecución de dev o build y cambia a medida que añades páginas. Cada demo compila con su framework real.

```sh
# Repository root, once:
pnpm install && pnpm build

# Any demo:
cd examples/nuxt        # or vue, sveltekit, astro, react-router, tanstack-router, react
npm install
npm run dev
# create a page and watch routes.generated.ts update
```

<a id="contributing"></a>

## Contribuye paso a paso

**1. Requisitos.** Instala Node.js 20.19 o superior (22.18+ si quieres cargar archivos named-routes.config.ts), Git y Python 3 (solo se usa para generar los README). Activa pnpm 12.16.1, la versión fijada en package.json: corepack enable o npm install --global pnpm@12.16.1.

**2. Clona y compila.** Clona el repositorio, ejecuta pnpm install en la raíz y luego pnpm build. El build limpia dist/ y compila src/*.ts a JavaScript ESM, declaraciones y source maps. Vuelve a ejecutar pnpm build después de cada cambio en src/: el sitio y las demos usan dist/, no los fuentes TypeScript.

**3. Conoce la estructura.** src/index.ts es el runtime que funciona en el navegador (createRoutes, i18n, patrones); src/frameworks.ts contiene los adaptadores de convenciones de archivos; src/generator.ts descubre, valida y escribe el módulo; src/config.ts carga named-routes.config.*; src/next.ts y src/vite.ts son las integraciones; src/cli.ts es el binario named-routes. tests/ tiene la suite de Node y los smoke tests. docs/locales.json lista los idiomas, docs/content.json guarda la documentación multilingüe y website/messages/<código>.json los textos de la interfaz. website/ es este sitio, examples/ tiene una demo por framework y scripts/ tiene las utilidades de versiones, documentación e idiomas.

**4. Prueba mientras trabajas.** pnpm check compila y ejecuta todas las pruebas de Node y los contratos TypeScript positivos y negativos; es lo que la CI ejecuta en Node 20, 22, 24 y 26. pnpm test:next inicia servidores reales de Next.js (instala antes examples/app-router con pnpm --dir examples/app-router install). pnpm test:vite inicia un servidor real de Vite. pnpm test:package empaqueta el tarball y lo instala en un proyecto limpio. pnpm release:check ejecuta todo lo anterior.

**5. Edita la documentación.** docs/content.json es la fuente única del sitio y de todos los README. Cada sección tiene id, title.<código>, paragraphs.<código> (una lista de párrafos por idioma), code y language; los códigos son en, pt, es y ja. El inglés es el idioma de origen: escribe primero el texto en inglés y mantén el mismo número de párrafos en todos los idiomas. **texto** se muestra en negrita en el sitio y en el README. Una sección nueva también debe añadirse a un grupo de docs/groups.json (la barra lateral del sitio y las páginas de temas del README); si no, pnpm docs falla. Su página es /docs/<id>.

**6. Traduce y sincroniza los idiomas.** Ejecuta pnpm locales (node scripts/sync-locales.mjs) después de cambiar texto en inglés. Compara cada idioma con el inglés en docs/content.json y website/messages/*.json, completa lo que falte con el texto en inglés para que el sitio siga funcionando, elimina las claves de interfaz que ya no existen en inglés, reordena las claves según en.json e imprime la lista "Needs translation". Traduce cada elemento listado en su idioma y luego ejecuta pnpm locales:check (node scripts/sync-locales.mjs --check): no modifica nada y falla si faltan títulos o párrafos, si el número de párrafos es distinto, si los marcadores **negrita** están desbalanceados, si faltan o sobran claves de interfaz, si difieren placeholders ICU como {count}, si las claves están fuera de orden o si falta un idioma en website/lib/locales.ts. La CI ejecuta esta comprobación. node scripts/sync-locales.mjs --untranslated también lista los textos que siguen siendo idénticos al inglés, útil para revisar un idioma antes de publicar.

**7. Sincroniza los README.** Ejecuta pnpm docs (python3 scripts/sync-docs.py) para regenerar README.md, README.pt-BR.md, README.es.md y README.ja.md (lo esencial y un índice) y las páginas de temas en docs/<código>/*.md (una por grupo de docs/groups.json) a partir de docs/content.json, docs/groups.json y docs/locales.json, y versiónalos todos. pnpm docs:check falla cuando alguno de estos archivos está desactualizado; la CI lo ejecuta, así que nunca los edites a mano. El orden habitual es: editar el inglés, pnpm locales, traducir, pnpm locales:check, pnpm docs.

**8. Añade un idioma nuevo.** (a) Añade una entrada en docs/locales.json con code, name, htmlLang, readme (por ejemplo README.fr.md) y las etiquetas del README contents, references, localGuide, documentation, back, previous y next. (b) Añade el código a la unión Locale de website/lib/locales.ts y un título para él en cada grupo de docs/groups.json. (c) Ejecuta pnpm locales: crea website/messages/<código>.json y completa docs/content.json con el texto en inglés como provisional. (d) Traduce cada elemento que liste. (e) Añade el nuevo README a la lista files de package.json. (f) Si la escritura necesita otras fuentes o un salto de línea distinto (como el japonés), añade reglas para html[lang="<código>"] en website/app/transit.css. (g) Ejecuta pnpm locales:check, pnpm docs, pnpm --dir website check:i18n y pnpm --dir website build. El selector de idioma del header muestra el idioma nuevo automáticamente.

**9. Edita los textos del sitio.** Las cadenas de la interfaz están en website/messages/<código>.json dentro de ui, con las mismas claves en todos los archivos; la sintaxis ICU se comprueba, así que evita llaves sin escapar y mantén los placeholders idénticos. Añade las claves nuevas primero en en.json, luego ejecuta pnpm locales y tradúcelas. pnpm --dir website check:i18n valida todos los catálogos. Los datos de frameworks de la página principal (filas del panel, líneas del mapa, tabla de compatibilidad) están en website/lib/transit.ts y deben coincidir con resultados reales del generador.

**10. Ejecuta el sitio.** Después de pnpm build en la raíz, ejecuta pnpm --dir website install una vez y pnpm --dir website dev (o pnpm website). El sitio depende del paquete mediante link:.., así que recompila el paquete y reinicia el servidor de desarrollo al cambiar src/. Cambia de idioma con EN, PT, ES y JA en el header. Antes de un pull request ejecuta pnpm --dir website typecheck y pnpm --dir website build.

**11. Prueba una demo.** Cada carpeta de examples/ es una app pequeña: cd examples/sveltekit (o nuxt, vue, astro, react-router, tanstack-router, react), npm install, npm run dev. Añade una página y mira cómo cambia su routes.generated.ts. Las demos de Next.js usan pnpm.

**12. Añade un framework.** Escribe el adaptador en src/frameworks.ts (sources, extensions, skipDirectory, map) y enseña a detectFramework a reconocer su paquete; añade pruebas de convención en tests/frameworks.test.mjs; añade una demo en examples/ y en la matriz del workflow de demos; documéntalo en docs/content.json en todos los idiomas; añade su línea en website/lib/transit.ts solo cuando la demo compile.

**13. Abre un pull request.** Mantén el cambio acotado, añade pruebas de regresión, actualiza CHANGELOG.md en la próxima versión, ejecuta pnpm release:check, pnpm locales:check y pnpm docs:check, y nunca versiones archivos generados (dist/, routes.generated.ts, .next/, salida de build de las demos); .gitignore ya los excluye.

**14. Publicaciones (mantenedores).** Sube version en package.json, mueve la entrada del CHANGELOG a esa versión, ejecuta pnpm release:check y publica una release en GitHub con la etiqueta next-named-routes-vX.Y.Z. El workflow de publicación valida la etiqueta, vuelve a ejecutar la CI y publica en npm con provenance mediante trusted publishing de npm (no se guarda ningún token de npm). Se aplica la Licencia Apache 2.0; las fuentes incluidas conservan sus licencias OFL.

```sh
# 1-2. Prepare the repository
corepack enable                  # or: npm i -g pnpm@12.16.1
git clone <repository-url> next-named-routes && cd next-named-routes
pnpm install
pnpm build

# 4. Test
pnpm check                       # build + Node tests + TypeScript contracts
pnpm --dir examples/app-router install && pnpm test:next
pnpm test:vite
pnpm test:package
pnpm release:check               # everything above

# 5-7. Documentation in every language
$EDITOR docs/content.json        # English first
pnpm locales                     # fill gaps, list what needs translation
$EDITOR docs/content.json website/messages/*.json   # translate pt, es, ja
pnpm locales:check               # what CI runs
node scripts/sync-locales.mjs --untranslated
pnpm docs                        # README.*.md and docs/<code>/*.md
pnpm docs:check

# 8. A new language (example: fr)
$EDITOR docs/locales.json docs/groups.json website/lib/locales.ts
pnpm locales && pnpm locales:check && pnpm docs

# 10. Website
pnpm --dir website install
pnpm --dir website dev           # http://localhost:3000
pnpm --dir website check:i18n
pnpm --dir website typecheck && pnpm --dir website build

# 11. A demo
cd examples/nuxt && npm install && npm run dev
```

<a id="versioning"></a>

## Versiones y actualizaciones

La versión 1.x define el contrato público de los nombres inferidos, la generación tipada de URLs, los adaptadores de framework, i18n, el wrapper de Next.js, el plugin de Vite y la CLI.

Las versiones de parche preservan la API documentada mientras corrigen errores. Las versiones menores añaden funcionalidad compatible, como nuevos adaptadores de framework. Los cambios incompatibles requieren una nueva versión mayor. Revisa el changelog antes de actualizar.

Después de actualizar, reinicia el servidor de desarrollo para regenerar el manifiesto y ejecuta la comprobación de tipos y las pruebas de navegación de tu aplicación. Si mueves una página y necesitas conservar su nombre de ruta público, usa un alias explícito.

```sh
npm install @triooo/next-named-routes@^1
npx named-routes check
npx tsc --noEmit
```

---

← Anterior: [Guías](guides.md) · [Volver al README](../../README.es.md)
