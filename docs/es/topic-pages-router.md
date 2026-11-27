# Recetas para el Pages Router

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-pages-router.md) · [Português](../pt/topic-pages-router.md) · [Español](../es/topic-pages-router.md) · [日本語](../ja/topic-pages-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="pages-router"></a>

Usa el mismo helper generado. En las aplicaciones con Pages Router, el hook del router viene de next/router. Link no necesita un adaptador propio. El descubrimiento puede escanear ambos directorios de router durante una migración, pero las URLs canónicas en conflicto hacen fallar la generación.

**Base e i18n.** Next Link y next/router usan basePath y locale configurados. Mantén route() interno para estos consumidores. Usa basePath: true y, cuando corresponda, locale en URLs públicas normales; route.localize() requiere i18n y no instala redirects automáticamente.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

## Temas relacionados

- [Enlaces y navegación](topic-nextjs-navigation.md)
- [Base path y despliegue](topic-nextjs-deployment.md)
- [Enlaces localizados](topic-nextjs-i18n.md)

---

← Anterior: [Recetas para el App Router](topic-app-router.md) · [Todos los temas](framework-nextjs.md) · Siguiente: [Hrefs tipados para typedRoutes de Next.js](topic-typed-hrefs.md) →
