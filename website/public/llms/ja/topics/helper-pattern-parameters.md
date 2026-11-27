# patternParameters()

Topic: `helper-pattern-parameters` · Named Routes v2.2.0

解析済みセグメントからパラメータ名を列挙します。

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
