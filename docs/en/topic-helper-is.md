# route.is()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-is.md) · [Português](../pt/topic-helper-is.md) · [Español](../es/topic-helper-is.md) · [日本語](../ja/topic-helper-is.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-is"></a>

`route.is(name, url, options?)` tests whether a URL matches the named route. Use `exact: false` to include matching descendants and `{ basePath: true }` for public URLs containing the base. This is useful for active navigation, not access control. Unknown route names are rejected.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

## Related topics

- [route.match()](topic-helper-match.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)

---

← Previous: [route.match()](topic-helper-match.md) · [All topics](route-helpers.md) · Next: [route.breadcrumbs()](topic-helper-breadcrumbs.md) →
