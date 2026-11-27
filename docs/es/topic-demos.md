# Pruébalo: demos por framework

[Documentación](index.md) / [Proyecto y versiones](project.md)

[English](../en/topic-demos.md) · [Português](../pt/topic-demos.md) · [Español](../es/topic-demos.md) · [日本語](../ja/topic-demos.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="demos"></a>

examples/ contiene una pequeña app ejecutable para cada configuración compatible: app-router y pages-router (Next.js), nuxt, vue (Vue Router 5), sveltekit, astro, react-router (flat routes), tanstack-router y react (rutas declaradas a mano con createRoutes). Cada una enlaza por nombre a una página estática, una página dinámica de usuarios o posts y una página catch-all de documentación; los demos de Next.js también usan typedRoutes con hrefs tipados (App Router) e i18n con query strings (Pages Router). pnpm test:e2e instala el tarball empaquetado en una copia de cada demo y comprueba build, servidor de producción, navegación en el navegador y descubrimiento de páginas en vivo.

Las demos dependen del paquete mediante file:../.., así que compila el paquete una vez en la raíz del repositorio y después instala y ejecuta cualquier demo con npm. El módulo generado aparece en la primera ejecución de dev o build y cambia a medida que añades páginas. Cada demo compila con su framework real.

## Ejemplo

```sh
# Repository root, once:
pnpm install && pnpm build

# Any demo:
cd examples/nuxt        # or vue, sveltekit, astro, react-router, tanstack-router, react
npm install
npm run dev
# create a page and watch routes.generated.ts update
```

---

← Anterior: [Sitio de documentación](topic-website.md) · [Todos los temas](project.md) · Siguiente: [Contribuye paso a paso](topic-contributing.md) →
