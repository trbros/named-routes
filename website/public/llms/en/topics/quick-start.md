# Your first named route (Next.js)

Topic: `quick-start` · Named Routes v2.2.0

A minimal Next.js setup: add the wrapper in next.config.ts, run your dev server, then follow the Next.js navigation guide. For another framework choose its own setup page.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

Related topic IDs: nextjs-navigation, frameworks, generated-source, mcp-installation
