# Nuxt: setup

[Documentation](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt.md) · [Português](../pt/topic-nuxt.md) · [Español](../es/topic-nuxt.md) · [日本語](../ja/topic-nuxt.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt"></a>

Add "@triooo/named-routes/nuxt" to modules in nuxt.config. The module names the routes Nuxt itself resolves (the pages:resolved hook), so definePageMeta({ path, alias }) and pages added by other modules are included, and regenerates as you add, move or delete pages during nuxt dev. Keep the output inside your source directory and import it with the ~ alias: with Nuxt 4 (srcDir app/) use output app/routes.generated.ts and import ~/routes.generated. Options go in named-routes.config (shared with the CLI) or under namedRoutes in nuxt.config.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
export default defineNuxtConfig({
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

## Related topics

- [File conventions & discovery](topic-nuxt-conventions.md)
- [Links & navigation](topic-nuxt-navigation.md)
- [Installation](topic-installation.md)
- [Generator configuration](topic-configuration.md)

---

[All topics](framework-nuxt.md) · Next: [File conventions & discovery](topic-nuxt-conventions.md) →
