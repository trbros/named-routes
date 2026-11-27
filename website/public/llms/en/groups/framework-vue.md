# Vue Router

# Vue Router: setup

Topic: `vue` · Named Routes v2.2.0

For Vue apps with file-based routing (Vue Router 5 vue-router/vite, or unplugin-vue-router on Vue Router 4), add namedRoutes() before VueRouter() and vue() in vite.config. users/_parent.vue is treated as the non-matchable parent of users/, as in Vue Router 5.0.3+. The framework is detected from unplugin-vue-router or vue-router; src/pages is scanned unless routesDir says otherwise. Apps that declare a routes array by hand should use a manual manifest instead.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "vite";
import VueRouter from "vue-router/vite";
import vue from "@vitejs/plugin-vue";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes(), VueRouter(), vue()],
});
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes. In src/main.ts use createWebHistory(import.meta.env.BASE_URL).

```ts
import { defineConfig } from "vite";
import VueRouter from "vue-router/vite";
import vue from "@vitejs/plugin-vue";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [namedRoutes({ inheritViteBase: true }), VueRouter(), vue()],
});
```

Related topic IDs: vue-conventions, vue-navigation, installation, configuration
---

# File conventions & discovery

Topic: `vue-conventions` · Named Routes v2.2.0

Create `src/pages/users/[id].vue` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** index.vue and (name).vue are index routes; dots nest (users.edit.vue is /users/edit); [id] and [[id]]; [id]+ is a one-or-more repeatable param ([...id]) and [[id]]+ zero-or-more ([[...id]]); [...path] also matches an empty remainder ([[...path]]); (group) folders are omitted; parent.vue + parent/ nesting merges; mixed segments like v[major]-[minor] work.

**Verified.** Names come from the typed-router.d.ts that Vue Router 5 writes (its dts option), so definePage({ path }) overrides are named by the URL they serve; before it exists, the files are scanned. A real Vite dev server with these conventions runs in CI, and examples/vue builds, runs and is driven in a browser with Vue Router 5 (vue-router/vite), including a users/_parent.vue layout and a definePage({ path }) page.

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links & navigation

Topic: `vue-navigation` · Named Routes v2.2.0

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

## Without base path

Browser URL: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

## With base path

Browser URL: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, vue-programmatic
---

# Navigation — router.push()

Topic: `vue-programmatic` · Named Routes v2.2.0

Use this inside the framework-supported component/setup or event handler, not at module initialization. Named Routes builds the path; the native navigation function performs the transition. Configure the router base as in the deployment guide.

## Without base path

Browser URL: `/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## With base path

Browser URL: `/app/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

Related topic IDs: vue-navigation, vue-deployment, public-url
---

# Base path & deployment

Topic: `vue-deployment` · Named Routes v2.2.0

Set `history base` in Vue Router. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

Configure the same navigation prefix in namedRoutes({ routerBase: "/app" }); Vite base is not automatically the router base. If you deliberately use the same Vite base, inheritViteBase: true is an alternative. The framework itself must also serve the subpath.

In src/main.ts configure createWebHistory(import.meta.env.BASE_URL) for the Vite base shown in setup.

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

Topic: `vue-assets` · Named Routes v2.2.0

Place a file at `public/images/logo.svg`. Import asset from the same generated module as route. With /app as the effective base, asset("images/logo.svg") returns /app/images/logo.svg. CDN settings are independent of router navigation.

## Without base path

Public file URL: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## With base path

Public file URL: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Localized links

Topic: `vue-i18n` · Named Routes v2.2.0

Configure locales and matching pathname rules in named-routes.config. Your framework still owns locale selection and routing. Use route.url with locale for a complete public URL; when using a locale-aware native link, do not apply the same prefix twice.

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

# HTTP boundaries

Topic: `vue-endpoints` · Named Routes v2.2.0

Vue Router client routes do not establish HTTP method contracts. Named Routes does not infer verbs from client components, loaders, actions or server functions. Use your server API or generated OpenAPI client; for a known named URL use route.url().

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
