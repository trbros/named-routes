# Astro: configuración

Topic: `astro` · Named Routes v2.2.0

Registra la integración nativa de @triooo/named-routes/astro en integrations de astro.config. Hereda el base final de Astro. Si migras desde la configuración anterior, quita namedRoutes() de vite.plugins. El módulo se genera en src/routes.generated.ts y puede usarse en frontmatter .astro, islas y endpoints.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

Related topic IDs: astro-conventions, astro-navigation, installation, configuration
