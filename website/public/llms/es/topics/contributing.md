# Contribuye paso a paso

Topic: `contributing` · Named Routes v2.2.0

**1. Requisitos.** Instala Node.js 22.12 o superior (22.18+ si quieres cargar archivos named-routes.config.ts), Git y Python 3 (solo se usa para generar los README). Activa pnpm 12.16.1, la versión fijada en package.json: corepack enable o npm install --global pnpm@12.16.1.

**2. Clona y compila.** Clona el repositorio, ejecuta pnpm install en la raíz y luego pnpm build. El build limpia dist/ y compila src/*.ts a JavaScript ESM, declaraciones y source maps. Vuelve a ejecutar pnpm build después de cada cambio en src/: el sitio y las demos usan dist/, no los fuentes TypeScript.

**3. Conoce la estructura.** src/index.ts es el runtime que funciona en el navegador (createRoutes, i18n, patrones); src/frameworks.ts contiene los adaptadores de convenciones de archivos; src/generator.ts descubre, valida y escribe el módulo; src/config.ts carga named-routes.config.*; src/next.ts y src/vite.ts son las integraciones; src/cli.ts es el binario named-routes. tests/ tiene la suite de Node y los smoke tests. docs/locales.json lista los idiomas, docs/content.json guarda la documentación multilingüe y website/messages/<código>.json los textos de la interfaz. website/ es este sitio, examples/ tiene una demo por framework y scripts/ tiene las utilidades de versiones, documentación e idiomas.

**4. Prueba mientras trabajas.** pnpm check compila y ejecuta todas las pruebas de Node y los contratos TypeScript positivos y negativos; es lo que la CI ejecuta en Node 20, 22, 24 y 26. pnpm test:next inicia servidores reales de Next.js (instala antes examples/app-router con pnpm --dir examples/app-router install). pnpm test:vite inicia un servidor real de Vite. pnpm test:package empaqueta el tarball y lo instala en un proyecto limpio. pnpm release:check ejecuta todo lo anterior.

**5. Edita la documentación.** docs/content.json es la fuente única del sitio y de todos los README. Cada sección tiene id, title.<código>, paragraphs.<código> (una lista de párrafos por idioma), code y language; los códigos son en, pt, es y ja. El inglés es el idioma de origen: escribe primero el texto en inglés y mantén el mismo número de párrafos en todos los idiomas. **texto** se muestra en negrita en el sitio y en el README. Una sección nueva también debe añadirse a un grupo de docs/groups.json (la barra lateral del sitio y las páginas de temas del README); si no, pnpm run docs falla. Su página es /docs/<id>.

**6. Traduce y sincroniza los idiomas.** Ejecuta pnpm locales (node scripts/sync-locales.mjs) después de cambiar texto en inglés. Compara cada idioma con el inglés en docs/content.json y website/messages/*.json, completa lo que falte con el texto en inglés para que el sitio siga funcionando, elimina las claves de interfaz que ya no existen en inglés, reordena las claves según en.json e imprime la lista "Needs translation". Traduce cada elemento listado en su idioma y luego ejecuta pnpm locales:check (node scripts/sync-locales.mjs --check): no modifica nada y falla si faltan títulos o párrafos, si el número de párrafos es distinto, si los marcadores **negrita** están desbalanceados, si faltan o sobran claves de interfaz, si difieren placeholders ICU como {count}, si las claves están fuera de orden o si falta un idioma en website/lib/locales.ts. La CI ejecuta esta comprobación. node scripts/sync-locales.mjs --untranslated también lista los textos que siguen siendo idénticos al inglés, útil para revisar un idioma antes de publicar.

**7. Sincroniza los README.** Ejecuta pnpm run docs (python3 scripts/sync-docs.py) para regenerar README.md, README.pt-BR.md, README.es.md y README.ja.md (lo esencial y un índice) y las páginas de temas en docs/<código>/*.md (una por grupo de docs/groups.json) a partir de docs/content.json, docs/groups.json y docs/locales.json, y versiónalos todos. pnpm run docs:check falla cuando alguno de estos archivos está desactualizado; la CI lo ejecuta, así que nunca los edites a mano. El orden habitual es: editar el inglés, pnpm locales, traducir, pnpm locales:check, pnpm run docs.

**8. Añade un idioma nuevo.** (a) Añade una entrada en docs/locales.json con code, name, htmlLang, readme (por ejemplo README.fr.md) y las etiquetas del README contents, references, localGuide, documentation, back, previous y next. (b) Añade el código a la unión Locale de website/lib/locales.ts y un título para él en cada grupo de docs/groups.json. (c) Ejecuta pnpm locales: crea website/messages/<código>.json y completa docs/content.json con el texto en inglés como provisional. (d) Traduce cada elemento que liste. (e) Añade el nuevo README a la lista files de package.json. (f) Si la escritura necesita otras fuentes o un salto de línea distinto (como el japonés), añade reglas para html[lang="<código>"] en website/app/transit.css. (g) Ejecuta pnpm locales:check, pnpm run docs, pnpm --dir website check:i18n y pnpm --dir website build. El selector de idioma del header muestra el idioma nuevo automáticamente.

**9. Edita los textos del sitio.** Las cadenas de la interfaz están en website/messages/<código>.json dentro de ui, con las mismas claves en todos los archivos; la sintaxis ICU se comprueba, así que evita llaves sin escapar y mantén los placeholders idénticos. Añade las claves nuevas primero en en.json, luego ejecuta pnpm locales y tradúcelas. pnpm --dir website check:i18n valida todos los catálogos. Los datos de frameworks de la página principal (filas del panel, líneas del mapa, tabla de compatibilidad) están en website/lib/transit.ts y deben coincidir con resultados reales del generador.

**10. Ejecuta el sitio.** Después de pnpm build en la raíz, ejecuta pnpm --dir website install una vez y pnpm --dir website dev (o pnpm website). El sitio depende del paquete mediante link:.., así que recompila el paquete y reinicia el servidor de desarrollo al cambiar src/. Cambia de idioma con EN, PT, ES y JA en el header. Antes de un pull request ejecuta pnpm --dir website typecheck y pnpm --dir website build.

**11. Prueba una demo.** Cada carpeta de examples/ es una app pequeña: cd examples/sveltekit (o nuxt, vue, astro, react-router, tanstack-router, react), npm install, npm run dev. Añade una página y mira cómo cambia su routes.generated.ts. Las demos de Next.js usan pnpm.

**12. Añade un framework.** Escribe el adaptador en src/frameworks.ts (sources, extensions, skipDirectory, map) y enseña a detectFramework a reconocer su paquete; añade pruebas de convención en tests/frameworks.test.mjs; añade una demo en examples/ y en la matriz del workflow de demos; documéntalo en docs/content.json en todos los idiomas; añade su línea en website/lib/transit.ts solo cuando la demo compile.

**13. Abre un pull request.** Mantén el cambio acotado, añade pruebas de regresión, actualiza CHANGELOG.md en la próxima versión, ejecuta pnpm release:check, pnpm locales:check y pnpm run docs:check, y nunca versiones archivos generados (dist/, routes.generated.ts, .next/, salida de build de las demos); .gitignore ya los excluye.

**14. Publicaciones (mantenedores).** Sube version en package.json, mueve la entrada del CHANGELOG a esa versión, ejecuta pnpm release:check y publica una release en GitHub con la etiqueta named-routes-vX.Y.Z. El workflow de publicación valida la etiqueta, vuelve a ejecutar la CI y publica en npm con provenance mediante trusted publishing de npm (no se guarda ningún token de npm). Se aplica la Licencia Apache 2.0; las fuentes incluidas conservan sus licencias OFL.

```sh
git clone https://github.com/trbros/named-routes.git
cd named-routes
pnpm install
pnpm run check
```

Related topic IDs: website, demos, versioning, cli-check
