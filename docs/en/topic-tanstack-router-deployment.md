# Base path & deployment

[Documentation](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-deployment.md) · [Português](../pt/topic-tanstack-router-deployment.md) · [Español](../es/topic-tanstack-router-deployment.md) · [日本語](../ja/topic-tanstack-router-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-deployment"></a>

Set `basepath` in TanStack Router. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

Configure the same navigation prefix in namedRoutes({ routerBase: "/app" }); Vite base is not automatically the router base. If you deliberately use the same Vite base, inheritViteBase: true is an alternative. The framework itself must also serve the subpath.

Use createRouter({ routeTree, basepath: "/app" }) in your existing router setup. Use native typed Link for its own route IDs.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

## Related topics

- [Base path — internal vs public URL](topic-base-path.md)
- [route.url() — public URLs](topic-public-url.md)
- [assetBase & CDN](topic-asset-base.md)

---

← Previous: [Navigation — window.location.assign()](topic-tanstack-router-programmatic.md) · [All topics](framework-tanstack-router.md) · Next: [Public assets](topic-tanstack-router-assets.md) →
