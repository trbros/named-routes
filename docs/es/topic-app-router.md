# Recetas para el App Router

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-app-router.md) · [Português](../pt/topic-app-router.md) · [Español](../es/topic-app-router.md) · [日本語](../ja/topic-app-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="app-router"></a>

El helper devuelve un string de URL normal. Úsalo con next/link, redirect o el hook useRouter del App Router de next/navigation. Ejecuta los redirects desde el flujo de servidor o de eventos adecuado; las rutas con nombre no cambian la semántica de los redirects de Next.js.

Cada nombre de estos fragmentos supone que existe la página correspondiente: posts/page.tsx, posts/[post]/page.tsx y posts/[post]/edit/page.tsx.

**Base y URLs traducidas.** El wrapper hereda basePath. Mantén Next Link y navegación del router internos; añade basePath: true para enlaces normales. Para redirigir alias traducidos entrantes, usa route.localize() con el idioma ya seleccionado en el proxy o middleware; consulta i18n.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

## Temas relacionados

- [Enlaces y navegación](topic-nextjs-navigation.md)
- [App Router — navegación programática](topic-nextjs-router-push.md)
- [App Router — redirect()](topic-nextjs-redirect.md)
- [Base path y despliegue](topic-nextjs-deployment.md)

---

← Anterior: [Endpoints HTTP](topic-nextjs-endpoints.md) · [Todos los temas](framework-nextjs.md) · Siguiente: [Recetas para el Pages Router](topic-pages-router.md) →
