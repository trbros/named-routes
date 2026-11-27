# route.breadcrumbs()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-breadcrumbs.md) · [Português](../pt/topic-helper-breadcrumbs.md) · [Español](../es/topic-helper-breadcrumbs.md) · [日本語](../ja/topic-helper-breadcrumbs.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-breadcrumbs"></a>

`route.breadcrumbs(url, options?)` returns known matches for ancestor paths, ordered from root to leaf. It does not invent missing routes or human-readable labels; map names to translated labels in your application. Supply `{ basePath: true }` for URLs containing the base.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.breadcrumbs("/app/users/42", { basePath: true }).map((item) => item.name);
// ["home", "users", "users.show"]
```

## Related topics

- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)

---

← Previous: [route.is()](topic-helper-is.md) · [All topics](route-helpers.md) · Next: [route.has()](topic-helper-has.md) →
