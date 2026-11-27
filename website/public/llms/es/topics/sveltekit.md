# SvelteKit: configuración

Topic: `sveltekit` · Named Routes v2.2.0

Añade namedRoutes() antes de sveltekit() en vite.config. Escribir el módulo en src/lib te permite importarlo como $lib/routes.generated desde cualquier componente, función load o endpoint.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [
    namedRoutes({ output: "src/lib/routes.generated.ts" }),
    sveltekit(),
  ],
});
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas. Esta configuración es para SvelteKit 3. En SvelteKit 2 configura kit.paths.base y comparte el prefijo con routerBase.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
const base = "/app";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: base, output: "src/lib/routes.generated.ts" }),
    sveltekit({ paths: { base } }),
  ],
});
```

Related topic IDs: sveltekit-conventions, sveltekit-navigation, installation, configuration
