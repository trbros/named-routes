# Base path & deployment

[Documentation](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-deployment.md) · [Português](../pt/topic-nuxt-deployment.md) · [Español](../es/topic-nuxt-deployment.md) · [日本語](../ja/topic-nuxt-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-deployment"></a>

Set `app.baseURL` in Nuxt. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

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

← Previous: [Navigation — navigateTo()](topic-nuxt-programmatic.md) · [All topics](framework-nuxt.md) · Next: [Public assets](topic-nuxt-assets.md) →
