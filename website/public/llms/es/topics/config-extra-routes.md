# Añadir rutas explícitas

Topic: `config-extra-routes` · Named Routes v2.2.0

extraRoutes relaciona nombres con patrones sin requerir descubrimiento. No crea páginas o endpoints.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

Related topic IDs: stable-names, manual-routes, boundaries
