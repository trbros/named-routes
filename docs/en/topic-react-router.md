# React Router / Remix: setup

[Documentation](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router.md) · [Português](../pt/topic-react-router.md) · [Español](../es/topic-react-router.md) · [日本語](../ja/topic-react-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router"></a>

For React Router 7 and 8 framework mode (and Remix v2), add namedRoutes() before reactRouter() in vite.config. Names come from react-router routes --json, the framework's own resolution of app/routes.ts, so flatRoutes() files and routes declared with route(), index(), layout() and prefix() are all discovered. A good output is app/routes.generated.ts, outside app/routes.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes. In react-router.config.ts set basename: "/app"; Remix uses its matching basename setting.

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ routerBase: "/app", output: "app/routes.generated.ts" }), reactRouter()],
});
```

## Related topics

- [File conventions & discovery](topic-react-router-conventions.md)
- [Links & navigation](topic-react-router-navigation.md)
- [Installation](topic-installation.md)
- [Generator configuration](topic-configuration.md)

---

[All topics](framework-react-router.md) · Next: [File conventions & discovery](topic-react-router-conventions.md) →
