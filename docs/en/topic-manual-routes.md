# Manual routes (React, Vue, any router)

[Documentation](index.md) / [Manual routing](framework-manual.md)

[English](../en/topic-manual-routes.md) · [Português](../pt/topic-manual-routes.md) · [Español](../es/topic-manual-routes.md) · [日本語](../ja/topic-manual-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="manual-routes"></a>

When routes are declared in code (React Router <Route>, a vue-router routes array, Express-like servers), write the manifest yourself with createRoutes. You get the same name inference, parameter checking, encoding, query/hash, basePath and i18n options; only discovery is manual.

Patterns use the bracket syntax regardless of the router's own syntax: /users/:id becomes /users/[id], an optional :id? becomes [[id]], a splat * becomes [...splat] or [[...splat]]. Keep the object literal (or as const) so names and parameters are inferred.

With direct createRoutes(), includeBasePath defaults to false. For router links keep internal URLs; use route.url() for public URLs. Generator-based manual manifests include the configured base by default; set defaults.includeBasePath: false for a router that applies it itself.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /users/42
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /app/users/42
```

## Related topics

- [createRoutes()](topic-helper-create-routes.md)
- [route.url() — public URLs](topic-public-url.md)
- [Discovery & directories](topic-config-discovery.md)
- [Add explicit routes](topic-config-extra-routes.md)
- [asset() / route.asset()](topic-assets.md)

---

[All topics](framework-manual.md)
