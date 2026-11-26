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

**Base y URLs traducidas.** El wrapper hereda basePath. Mantén Next Link y navegación del router internos; añade basePath: true para enlaces normales. Para redirigir alias traducidos entrantes, usa route.localize() con el idioma ya seleccionado en el proxy o middleware; consulta i18n.

```tsx
// Server Component (next.config.ts has basePath: "/app")
import Link from "next/link";
import { route } from "@/routes.generated";
export default function PostLink() {
  return <>
    <Link href={route("posts.$post", { post: 42 })}>Post</Link>
    <a href={route("posts.$post", { post: 42 }, { basePath: true })}>Public URL</a>
  </>;
}

// A separate Client Component file:
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function EditPost({ post }: { post: number }) {
  const router = useRouter();
  // Next's router applies the base itself.
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

**Base e i18n.** Next Link y next/router usan basePath y locale configurados. Mantén route() interno para estos consumidores. Usa basePath: true y, cuando corresponda, locale en URLs públicas normales; route.localize() requiere i18n y no instala redirects automáticamente.

```tsx
// With basePath: "/app" in next.config.ts
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "@/routes.generated";
export default function Page() {
  const router = useRouter();
  return <>
    {/* Next Link adds the base and the configured locale. */}
    <Link href={route("users.$user", { user: 42 })}>User</Link>
    <button onClick={() => router.replace(route("user.profile"))}>
      Profile
    </button>
    {/* Plain HTML URL needs the base explicitly. */}
    <a href={route("users.$user", { user: 42 }, { basePath: true })}>Public URL</a>
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

route.parseQuery(name, url) lee de vuelta la query de una URL con el schema de la ruta cuando está disponible en runtime (validateQuery: true, o schemas pasados a createRoutes) y devuelve { ok: true, value } con el tipo de salida del schema, o { ok: false, issues }. Los valores llegan como strings; en las claves que el schema rechaza, los strings que route() escribe para números y true/false se convierten de vuelta y un valor único pasa a array, así que el mismo schema construye y lee. Las rutas sin schema en runtime (sin schema, defineQuery.type() o schemas importados solo como tipos) devuelven la query sin procesar, y su tipo lo indica.

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

// With validateQuery: true
const parsed = route.parseQuery("products", "/products?page=2&sort=newest");
if (parsed.ok) parsed.value.page; // 2 (number | undefined)
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

**Prefijos de los frameworks.** Next.js hereda basePath y Nuxt hereda app.baseURL. En Astro registra la integración nativa de @triooo/named-routes/astro en integrations: usa el base final de Astro, no la URL de assets de Vite. En Vue Router, React Router/Remix, TanStack Router y SvelteKit, comparte el mismo prefijo de navegación entre el framework y namedRoutes({ routerBase: base }); no lo deduzcas de un CDN. Usa inheritViteBase: true solo cuando el base de Vite sea también el prefijo del router. defaults.basePath explícito tiene prioridad.

**CLI independiente.** Tras una generación correcta, .named-routes/ guarda el prefijo público efectivo por framework. La CLI y doctor lo reutilizan salvo que se indique defaults.basePath o --base-path. Ejecuta de nuevo el framework tras modificar su configuración; la CLI no ejecuta configuraciones de frameworks. En un checkout limpio o CI antes de la primera ejecución, usa defaults.basePath en la configuración compartida o --base-path. Usa --base-path / para eliminarlo. Ignora .named-routes/ en Git. route() sigue omitiendo el prefijo; usa { basePath: true } para URLs públicas y enlaces HTML.

```ts
// next.config.ts
export default withNamedRoutes({ basePath: "/admin" }, {
  defaults: { origin: "https://triooo.com.br" },
});
route("users.$user", { user: 42 }); // /users/42 (Next Link/router)
route("users.$user", { user: 42 }, { basePath: true }); // /admin/users/42
route("users.$user", { user: 42 }, { absolute: true });
// https://triooo.com.br/admin/users/42

// In any framework: named-routes.config.mjs (alternative shared config)
export default defineConfig({ defaults: { basePath: "/admin" } });
```

<a id="i18n"></a>

## Idiomas e i18n

Configura i18n con locales, defaultLocale y, opcionalmente, localePrefix, pathnames y domains. La forma coincide con defineRouting() de next-intl, así que puedes pasar ese objeto routing directamente; las claves exclusivas de next-intl como localeCookie se aceptan y se ignoran. En proyectos Next.js con Pages Router, withNamedRoutes hereda automáticamente el i18n de next.config (localePrefix as-needed, dominios incluidos).

Una primera carpeta dinámica llamada locale o lang (app/[locale]/…, pages/[lang]/…, cámbialo con localeParam) se elimina de los nombres y patrones: app/[locale]/about/page.tsx se convierte en about → /about. Las carpetas físicas de idioma (src/pages/pt/about.astro) se fusionan en la misma ruta. Sin carpeta de idioma (i18n del Pages Router, @nuxtjs/i18n, rewrites de middleware), todas las páginas se localizan. Los endpoints y las rutas fuera de [locale] se listan como unlocalized y nunca reciben prefijo.

route(nombre, params) sin locale devuelve la ruta interna, que es lo que esperan el Link de next-intl, el Link del Pages Router y el localePath de @nuxtjs/i18n. Pasa { locale } para enlaces simples, redirects, sitemaps, emails o selectores de idioma. route.forLocale(locale) devuelve un helper ligado a ese idioma y route.locales() lista los idiomas configurados.

localePrefix: always (por defecto) pone prefijo a todos los idiomas; as-needed omite el idioma por defecto; never omite todos los prefijos; { mode, prefixes: { "en-US": "/us" } } los personaliza. pathnames asigna a un patrón interno patrones localizados con los mismos parámetros. Con absolute: true, un idioma servido por un dominio configurado usa ese dominio como origen. Los idiomas están tipados: el módulo generado exporta RouteLocale y los idiomas desconocidos son errores de tipos y de runtime.

**Traducir URLs entrantes.** route.localize('/sobre', 'en') devuelve /en/about si /sobre es la ruta portuguesa de /about y localePrefix es always. route.localize('/pt/produtos/42?tab=info#details', 'en') puede devolver /en/products/42?tab=info#details. Busca en todos los idiomas configurados, conserva parámetros, query y fragmento originales y devuelve null para rutas desconocidas, ambiguas o no localizadas. route.match() no cambia. Un prefijo de origen reconocido o sourceLocale para alias sin prefijo desempata patrones igualmente específicos. Sin idioma de destino se usa forLocale() o el idioma predeterminado.

**Redirigir peticiones.** El runtime no intercepta peticiones. Determina el idioma preferido con tu middleware i18n, llama a route.localize(pathAndQuery, locale, { basePath: true }) para una URL pública con base y redirige temporalmente solo si cambia la ruta. El framework mantiene sus rewrites. Para una ruta interna usa includeBasePath: true para añadir el prefijo solo a la salida. Con dominios por idioma usa absolute: true y compara la URL completa. No redirijas APIs, assets, métodos distintos de GET/HEAD ni rutas sin resolver. Hay un ejemplo de proxy Next.js en examples/app-router/recipes/localized-redirect.ts.example.

```ts
// next.config.ts — next-intl with app/[locale]/…
import { routing } from "./src/i18n/routing";
export default withNamedRoutes(withNextIntl({}), { i18n: routing });

// or named-routes.config.mjs (any framework)
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "always",
    pathnames: { "/about": { en: "/about", pt: "/sobre" } },
  },
});

// Results with the always-prefix configuration above:
route("about"); // /about (internal pathname)
route("about", {}, { locale: "pt" }); // /pt/sobre
route("about", {}, { locale: "en" }); // /en/about
route.localize("/sobre", "en"); // /en/about
route.localize("/en/about?tab=info#details", "pt"); // /pt/sobre?tab=info#details
route.forLocale("en").localize("/sobre"); // /en/about
const pt = route.forLocale("pt");
pt("users.$user", { user: 42 }); // /pt/users/42
```

<a id="typescript"></a>

## TypeScript y typedRoutes de Next

Los patrones literales infieren uniones de nombres y objetos de parámetros. Los parámetros obligatorios se comprueban en tiempo de compilación; las rutas catch-all opcionales pueden llamarse sin parámetros. El runtime sigue validando las llamadas desde JavaScript.

Desde la 2.0 route() devuelve hrefs tipados (ver Hrefs tipados): tipos template literal que typedRoutes de Next.js, <Link> y router.push() aceptan sin afirmar Route. hrefs: "string" devuelve string como en la 1.x. Los tipos exportados requieren TypeScript 5.4+. No afirmes entradas arbitrarias y no confiables como nombre de ruta para saltarte la validación.

```ts
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes (typed hrefs are the default):
// <Link href={route(name)}>Profile</Link>   // no cast
```

<a id="typed-hrefs"></a>

## Hrefs tipados para typedRoutes de Next.js

route() devuelve tipos template literal en lugar de string (el valor por defecto desde la 2.0): route("users.$user", { user: 42 }) tiene el tipo `/users/${string}`. typedRoutes de Next.js acepta estos valores en <Link href>, router.push(), replace() y prefetch() en ambos routers sin cast, y otros routers tipados los aceptan como strings. Solo cambian los tipos: las URLs son idénticas.

Las llamadas con query o hash devuelven la ruta más `?${string}` o `#${string}`. Las llamadas con absolute, basePath y locale devuelven string, porque Next añade basePath e idiomas por su cuenta y rechaza URLs absolutas en enlaces tipados. Los segmentos opcionales se convierten en uniones, así que /shop/[[...path]] sin parámetros tiene el tipo "/shop"; el propio typedRoutes de Next.js rechaza esa ruta base de un catch-all opcional, incluso como literal, así que pasa un segmento en ese caso.

Un tipo de retorno más estrecho puede romper código que guarda una ruta en una variable reasignada después a otro string, como useState(route(...)) seguido de setState(window.location.href): anota la variable como string, o usa hrefs: "string" para mantener el tipo de la 1.x (named-routes migrate --to 2 lo hace). Con hrefs: "string" y typedRoutes, withNamedRoutes() imprime un aviso y named-routes doctor también lo señala. Verificado con next typegen y tsc reales en Next 16 (App Router y Pages Router, webpack y Turbopack).

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```

---

← Anterior: [Frameworks](frameworks.md) · [Volver al README](../../README.es.md) · Siguiente: [Referencia de la API](api-reference.md) →
