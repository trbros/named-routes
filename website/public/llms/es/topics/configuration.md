# Configuración del generador

Topic: `configuration` · Named Routes v2.2.0

La configuración es opcional. Añade solo lo necesario. El orden es .ts, .mts, .mjs, .js, .cjs, .json; usa .mjs si Node no admite TypeScript. defineConfig da autocompletado; --config elige otro archivo.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

Related topic IDs: config-discovery, config-output, config-naming, config-defaults, config-api, config-extra-routes
