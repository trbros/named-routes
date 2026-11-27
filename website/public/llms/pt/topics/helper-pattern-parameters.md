# patternParameters()

Topic: `helper-pattern-parameters` · Named Routes v2.2.0

Liste nomes dos parâmetros dos segmentos analisados. Útil para inspecionar manifestos e gerar ferramentas.

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
