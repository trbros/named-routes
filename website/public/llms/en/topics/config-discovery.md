# Discovery & directories

Topic: `config-discovery` · Named Routes v2.2.0

Use framework: auto (default) or an explicit framework. discovery: framework reads a published table where supported; files forces the convention scanner. Next has router, appDir and pagesDir; other frameworks use routesDir. pageExtensions and exclude customize scanning. root is relative to the config file when configured there.

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
