# Generator configuration

Topic: `configuration` · Named Routes v2.2.0

A configuration file is optional. The integrations generate routes with defaults; add only the settings you need. Files are discovered in .ts, .mts, .mjs, .js, .cjs, .json order; use .mjs if Node cannot load TypeScript configs. defineConfig gives autocomplete and rejects unknown options during generation. The CLI --config selects another file.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

Related topic IDs: config-discovery, config-output, config-naming, config-defaults, config-api, config-extra-routes
