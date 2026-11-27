# route.endpoint()

[Documentation](index.md) / [HTTP endpoints](http-endpoints.md)

[English](../en/topic-helper-endpoint.md) · [Português](../pt/topic-helper-endpoint.md) · [Español](../es/topic-helper-endpoint.md) · [日本語](../ja/topic-helper-endpoint.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-endpoint"></a>

Bind an explicit HTTP method to a known route. Calling the returned function produces a readonly descriptor with method and URL; it does not validate server capabilities or execute a request. Prefer generated api descriptors when discovery knows the methods.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/api/users/42" }
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" }, { basePath: "/app" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/app/api/users/42" }
```

## Related topics

- [Generated api — HTTP descriptors](topic-endpoint-methods.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Generated api — HTTP descriptors](topic-endpoint-methods.md) · [All topics](http-endpoints.md) · Next: [Dynamic endpoint parameters](topic-endpoint-dynamic.md) →
