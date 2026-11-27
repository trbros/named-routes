# createRoutes()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-create-routes.md) · [Português](../pt/topic-helper-create-routes.md) · [Español](../es/topic-helper-create-routes.md) · [日本語](../ja/topic-helper-create-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-create-routes"></a>

Create an independent, frozen helper from a name-to-pattern manifest. Keep literal types for autocomplete. Defaults apply to the returned helper; no filesystem or framework imports are required in the browser.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

## Related topics

- [Manual routes (React, Vue, any router)](topic-manual-routes.md)
- [route()](topic-helper-route.md)
- [route.withDefaults()](topic-helper-with-defaults.md)

---

← Previous: [route.pattern()](topic-helper-pattern.md) · [All topics](route-helpers.md) · Next: [route.withDefaults()](topic-helper-with-defaults.md) →
