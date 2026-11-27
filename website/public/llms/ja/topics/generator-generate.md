# generateRoutes()

Topic: `generator-generate` · Named Routes v2.2.0

Node ツール専用です。生成モジュールを書き込みます。check: true なら変更せず鮮度を検査します。

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

Related topic IDs: generator-api, cli-generate, cli-check
