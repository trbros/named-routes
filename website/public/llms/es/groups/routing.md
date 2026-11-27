# Construcción de URL y nombres

# route()

Topic: `helper-route` · Named Routes v2.2.0

route(nombre, params?, options?) devuelve una URL, sin navegar. Los parámetros son tipados y validados; query, hash y locale van en el tercer argumento. Para una URL pública usa route.url().

Usa route() para la navegación nativa de Next.js, Nuxt, Vue Router, React Router y TanStack Router. Astro, SvelteKit y la generación manual incluyen la base configurada por defecto. Usa route.url() para URL públicas. defaults.includeBasePath y basePath cambian el valor predeterminado; las URL absolutas incluyen la base.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

Related topic IDs: public-url, parameters, query-hash, base-path
---

# route.url() — URL públicas

Topic: `public-url` · Named Routes v2.2.0

Firma: route.url(nombre, { params?, query?, hash?, locale?, absolute?, basePath? }). Las opciones son opcionales si la ruta y consulta lo permiten. Incluye la base; basePath: false devuelve la ruta interna. Devuelve string.

Usa route() para la navegación nativa de Next.js, Nuxt, Vue Router, React Router y TanStack Router. Astro, SvelteKit y la generación manual incluyen la base configurada por defecto. Usa route.url() para URL públicas. defaults.includeBasePath y basePath cambian el valor predeterminado; las URL absolutas incluyen la base.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" });

route.url("entrar"); // /entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /users/42?tab=posts
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" }, { basePath: "/app" });

route.url("entrar"); // /app/entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /app/users/42?tab=posts
```

Related topic IDs: helper-route, base-path, helper-endpoint
---

# Parámetros obligatorios y codificación

Topic: `parameters` · Named Routes v2.2.0

Un parámetro [user] acepta una cadena no vacía o número finito. Se codifica como un segmento; se rechazan valores ausentes o inválidos. No valida la existencia del recurso.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

Related topic IDs: optional-parameters, catch-all-parameters, mixed-parameters, helper-route
---

# Parámetros opcionales

Topic: `optional-parameters` · Named Routes v2.2.0

Usa [[id]] para un parámetro escalar opcional. Omite el valor para omitir el segmento. Las convenciones dependen del router.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

Related topic IDs: parameters, catch-all-parameters, naming
---

# Parámetros catch-all

Topic: `catch-all-parameters` · Named Routes v2.2.0

Un [...slug] obligatorio recibe un array no vacío; [[...slug]] puede omitirse. Cada elemento es un segmento distinto.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

Related topic IDs: optional-parameters, parameters
---

# Segmentos mixtos

Topic: `mixed-parameters` · Named Routes v2.2.0

Un segmento mixto combina texto literal y parámetros obligatorios. Cada parámetro tiene su propia clave.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

Related topic IDs: parameters, naming
---

# Cadenas de consulta

Topic: `query-hash` · Named Routes v2.2.0

Pasa query en las opciones. Los números y booleanos se serializan; los arrays repiten la clave; null y undefined se omiten. Los esquemas son opcionales.

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

Related topic IDs: typed-query, helper-with-query, helper-parse-query, hash-fragments
---

# Fragmentos de URL (hash)

Topic: `hash-fragments` · Named Routes v2.2.0

Usa hash para apuntar a una sección. Se elimina un # inicial y se codifica. El navegador no lo envía al servidor.

```ts
route.url("about", { hash: "team" }); // /about#team
```

Related topic IDs: query-hash, public-url
---

# Base path — URL interna y pública

Topic: `base-path` · Named Routes v2.2.0

Usa route() para la navegación nativa de Next.js, Nuxt, Vue Router, React Router y TanStack Router. Astro, SvelteKit y la generación manual incluyen la base configurada por defecto. Usa route.url() para URL públicas. defaults.includeBasePath y basePath cambian el valor predeterminado; las URL absolutas incluyen la base.

Usa la guía de despliegue del framework. La CLI reutiliza la base en .named-routes/ o acepta --base-path /app; / elimina el prefijo. No uses un CDN como base de navegación.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" });

route("about"); // /about
route.url("about"); // /about
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app" });

route("about"); // /about
route.url("about"); // /app/about
route.withDefaults({ includeBasePath: true })("about"); // /app/about
```

Related topic IDs: public-url, absolute-urls, trailing-slash, asset-base, cli-generate
---

# URL absolutas y origin

Topic: `absolute-urls` · Named Routes v2.2.0

Configura defaults.origin como origen HTTP(S) de confianza, sin credenciales ni ruta. absolute: true incluye la base. No se adivina el origen; no incluyas secretos.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

Related topic IDs: base-path, helper-canonical, helper-with-defaults
---

# Barras finales

Topic: `trailing-slash` · Named Routes v2.2.0

trailingSlash cambia el formato, no las redirecciones del servidor. Usa la misma política en el framework.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

Related topic IDs: base-path, config-defaults
---

# Nombres semánticos y grupos

Topic: `semantic-names` · Named Routes v2.2.0

Configura naming.style como semantic para usar index y show. Los nombres originales siguen siendo el valor predeterminado. Usa names para nombres estables y personalizados; las colisiones detienen la generación.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: stable-names, naming, config-naming, generated-source
---

# Nombres estables opcionales

Topic: `stable-names` · Named Routes v2.2.0

Los nombres automáticos siguen la estructura de la URL. Si una refactorización mueve una URL pública y necesitas un nombre semántico estable, actualiza el mapa opcional names. Cada ruta con alias debe existir. Las rutas no listadas conservan sus nombres automáticos. Los nombres duplicados y los errores de escritura hacen fallar la generación en lugar de crear enlaces rotos en silencio.

Un nombre personalizado reemplaza el nombre automático de esa ruta; no añade automáticamente un segundo alias. Es útil para nombres al estilo Laravel como posts.show, pero no es necesario para el uso normal.

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

Related topic IDs: semantic-names, config-naming, naming
---

# TypeScript y typedRoutes de Next

Topic: `typescript` · Named Routes v2.2.0

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
