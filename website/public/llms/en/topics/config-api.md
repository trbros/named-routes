# Enable API discovery

Topic: `config-api` · Named Routes v2.2.0

includeApi is false by default. Enable it to include endpoint URLs recognized by the adapter. Method descriptors are generated only where method declarations are statically identifiable. This is not OpenAPI generation or an authorization layer.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

Related topic IDs: endpoint-methods, helper-endpoint
