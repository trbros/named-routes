# Nuxt: setup

Topic: `nuxt` · Named Routes v2.2.0

Add "@triooo/named-routes/nuxt" to modules in nuxt.config. The module names the routes Nuxt itself resolves (the pages:resolved hook), so definePageMeta({ path, alias }) and pages added by other modules are included, and regenerates as you add, move or delete pages during nuxt dev. Keep the output inside your source directory and import it with the ~ alias: with Nuxt 4 (srcDir app/) use output app/routes.generated.ts and import ~/routes.generated. Options go in named-routes.config (shared with the CLI) or under namedRoutes in nuxt.config.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
export default defineNuxtConfig({
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

Related topic IDs: nuxt-conventions, nuxt-navigation, installation, configuration
