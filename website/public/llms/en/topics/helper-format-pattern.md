# formatPattern()

Topic: `helper-format-pattern` · Named Routes v2.2.0

Serialize segment records back into the canonical bracket syntax. This is a pattern, not a concrete URL.

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
