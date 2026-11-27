# parsePattern()

Topic: `helper-parse-pattern` · Named Routes v2.2.0

Parse and validate a canonical pattern into segment records. Use it in tooling, not instead of route() for navigation.

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
