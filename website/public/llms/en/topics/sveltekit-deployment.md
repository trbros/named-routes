# Base path & deployment

Topic: `sveltekit-deployment` · Named Routes v2.2.0

Set `paths.base` in SvelteKit. The generated route() includes the base, so anchors receive /app/users/42.

Configure the same navigation prefix in namedRoutes({ routerBase: "/app" }); Vite base is not automatically the router base. If you deliberately use the same Vite base, inheritViteBase: true is an alternative. The framework itself must also serve the subpath.

In SvelteKit 2 set kit.paths.base in svelte.config.js and share that value with namedRoutes; the setup example uses SvelteKit 3. Do not pass a prefixed URL to another helper that adds the base again.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
