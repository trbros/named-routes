# patternParameters()

Topic: `helper-pattern-parameters` · Named Routes v2.2.0

Lista los nombres de parámetros de los segmentos. Útil en herramientas.

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
