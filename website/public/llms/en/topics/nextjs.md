# Next.js: setup

Topic: `nextjs` · Named Routes v2.2.0

Wrap next.config with withNamedRoutes from @triooo/named-routes/next. The module is generated before next dev and next build, kept current by a watcher inside next dev, and never written during next start, so read-only deployments are safe. The wrapper inherits pageExtensions, basePath, trailingSlash and the Pages Router i18n config.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

Related topic IDs: nextjs-conventions, nextjs-navigation, installation, configuration
