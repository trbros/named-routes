# formatPattern()

Topic: `helper-format-pattern` · Named Routes v2.2.0

セグメントを正規のブラケット構文に戻します。具体的な URL ではありません。

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
