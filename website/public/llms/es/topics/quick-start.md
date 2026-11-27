# Tu primera ruta con nombre (Next.js)

Topic: `quick-start` · Named Routes v2.2.0

Configuración mínima de Next.js: añade el wrapper en next.config.ts, inicia el servidor y sigue la guía de navegación de Next.js. Para otro framework usa su guía.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

Related topic IDs: nextjs-navigation, frameworks, generated-source, mcp-installation
