# Descubrimiento y directorios

Topic: `config-discovery` · Named Routes v2.2.0

Usa framework: auto o explícito. discovery: framework usa la tabla publicada; files fuerza el escáner. Next usa appDir/pagesDir; otros routesDir. pageExtensions y exclude personalizan la búsqueda.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

Related topic IDs: discovery, architecture, naming
