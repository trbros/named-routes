# SvelteKit

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
---

# File conventions & discovery

Topic: `sveltekit-conventions` · Named Routes v2.2.0

Create `src/routes/users/[id]/+page.svelte` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** src/routes with +page.svelte, +page.ts or +page.server.ts (they merge into one route); (group) folders are omitted; [id=matcher] keeps the parameter and drops the matcher; [[lang]] is optional; [...rest] matches zero or more segments ([[...rest]]) and may sit before static segments; +page@ layout resets are normal pages; [x+2f] and [u+0041] escapes are decoded. +server endpoints are opt-in with includeApi.

**Verification.** Convention tests and the examples/sveltekit integration cover file discovery and navigation; the current example uses SvelteKit 3 with Svelte 5.

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links & navigation

Topic: `sveltekit-navigation` · Named Routes v2.2.0

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

## Without base path

Browser URL: `/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## With base path

Browser URL: `/app/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, sveltekit-programmatic
---

# Navigation — goto()

Topic: `sveltekit-programmatic` · Named Routes v2.2.0

Use this inside the framework-supported component/setup or event handler, not at module initialization. Named Routes builds the path; the native navigation function performs the transition. Configure the router base as in the deployment guide.

## Without base path

Browser URL: `/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

## With base path

Browser URL: `/app/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

Related topic IDs: sveltekit-navigation, sveltekit-deployment, public-url
---

# Base path & deployment

Topic: `sveltekit-deployment` · Named Routes v2.2.0

Set `paths.base` in SvelteKit. The generated route() includes the base, so anchors receive /app/users/42.

Configure the same navigation prefix in namedRoutes({ routerBase: "/app" }); Vite base is not automatically the router base. If you deliberately use the same Vite base, inheritViteBase: true is an alternative. The framework itself must also serve the subpath.

In SvelteKit 2 set kit.paths.base in svelte.config.js and share that value with namedRoutes; the setup example uses SvelteKit 3. Do not pass a prefixed URL to another helper that adds the base again.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Public assets

Topic: `sveltekit-assets` · Named Routes v2.2.0

Place a file at `static/images/logo.svg`. Import asset from the same generated module as route. With /app as the effective base, asset("images/logo.svg") returns /app/images/logo.svg. CDN settings are independent of router navigation.

## Without base path

Public file URL: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## With base path

Public file URL: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Localized links

Topic: `sveltekit-i18n` · Named Routes v2.2.0

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

# HTTP endpoints

Topic: `sveltekit-endpoints` · Named Routes v2.2.0

Enable includeApi: true in named-routes.config and create `src/routes/api/admin/+server.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
