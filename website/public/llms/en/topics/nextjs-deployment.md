# Base path & deployment

Topic: `nextjs-deployment` · Named Routes v2.2.0

Set `basePath` in Next.js. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
