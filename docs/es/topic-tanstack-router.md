# TanStack Router: configuración

[Documentación](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router.md) · [Português](../pt/topic-tanstack-router.md) · [Español](../es/topic-tanstack-router.md) · [日本語](../ja/topic-tanstack-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router"></a>

Añade namedRoutes() junto a tanstackRouter() de @tanstack/router-plugin en vite.config. El plugin escanea src/routes (o app/routes) y escribe src/routes.generated.ts por defecto, fuera de la carpeta de rutas, así que nunca se convierte en una ruta.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react" }), namedRoutes(), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas. En el router usa createRouter({ routeTree, basepath: "/app" }).

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [tanstackRouter({ target: "react" }), namedRoutes({ routerBase: "/app" }), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

## Temas relacionados

- [Convenciones y descubrimiento](topic-tanstack-router-conventions.md)
- [Enlaces y navegación](topic-tanstack-router-navigation.md)
- [Instalación](topic-installation.md)
- [Configuración del generador](topic-configuration.md)

---

[Todos los temas](framework-tanstack-router.md) · Siguiente: [Convenciones y descubrimiento](topic-tanstack-router-conventions.md) →
