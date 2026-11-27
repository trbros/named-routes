# Manual routing

# Manual routes (React, Vue, any router)

Topic: `manual-routes` · Named Routes v2.2.0

When routes are declared in code (React Router <Route>, a vue-router routes array, Express-like servers), write the manifest yourself with createRoutes. You get the same name inference, parameter checking, encoding, query/hash, basePath and i18n options; only discovery is manual.

Patterns use the bracket syntax regardless of the router's own syntax: /users/:id becomes /users/[id], an optional :id? becomes [[id]], a splat * becomes [...splat] or [[...splat]]. Keep the object literal (or as const) so names and parameters are inferred.

With direct createRoutes(), includeBasePath defaults to false. For router links keep internal URLs; use route.url() for public URLs. Generator-based manual manifests include the configured base by default; set defaults.includeBasePath: false for a router that applies it itself.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /users/42
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: helper-create-routes, public-url, config-discovery, config-extra-routes, assets
