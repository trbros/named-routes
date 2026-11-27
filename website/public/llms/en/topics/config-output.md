# Generated output & exports

Topic: `config-output` · Named Routes v2.2.0

output defaults to src/routes.generated.ts; use .ts, .mts, .js or .mjs outside a routable directory. exportNames renames generated exports; importSource changes the runtime import specifier. hrefs: typed is the default; string restores plain string return types.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

Related topic IDs: generated-source, typed-hrefs
