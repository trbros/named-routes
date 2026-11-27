# formatPattern()

Topic: `helper-format-pattern` · Named Routes v2.2.0

Serializa los segmentos a la sintaxis canónica. No es una URL concreta.

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
