# Semantic route names and groups

Topic: `semantic-names` · Named Routes v2.2.0

Set naming.style to semantic to use index for parent pages and show for terminal required scalar parameters. Existing names remain the default. Static segment names are not translated or singularized. Set names to give individual URLs a stable semantic name (including create); update that map when the URL moves. Collisions fail generation rather than silently changing behavior.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: stable-names, naming, config-naming, generated-source
