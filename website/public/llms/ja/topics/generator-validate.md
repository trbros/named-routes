# validateOptions()

Topic: `generator-validate` · Named Routes v2.2.0

Node ツールで設定を検証します。未知キーや不正な値には INVALID_CONFIG が発生します。

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

Related topic IDs: configuration, generator-api
