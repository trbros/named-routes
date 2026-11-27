# Your first named route (Next.js)

[Documentation](index.md) / [Start here](getting-started.md)

[English](../en/topic-quick-start.md) · [Português](../pt/topic-quick-start.md) · [Español](../es/topic-quick-start.md) · [日本語](../ja/topic-quick-start.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="quick-start"></a>

A minimal Next.js setup: add the wrapper in next.config.ts, run your dev server, then follow the Next.js navigation guide. For another framework choose its own setup page.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

## Related topics

- [Links & navigation](topic-nextjs-navigation.md)
- [Choose your framework](topic-frameworks.md)
- [Read the generated manifest](topic-generated-source.md)
- [Install and start MCP](topic-mcp-installation.md)

---

← Previous: [Choose your framework](topic-frameworks.md) · [All topics](getting-started.md) · Next: [Automatic naming rules](topic-naming.md) →
