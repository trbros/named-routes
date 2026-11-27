# Base path & deployment

[Documentation](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-deployment.md) · [Português](../pt/topic-vue-deployment.md) · [Español](../es/topic-vue-deployment.md) · [日本語](../ja/topic-vue-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-deployment"></a>

Set `history base` in Vue Router. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

Configure the same navigation prefix in namedRoutes({ routerBase: "/app" }); Vite base is not automatically the router base. If you deliberately use the same Vite base, inheritViteBase: true is an alternative. The framework itself must also serve the subpath.

In src/main.ts configure createWebHistory(import.meta.env.BASE_URL) for the Vite base shown in setup.

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

← Previous: [Navigation — router.push()](topic-vue-programmatic.md) · [All topics](framework-vue.md) · Next: [Public assets](topic-vue-assets.md) →
