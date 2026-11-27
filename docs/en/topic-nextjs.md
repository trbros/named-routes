# Next.js: setup

[Documentation](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs.md) · [Português](../pt/topic-nextjs.md) · [Español](../es/topic-nextjs.md) · [日本語](../ja/topic-nextjs.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs"></a>

Wrap next.config with withNamedRoutes from @triooo/named-routes/next. The module is generated before next dev and next build, kept current by a watcher inside next dev, and never written during next start, so read-only deployments are safe. The wrapper inherits pageExtensions, basePath, trailingSlash and the Pages Router i18n config.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

## Related topics

- [File conventions & discovery](topic-nextjs-conventions.md)
- [Links & navigation](topic-nextjs-navigation.md)
- [Installation](topic-installation.md)
- [Generator configuration](topic-configuration.md)

---

[All topics](framework-nextjs.md) · Next: [File conventions & discovery](topic-nextjs-conventions.md) →
