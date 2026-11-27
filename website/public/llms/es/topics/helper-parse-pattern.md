# parsePattern()

Topic: `helper-parse-pattern` · Named Routes v2.2.0

Interpreta y valida un patrón en segmentos. Úsalo en herramientas.

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
