# SvelteKit: setup

Topic: `sveltekit` · Named Routes v2.2.0

Add namedRoutes() before sveltekit() in vite.config. Writing the module to src/lib lets you import it as $lib/routes.generated from any component, load function or endpoint.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [
    namedRoutes({ output: "src/lib/routes.generated.ts" }),
    sveltekit(),
  ],
});
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes. This configuration is for SvelteKit 3. On SvelteKit 2 set kit.paths.base in svelte.config.js and share the prefix with routerBase.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
const base = "/app";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: base, output: "src/lib/routes.generated.ts" }),
    sveltekit({ paths: { base } }),
  ],
});
```

Related topic IDs: sveltekit-conventions, sveltekit-navigation, installation, configuration
