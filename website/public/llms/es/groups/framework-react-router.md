# React Router / Remix

# React Router / Remix: configuración

Topic: `react-router` · Named Routes v2.2.0

Para el modo framework de React Router 7 y 8 (y Remix v2), añade namedRoutes() antes de reactRouter() en vite.config. Los nombres salen de react-router routes --json, la resolución del propio framework de app/routes.ts, así que se descubren tanto los archivos de flatRoutes() como las rutas declaradas con route(), index(), layout() y prefix(). Una buena salida es app/routes.generated.ts, fuera de app/routes.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas. En react-router.config.ts define basename: "/app"; en Remix usa su equivalente.

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ routerBase: "/app", output: "app/routes.generated.ts" }), reactRouter()],
});
```

Related topic IDs: react-router-conventions, react-router-navigation, installation, configuration
---

# Convenciones y descubrimiento

Topic: `react-router-conventions` · Named Routes v2.2.0

Crea `app/routes/users.$id.tsx`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** Los puntos anidan (concerts.$city.tsx es /concerts/[city]); _index es el índice; $param; ($lang) es opcional ([[lang]]); un $ solo es un splat llamado splat ([[...splat]]); los prefijos _auth son layouts sin ruta; concerts_ excluye el anidamiento; los escapes [.] conservan caracteres; una carpeta con route.tsx es una ruta y las carpetas más profundas se ignoran. Un layout y su _index comparten URL y se fusionan.

**Límites y verificación.** Sin @react-router/dev instalado, o cuando el comando falla, se recorren los archivos de flat routes anteriores y la CLI indica el motivo. Los segmentos estáticos opcionales como (beta) no se pueden nombrar; el generador se detiene con un error claro para que excluyas el archivo. Verificado con tests de convenciones y con examples/react-router, que compila y se ejecuta con React Router 8, incluida una ruta declarada con route() en app/routes.ts.

```text
app/routes/users.$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Enlaces y navegación

Topic: `react-router-navigation` · Named Routes v2.2.0

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

## Sin base path

URL en el navegador: `/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

## Con base path

URL en el navegador: `/app/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, react-router-programmatic
---

# Navegación — useNavigate()

Topic: `react-router-programmatic` · Named Routes v2.2.0

Usa dentro de un componente/setup o evento, no al inicializar el módulo. Named Routes construye la ruta; la función nativa navega.

## Sin base path

URL en el navegador: `/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

Related topic IDs: react-router-navigation, react-router-deployment, public-url
---

# Base path y despliegue

Topic: `react-router-deployment` · Named Routes v2.2.0

Configura `basename` en React Router / Remix. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

Configura el mismo prefijo en namedRoutes({ routerBase: "/app" }). La base de Vite no es automáticamente la del router; inheritViteBase: true es una alternativa si coinciden.

En react-router.config.ts define basename: "/app". En Remix usa la opción equivalente.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Archivos públicos

Topic: `react-router-assets` · Named Routes v2.2.0

Coloca un archivo en `public/images/logo.svg`. Importa asset del módulo generado. Con base /app devuelve /app/images/logo.svg. El CDN es independiente del router.

## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Enlaces localizados

Topic: `react-router-i18n` · Named Routes v2.2.0

Configura locales y pathnames en named-routes.config. El framework selecciona el idioma. Usa route.url con locale para URL públicas; no dupliques prefijos.

## Sin base path

URL en el navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## Con base path

URL en el navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# Límites de HTTP

Topic: `react-router-endpoints` · Named Routes v2.2.0

Las rutas cliente de React Router / Remix no establecen contratos HTTP. Usa tu API o cliente OpenAPI; route.url() genera URL conocidas.

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
