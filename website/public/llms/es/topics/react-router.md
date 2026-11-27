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
