# Catch-all parameters

Topic: `catch-all-parameters` · Named Routes v2.2.0

A required [...slug] takes a nonempty array; optional [[...slug]] accepts omitted or empty values. Each element is encoded as a distinct segment. Do not pass a slash-separated string as a catch-all.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

Related topic IDs: optional-parameters, parameters
