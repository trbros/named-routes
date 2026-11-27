# React Router / Remix: configuración

[Documentación](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router.md) · [Português](../pt/topic-react-router.md) · [Español](../es/topic-react-router.md) · [日本語](../ja/topic-react-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router"></a>

Para el modo framework de React Router 7 y 8 (y Remix v2), añade namedRoutes() antes de reactRouter() en vite.config. Los nombres salen de react-router routes --json, la resolución del propio framework de app/routes.ts, así que se descubren tanto los archivos de flatRoutes() como las rutas declaradas con route(), index(), layout() y prefix(). Una buena salida es app/routes.generated.ts, fuera de app/routes.

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## Temas relacionados

- [Convenciones y descubrimiento](topic-react-router-conventions.md)
- [Enlaces y navegación](topic-react-router-navigation.md)
- [Instalación](topic-installation.md)
- [Configuración del generador](topic-configuration.md)

---

[Todos los temas](framework-react-router.md) · Siguiente: [Convenciones y descubrimiento](topic-react-router-conventions.md) →
