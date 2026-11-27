# SvelteKit: setup

[Documentation](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit.md) · [Português](../pt/topic-sveltekit.md) · [Español](../es/topic-sveltekit.md) · [日本語](../ja/topic-sveltekit.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit"></a>

Add namedRoutes() before sveltekit() in vite.config. Writing the module to src/lib lets you import it as $lib/routes.generated from any component, load function or endpoint.

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## Related topics

- [File conventions & discovery](topic-sveltekit-conventions.md)
- [Links & navigation](topic-sveltekit-navigation.md)
- [Installation](topic-installation.md)
- [Generator configuration](topic-configuration.md)

---

[All topics](framework-sveltekit.md) · Next: [File conventions & discovery](topic-sveltekit-conventions.md) →
