# Base path & deployment

[Documentation](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-deployment.md) · [Português](../pt/topic-react-router-deployment.md) · [Español](../es/topic-react-router-deployment.md) · [日本語](../ja/topic-react-router-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-deployment"></a>

Set `basename` in React Router / Remix. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

Configure the same navigation prefix in namedRoutes({ routerBase: "/app" }); Vite base is not automatically the router base. If you deliberately use the same Vite base, inheritViteBase: true is an alternative. The framework itself must also serve the subpath.

In react-router.config.ts set basename: "/app". For Remix use its matching basename setting.

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

← Previous: [Navigation — useNavigate()](topic-react-router-programmatic.md) · [All topics](framework-react-router.md) · Next: [Public assets](topic-react-router-assets.md) →
