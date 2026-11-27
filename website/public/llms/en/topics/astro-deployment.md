# Base path & deployment

Topic: `astro-deployment` · Named Routes v2.2.0

Set `base` in Astro. The generated route() includes the base, so anchors receive /app/users/42.

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
