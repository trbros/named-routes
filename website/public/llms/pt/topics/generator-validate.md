# validateOptions()

Topic: `generator-validate` · Named Routes v2.2.0

Valide opções do gerador em ferramentas Node. Chaves desconhecidas ou valores inválidos geram INVALID_CONFIG. defineConfig auxilia a tipagem; a geração valida a entrada em runtime.

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

Related topic IDs: configuration, generator-api
