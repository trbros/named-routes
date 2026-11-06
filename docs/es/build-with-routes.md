# Construye con rutas · @triooo/next-named-routes

[← Volver al README](../../README.es.md) · [English](../en/build-with-routes.md) · [Português](../pt/build-with-routes.md) · [Español](../es/build-with-routes.md) · [日本語](../ja/build-with-routes.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Recetas para el App Router](#app-router)
- [Recetas para el Pages Router](#pages-router)
- [Parámetros y codificación](#parameters)
- [Query strings y fragmentos](#query-hash)
- [basePath, barras finales y orígenes](#base-path)
- [Idiomas e i18n](#i18n)
- [TypeScript y typedRoutes de Next](#typescript)

<a id="app-router"></a>

## Recetas para el App Router

El helper devuelve un string de URL normal. Úsalo con next/link, redirect o el hook useRouter del App Router de next/navigation. Ejecuta los redirects desde el flujo de servidor o de eventos adecuado; las rutas con nombre no cambian la semántica de los redirects de Next.js.

Cada nombre de estos fragmentos supone que existe la página correspondiente: posts/page.tsx, posts/[post]/page.tsx y posts/[post]/edit/page.tsx.

```tsx
// Server Component
import Link from "next/link";
import { route } from "@/routes.generated";
export default function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}

// A separate Client Component file:
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function EditPost({ post }: { post: number }) {
  const router = useRouter();
  return <button onClick={() => router.push(
    route("posts.$post.edit", { post })
  )}>Edit</button>;
}

// In a server-side redirect flow:
// import { redirect } from "next/navigation";
// redirect(route("posts"));
```

<a id="pages-router"></a>

## Recetas para el Pages Router

Usa el mismo helper generado. En las aplicaciones con Pages Router, el hook del router viene de next/router. Link no necesita un adaptador propio. El descubrimiento puede escanear ambos directorios de router durante una migración, pero las URLs canónicas en conflicto hacen fallar la generación.

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "@/routes.generated";
export default function Page() {
  const router = useRouter();
  return <>
    <Link href={route("users.$user", { user: 42 })}>User</Link>
    <button onClick={() => router.replace(route("user.profile"))}>
      Profile
    </button>
  </>;
}
```

<a id="parameters"></a>

## Parámetros y codificación

[id] requiere un string no vacío o un número finito. [[id]] (Nuxt, Vue, SvelteKit, React Router, TanStack) es un escalar opcional; omitirlo elimina el segmento. [...slug] requiere un array no vacío de strings/números. [[...slug]] acepta un array opcional; un valor omitido, null o [] elimina la parte catch-all. Los segmentos mixtos requieren todos los parámetros que contienen.

Cada segmento de parámetro se codifica por separado. Una barra dentro de un escalar se codifica, mientras que un array catch-all produce segmentos de ruta separados. Los parámetros extra, los valores obligatorios vacíos, NaN, Infinity, los objetos y los segmentos . o .. aislados fallan. Estas comprobaciones validan la construcción de la URL, no los identificadores de negocio de tu aplicación.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" });       // /users/a%2Fb
// app/docs/[[...slug]]/page.tsx:
route("docs.$slug");                         // /docs
route("docs.$slug", { slug: ["guide", "install"] });
// /docs/guide/install
// pages/[[lang]]/about.vue and pages/v[major]-[minor].vue:
route("$lang.about");                        // /about
route("v$major-$minor", { major: 2, minor: 1 }); // /v2-1
```

<a id="query-hash"></a>

## Query strings y fragmentos

Pasa query y hash en el tercer argumento. Los valores de query pueden ser strings, números finitos, booleanos o arrays de solo lectura con esos valores. null y undefined se omiten, también dentro de arrays. Los arrays repiten la clave; no usan notación de corchetes.

El hash es un string sin el # inicial y el helper lo codifica. Permanece en el navegador y no se envía al servidor. Los strings de hash y los objetos de query se validan en runtime.

```ts
route("users.$user", { user: 42 }, {
  query: { page: 2, tag: ["next", "react"], draft: false, omit: null },
  hash: "activity",
});
// /users/42?page=2&tag=next&tag=react&draft=false#activity
```

<a id="base-path"></a>

## basePath, barras finales y orígenes

Next Link y la navegación del router añaden el basePath por su cuenta. Las URLs relativas del helper lo omiten por defecto para evitar prefijos duplicados. Para enlaces simples, fetch u otros consumidores, pide basePath: true. absolute: true siempre incluye el basePath y requiere defaults.origin.

withNamedRoutes hereda basePath y trailingSlash de la configuración de Next. Una opción defaults explícita prevalece sobre los valores heredados. El origin debe ser un origen HTTP(S) sin credenciales, ruta distinta de la raíz, query ni hash; nunca se adivina a partir de una petición o de window.

Todos los defaults se serializan en el módulo generado, que es público. Nunca pongas secretos en ellos. trailingSlash da formato a las rutas generadas; Next sigue siendo responsable de los redirects y de la normalización final.

```ts
// next.config.ts
export default withNamedRoutes({ basePath: "/admin" }, {
  defaults: { origin: "https://triooo.com.br" },
});
route("users.$user", { user: 42 }); // /users/42 (Next Link/router)
route("users.$user", { user: 42 }, { basePath: true });
// /admin/users/42 (plain anchor/fetch)
route("users.$user", { user: 42 }, { absolute: true });
// https://triooo.com.br/admin/users/42
```

<a id="i18n"></a>

## Idiomas e i18n

Configura i18n con locales, defaultLocale y, opcionalmente, localePrefix, pathnames y domains. La forma coincide con defineRouting() de next-intl, así que puedes pasar ese objeto routing directamente; las claves exclusivas de next-intl como localeCookie se aceptan y se ignoran. En proyectos Next.js con Pages Router, withNamedRoutes hereda automáticamente el i18n de next.config (localePrefix as-needed, dominios incluidos).

Una primera carpeta dinámica llamada locale o lang (app/[locale]/…, pages/[lang]/…, cámbialo con localeParam) se elimina de los nombres y patrones: app/[locale]/about/page.tsx se convierte en about → /about. Las carpetas físicas de idioma (src/pages/pt/about.astro) se fusionan en la misma ruta. Sin carpeta de idioma (i18n del Pages Router, @nuxtjs/i18n, rewrites de middleware), todas las páginas se localizan. Los endpoints y las rutas fuera de [locale] se listan como unlocalized y nunca reciben prefijo.

route(nombre, params) sin locale devuelve la ruta interna, que es lo que esperan el Link de next-intl, el Link del Pages Router y el localePath de @nuxtjs/i18n. Pasa { locale } para enlaces simples, redirects, sitemaps, emails o selectores de idioma. route.forLocale(locale) devuelve un helper ligado a ese idioma y route.locales() lista los idiomas configurados.

localePrefix: always (por defecto) pone prefijo a todos los idiomas; as-needed omite el idioma por defecto; never omite todos los prefijos; { mode, prefixes: { "en-US": "/us" } } los personaliza. pathnames asigna a un patrón interno patrones localizados con los mismos parámetros. Con absolute: true, un idioma servido por un dominio configurado usa ese dominio como origen. Los idiomas están tipados: el módulo generado exporta RouteLocale y los idiomas desconocidos son errores de tipos y de runtime.

```ts
// next.config.ts — next-intl with app/[locale]/…
import { routing } from "./src/i18n/routing"; // defineRouting({...})
export default withNamedRoutes(withNextIntl({}), { i18n: routing });

// or named-routes.config.mjs (any framework)
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "as-needed",
    pathnames: { "/about": { pt: "/sobre" } },
  },
});

route("about");                     // /about (next-intl Link adds the locale)
route("about", {}, { locale: "pt" }); // /pt/sobre
route("about", {}, { locale: "en" }); // /about
const pt = route.forLocale("pt");
pt("users.$user", { user: 42 });      // /pt/users/42
```

<a id="typescript"></a>

## TypeScript y typedRoutes de Next

Los patrones literales infieren uniones de nombres y objetos de parámetros. Los parámetros obligatorios se comprueban en tiempo de compilación; las rutas catch-all opcionales pueden llamarse sin parámetros. El runtime sigue validando las llamadas desde JavaScript.

route() devuelve string, no el tipo Route generado por Next. Cuando typedRoutes de Next está activado, su validación de Link puede requerir una aserción a Route. El paquete sigue comprobando el nombre de la ruta y los parámetros. No hagas aserciones de entradas arbitrarias no confiables a un nombre de ruta para saltarte la validación.

```ts
import type { Route } from "next";
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes:
// <Link href={route(name) as Route}>Profile</Link>
```

---

← Anterior: [Frameworks](frameworks.md) · [Volver al README](../../README.es.md) · Siguiente: [Referencia de la API](api-reference.md) →
