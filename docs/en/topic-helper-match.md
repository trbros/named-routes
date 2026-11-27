# route.match()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-match.md) · [Português](../pt/topic-helper-match.md) · [Español](../es/topic-helper-match.md) · [日本語](../ja/topic-helper-match.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-match"></a>

`route.match(url, options?)` recognizes a known path and returns a discriminated result with name, pattern, params, locale and raw query, or null. Use `{ basePath: true }` when the input includes the configured base. Parameters narrow by route name; use parseQuery for schema-based conversion. Matching is not authorization.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## Related topics

- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Previous: [Reverse routing and active routes](topic-reverse-routing.md) · [All topics](route-helpers.md) · Next: [route.is()](topic-helper-is.md) →
