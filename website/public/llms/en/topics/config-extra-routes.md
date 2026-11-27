# Add explicit routes

Topic: `config-extra-routes` · Named Routes v2.2.0

extraRoutes maps a chosen name to a canonical pattern for a rewrite destination, manual manifest or external route known to your application. Unlike names, the URL need not be discovered. The package does not create a page or server route.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

Related topic IDs: stable-names, manual-routes, boundaries
