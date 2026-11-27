# Base path & deployment

[Documentation](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-deployment.md) · [Português](../pt/topic-astro-deployment.md) · [Español](../es/topic-astro-deployment.md) · [日本語](../ja/topic-astro-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-deployment"></a>

Set `base` in Astro. The generated route() includes the base, so anchors receive /app/users/42.

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
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

## Related topics

- [Base path — internal vs public URL](topic-base-path.md)
- [route.url() — public URLs](topic-public-url.md)
- [assetBase & CDN](topic-asset-base.md)

---

← Previous: [Navigation — Astro.redirect()](topic-astro-programmatic.md) · [All topics](framework-astro.md) · Next: [Public assets](topic-astro-assets.md) →
