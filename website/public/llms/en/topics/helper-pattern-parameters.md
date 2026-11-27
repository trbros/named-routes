# patternParameters()

Topic: `helper-pattern-parameters` · Named Routes v2.2.0

List parameter names from parsed segments. This is useful when inspecting a manifest or generating tooling.

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
