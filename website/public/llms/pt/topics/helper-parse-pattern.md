# parsePattern()

Topic: `helper-parse-pattern` · Named Routes v2.2.0

Interprete e valide um padrão canônico em registros de segmentos. Use em ferramentas, não para navegar.

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
