# formatPattern()

Topic: `helper-format-pattern` · Named Routes v2.2.0

Serialize registros de segmentos de volta à sintaxe canônica de colchetes. O resultado é um padrão, não uma URL concreta.

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
