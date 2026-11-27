# Base path & deployment

[Documentation](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-deployment.md) · [Português](../pt/topic-nextjs-deployment.md) · [Español](../es/topic-nextjs-deployment.md) · [日本語](../ja/topic-nextjs-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-deployment"></a>

Set `basePath` in Next.js. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

## Related topics

- [Base path — internal vs public URL](topic-base-path.md)
- [route.url() — public URLs](topic-public-url.md)
- [assetBase & CDN](topic-asset-base.md)

---

← Previous: [Links & navigation](topic-nextjs-navigation.md) · [All topics](framework-nextjs.md) · Next: [Public assets](topic-nextjs-assets.md) →
