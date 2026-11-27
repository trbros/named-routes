# Mixed route segments

Topic: `mixed-parameters` · Named Routes v2.2.0

A mixed segment combines literal text and required parameters. Every dynamic parameter still has its own typed key.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

Related topic IDs: parameters, naming
