# Nuxt

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
---

# File conventions & discovery

Topic: `nuxt-conventions` · Named Routes v2.2.0

Create `app/pages/users/[id].vue` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** app/pages or pages: index.vue, [id], [[id]] optional, [...slug] (also matches an empty remainder, so it becomes [[...slug]]), (group) folders, mixed segments such as v[major]-[minor], and parent.vue + parent/ nesting merged into one route. Files starting with - are ignored. With includeApi, server/api (prefixed /api) and server/routes are scanned and .get/.post suffixes are removed.

**Limits and verification.** The module also writes .nuxt/named-routes/pages.json, so named-routes check and generate see the same routes after nuxt prepare. List it before @nuxtjs/i18n in modules, so it sees the routes before they are localized. The Vite plugin still works in Nuxt but only sees the files. Names follow this package's dotted style (users.$id), not Nuxt's own route names (users-id). Verified by convention tests and by examples/nuxt, which builds and runs with Nuxt 4, including a definePageMeta({ path }) page.

```text
app/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links & navigation

Topic: `nuxt-navigation` · Named Routes v2.2.0

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

## Without base path

Browser URL: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

## With base path

Browser URL: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, nuxt-programmatic
---

# Navigation — navigateTo()

Topic: `nuxt-programmatic` · Named Routes v2.2.0

Use this inside the framework-supported component/setup or event handler, not at module initialization. Named Routes builds the path; the native navigation function performs the transition. Configure the router base as in the deployment guide.

## Without base path

Browser URL: `/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

## With base path

Browser URL: `/app/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

Related topic IDs: nuxt-navigation, nuxt-deployment, public-url
---

# Base path & deployment

Topic: `nuxt-deployment` · Named Routes v2.2.0

Set `app.baseURL` in Nuxt. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Public assets

Topic: `nuxt-assets` · Named Routes v2.2.0

Place a file at `public/images/logo.svg`. Import asset from the same generated module as route. With /app as the effective base, asset("images/logo.svg") returns /app/images/logo.svg. CDN settings are independent of router navigation.

## Without base path

Public file URL: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## With base path

Public file URL: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Localized links

Topic: `nuxt-i18n` · Named Routes v2.2.0

Configure locales and matching pathname rules in named-routes.config. Your framework still owns locale selection and routing. Use route.url with locale for a complete public URL; when using a locale-aware native link, do not apply the same prefix twice.

**Navigation and i18n.** Use the URL with NuxtLink :to, navigateTo or useRouter().push. With @nuxtjs/i18n, configure the same locales here: strategy prefix_except_default maps to localePrefix as-needed, prefix (or prefix_and_default) to always, and no_prefix to never. Then route(name, params, { locale }) returns the localized URL; without a locale you get the internal path for localePath(). Translated paths from defineI18nRoute must be repeated in i18n.pathnames.

## Without base path

Browser URL: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## With base path

Browser URL: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# HTTP endpoints

Topic: `nuxt-endpoints` · Named Routes v2.2.0

Enable includeApi: true in named-routes.config and create `server/api/admin.get.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

```ts
export default defineEventHandler(() => ({ ok: true }));
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
