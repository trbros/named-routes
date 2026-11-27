# Salida y exports generados

Topic: `config-output` · Named Routes v2.2.0

output define el módulo fuera del directorio de rutas. exportNames renombra exports; importSource cambia el import. hrefs: typed es el valor predeterminado.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

Related topic IDs: generated-source, typed-hrefs
