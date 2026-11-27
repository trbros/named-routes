# Comparación con alternativas

[Documentación](index.md) / [Primeros pasos](getting-started.md)

[English](../en/topic-comparison.md) · [Português](../pt/topic-comparison.md) · [Español](../es/topic-comparison.md) · [日本語](../ja/topic-comparison.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="comparison"></a>

Varios paquetes y funciones de los frameworks también generan URLs tipadas. Se diferencian en de dónde salen las rutas, si las rutas tienen nombre, qué frameworks cubren y si los idiomas forman parte del modelo. Las tablas resumen lo que cada proyecto documenta o publica; las cifras de npm son la última versión y las descargas del último mes, recogidas el 2026-11-05. ✓ significa compatible, ½ parcial, — no ofrecido o no documentado.

**En qué se diferencia este paquete.** Los nombres se infieren de los archivos que ya tienes y son idénticos en Next.js, Nuxt, Vue, SvelteKit, Astro, React Router y TanStack Router; los idiomas (prefijos, rutas traducidas, dominios) forman parte de la misma llamada tipada; y route() devuelve un string simple que funciona fuera de cualquier router: redirects, emails, sitemaps o un paquete compartido por varias apps en un monorepo.

**Cuándo encaja mejor otra opción.** Si usas un solo framework y te basta con identificar las rutas por su ruta, su función integrada no requiere dependencias extra. Si necesitas validar los search params contra un esquema (Zod, Valibot), next-typesafe-url y next-safe-navigation lo hacen y este paquete no. Si tus rutas viven en un backend Laravel, Ziggy es la opción natural. next-routes está pensado para el Pages Router heredado con React 15/16, y el paquete named-routes sin scope es un proyecto de 2022 sin relación, solo con un nombre parecido.

**Integrado en los frameworks.** typedRoutes de Next.js, href() de React Router, resolve() de SvelteKit y TanStack Router tipan rutas escritas con la sintaxis de ese framework; typedPages de Nuxt tipa los nombres de ruta de Nuxt. Funcionan dentro de un framework y no comparten nombres ni un modelo de idiomas con otros. getRelativeLocaleUrl() de Astro construye URLs de idioma a partir de una ruta sin tipar.

**Paquetes**

| Paquete | Frameworks | Rutas desde | Nombres | Parámetros tipados | i18n | Generador de URL | npm (última · mes) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **@triooo/named-routes** | Next.js, Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router | files · `createRoutes()` | ✓ `users.$user` | ✓ | ✓ | ✓ `route()` | 1.0.0 · new |
| nextjs-routes | Next.js | files | — `"/users/[id]"` | ✓ | ½ Pages Router | ✓ `route()` | 2.2.5 · 173k |
| next-typesafe-url | Next.js (peer ≤ 15) | files + Zod | — `"/users/[id]"` | ✓ + Zod | — | ✓ `$path()` | 6.1.0 · 41k |
| next-safe-navigation | Next.js App Router | `defineRoute()` | ✓ | ✓ + schema | — | ✓ `routes.name()` | 0.4.0 · 13k |
| vite-plugin-kit-routes | SvelteKit | files | — `"/about"` | ✓ | — | ✓ `route()` | 1.1.2 · 24k |
| typesafe-routes | any | `createRoutes({})` | ✓ `routes.users.edit` | ✓ | — | ✓ `renderPath()` | 12.3.0 · 25k |
| ziggy-js | any + Laravel | Laravel routes | ✓ Laravel | ✓ | — | ✓ `route()` | 2.6.5 · 567k |
| next-routes | Next.js Pages (React ≤ 16) | `routes.add()` | ✓ | — | — | ✓ `pushRoute()` | 1.4.2 · 49k |
| named-routes | Next.js Pages | `add(name, path)` | ✓ enum | ½ | — | ✓ `pathnameForParams()` | 0.1.0 · 0.3k |

**Integrado en los frameworks**

| Framework | Función | Clave de ruta | Parámetros tipados | Nombres compartidos entre frameworks | Idiomas |
| --- | --- | --- | --- | --- | --- |
| Next.js 16 | `typedRoutes: true` | `"/users/[id]"` | ✓ | — | — |
| React Router 7 | `href()` | `"/users/:id"` | ✓ | — | — |
| SvelteKit 2.26+ | `resolve()` | `"/blog/[slug]"` | ✓ | — | — |
| Nuxt 4 | `experimental.typedPages` | `users-id` | ✓ | — | ½ @nuxtjs/i18n |
| TanStack Router | `<Link to>` | `"/posts/$postId"` | ✓ | — | — |
| Astro 5 | `getRelativeLocaleUrl()` | `string` | — | — | ✓ |

---

← Anterior: [Lee el manifiesto generado](topic-generated-source.md) · [Todos los temas](getting-started.md) · Siguiente: [Cómo funciona la generación](topic-architecture.md) →
