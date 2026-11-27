# React Router / Remix: setup

Topic: `react-router` · Named Routes v2.2.0

For React Router 7 and 8 framework mode (and Remix v2), add namedRoutes() before reactRouter() in vite.config. Names come from react-router routes --json, the framework's own resolution of app/routes.ts, so flatRoutes() files and routes declared with route(), index(), layout() and prefix() are all discovered. A good output is app/routes.generated.ts, outside app/routes.

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

Related topic IDs: react-router-conventions, react-router-navigation, installation, configuration
