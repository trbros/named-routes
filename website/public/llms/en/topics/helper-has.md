# route.has()

Topic: `helper-has` · Named Routes v2.2.0

`route.has(name)` checks the manifest and narrows an arbitrary string to a valid route name. It does not check whether a server currently serves the route. Use it before accessing routes selected from external input.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

Related topic IDs: helper-names, helper-pattern
