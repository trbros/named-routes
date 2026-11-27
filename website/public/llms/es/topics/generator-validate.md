# validateOptions()

Topic: `generator-validate` · Named Routes v2.2.0

Valida opciones en Node. Claves desconocidas generan INVALID_CONFIG. defineConfig ayuda con tipos.

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

Related topic IDs: configuration, generator-api
