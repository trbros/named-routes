# parsePattern()

Topic: `helper-parse-pattern` · Named Routes v2.2.0

パターンを検証しセグメントに変換します。ツール向けの関数です。

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
