# validateOptions()

Topic: `generator-validate` · Named Routes v2.2.0

Validate generator options in Node tooling. Unknown keys or invalid values throw INVALID_CONFIG. defineConfig is the typed config authoring helper; actual generation validates the runtime input.

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

Related topic IDs: configuration, generator-api
