# route.asset()

Topic: `helper-route-asset` · Named Routes v2.2.0

route.asset está disponible en todos los helpers. El módulo generado también exporta asset directamente; comparten configuración y manifiesto.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" });
route.asset("logo.svg"); // /logo.svg
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" }, { basePath: "/app" });
route.asset("logo.svg"); // /app/logo.svg
```

Related topic IDs: assets, asset-base
