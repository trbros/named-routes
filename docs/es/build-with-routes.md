# Construye con rutas · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/build-with-routes.md) · [Português](../pt/build-with-routes.md) · [Español](../es/build-with-routes.md) · [日本語](../ja/build-with-routes.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Recetas para el App Router](#app-router)
- [Recetas para el Pages Router](#pages-router)
- [Parámetros y codificación](#parameters)
- [Query strings y fragmentos](#query-hash)
- [Parámetros de query tipados](#typed-query)
- [Enrutamiento inverso y ruta activa](#reverse-routing)
- [basePath, barras finales y orígenes](#base-path)
- [Idiomas e i18n](#i18n)
- [TypeScript y typedRoutes de Next](#typescript)
- [Hrefs tipados para typedRoutes de Next.js](#typed-hrefs)

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

<a id="typed-query"></a>

## Parámetros de query tipados

Declara schemas de query por ruta en un módulo cuyo export default es defineQuery({...}) y apunta la opción query a él. Las claves son nombres de ruta; los valores son validadores Standard Schema (Zod 3.24+, Valibot 1+, ArkType y otros) o defineQuery.type<T>() para tipos solo de TypeScript. Las rutas sin schema conservan la query de la 1.0.

Con un schema, TypeScript rechaza claves desconocidas y valores incompatibles, y las claves obligatorias hacen obligatorio options.query. Ninguna biblioteca de schemas se convierte en dependencia: las salidas TypeScript importan el módulo solo como tipos, así que no se empaqueta nada ni se valida nada en runtime.

Define validateQuery: true para empaquetar los schemas y validar cada objeto de query al construir una URL; los fallos lanzan INVALID_QUERY con los problemas encontrados. La validación nunca cambia la URL: los valores se serializan tal como los pasas, sin los valores por defecto ni las transformaciones del schema. Los schemas asíncronos se rechazan porque route() es síncrono. Las salidas JavaScript importan el módulo como valor para inferir sus tipos. Zod 4 y Valibot 1 requieren TypeScript 5.4+.

```ts
// src/route-query.ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({
  products: z.object({
    page: z.number().int().min(1).optional(),
    sort: z.enum(["newest", "price"]).optional(),
  }),
  search: defineQuery.type<{ q: string }>(),
});

// named-routes.config.ts: defineConfig({ query: "src/route-query.ts" })
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

<a id="reverse-routing"></a>

## Enrutamiento inverso y ruta activa

route.match(url) devuelve la ruta con nombre a la que apunta una ruta, con los params decodificados, la query (las claves repetidas se convierten en arrays), el hash y el idioma, o null. Acepta una ruta relativa a la raíz, como /users/42?tab=posts#bio, o un objeto URL; las URLs absolutas solo coinciden en el origin configurado o en un dominio de i18n. route.is(nombre, url) compara una URL con una ruta; { exact: false } también acepta descendientes, para secciones activas de la navegación. route.breadcrumbs(url) devuelve las coincidencias de cada ruta antecesora.

Los segmentos estáticos ganan, luego los mixtos, dinámicos, opcionales, catch-all y catch-all opcionales, comparados de izquierda a derecha; los patrones igual de específicos se resuelven por orden de declaración. Los segmentos se separan antes de decodificarse, así que %2F permanece dentro de un parámetro; un percent-encoding mal formado, los segmentos vacíos y las URLs relativas o sin protocolo devuelven null. Pasa { basePath: true } cuando la URL incluye basePath (window.location.pathname). Se reconocen los prefijos de idioma, los prefijos personalizados y los pathnames localizados.

La coincidencia describe solo tu tabla de rutas: no es autorización, no demuestra que un recurso exista ni que una navegación vaya a funcionar, y no sustituye al router del framework. La query se devuelve como strings; analízala con tu propio schema, por ejemplo schema.parse(found.query) con coerción.

```ts
const found = route.match("/users/42?tab=posts");
// { name: "users.$user", params: { user: "42" }, query: { tab: "posts" }, hash: "", locale: undefined, ... }
if (found?.name === "users.$user") found.params.user; // string

route.is("users.$user", "/users/new"); // false when /users/new is its own page
route.is("users", pathname, { exact: false }); // active section
route.breadcrumbs("/users/42/edit").map((item) => item.name);
// ["home", "users", "users.$user", "users.$user.edit"]
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

Por defecto, route() devuelve string. Con typedRoutes de Next.js, define hrefs: "typed" (consulta Hrefs tipados) en lugar de hacer aserciones a Route: route() pasa a devolver tipos template literal que <Link> y router.push() aceptan. No hagas aserciones de entradas arbitrarias no confiables a un nombre de ruta para saltarte la validación.

```ts
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes and hrefs: "typed":
// <Link href={route(name)}>Profile</Link>   // no cast
```

<a id="typed-hrefs"></a>

## Hrefs tipados para typedRoutes de Next.js

Define hrefs: "typed" en named-routes.config, en withNamedRoutes() o en el plugin de Vite, y route() devolverá tipos template literal en lugar de string: route("users.$user", { user: 42 }) tiene el tipo `/users/${string}`. typedRoutes de Next.js acepta estos valores en <Link href>, router.push(), replace() y prefetch() en ambos routers, sin cast. La opción solo afecta a los tipos: las URLs son idénticas.

Las llamadas con query o hash devuelven la ruta más `?${string}` o `#${string}`. Las llamadas con absolute, basePath y locale devuelven string, porque Next añade basePath e idiomas por su cuenta y rechaza URLs absolutas en enlaces tipados. Los segmentos opcionales se convierten en uniones, así que /shop/[[...path]] sin parámetros tiene el tipo "/shop"; el propio typedRoutes de Next.js rechaza esa ruta base de un catch-all opcional, incluso como literal, así que pasa un segmento en ese caso.

En la serie 1.x hay que activarla porque un tipo de retorno más estrecho puede romper código que guarda una ruta en una variable que luego se reasigna a otro string. Con typedRoutes activo y sin la opción, withNamedRoutes() muestra una sugerencia y named-routes doctor emite un warning. Verificado con next typegen y tsc reales en Next 16 (App Router y Pages Router, webpack y Turbopack).

```tsx
// next.config.ts
export default withNamedRoutes({ typedRoutes: true }, { hrefs: "typed" });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```

---

← Anterior: [Frameworks](frameworks.md) · [Volver al README](../../README.es.md) · Siguiente: [Referencia de la API](api-reference.md) →
