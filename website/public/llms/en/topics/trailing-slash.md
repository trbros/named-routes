# Trailing slashes

Topic: `trailing-slash` · Named Routes v2.2.0

trailingSlash changes generated path formatting, not server redirects. Configure the same policy in your framework. Next.js inherits this option from next.config.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

Related topic IDs: base-path, config-defaults
