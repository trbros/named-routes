# Astro

# Astro: setup

Topic: `astro` · Named Routes v2.2.0

Register the native integration from @triooo/named-routes/astro in astro.config integrations. It inherits Astro’s final base. Remove namedRoutes() from vite.plugins if migrating from the old configuration. The generated module defaults to src/routes.generated.ts and is usable in .astro frontmatter, islands and endpoints.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

Related topic IDs: astro-conventions, astro-navigation, installation, configuration
---

# File conventions & discovery

Topic: `astro-conventions` · Named Routes v2.2.0

Create `src/pages/users/[id].astro` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** src/pages with .astro, .md, .mdx, .markdown and .html pages; files and folders starting with _ are private; [id]; [...slug] matches zero or more segments ([[...slug]]); mixed segments such as [lang]-[version]. .ts/.js endpoints are opt-in with includeApi and keep their inner extension (api/data.json.ts is /api/data.json).

**Limits and verification.** Static builds still need getStaticPaths in dynamic pages: the package builds URLs, it does not enumerate parameters. Verified by convention tests and examples/astro, which builds and runs with Astro 5.

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links & navigation

Topic: `astro-navigation` · Named Routes v2.2.0

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

## Without base path

Browser URL: `/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## With base path

Browser URL: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, astro-programmatic
---

# Navigation — Astro.redirect()

Topic: `astro-programmatic` · Named Routes v2.2.0

In a server-rendered Astro page frontmatter, return Astro.redirect with the public URL. The framework controls the response; static output has different redirect semantics.

## Without base path

Browser URL: `/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## With base path

Browser URL: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

Related topic IDs: astro-navigation, astro-deployment, public-url
---

# Base path & deployment

Topic: `astro-deployment` · Named Routes v2.2.0

Set `base` in Astro. The generated route() includes the base, so anchors receive /app/users/42.

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

Topic: `astro-assets` · Named Routes v2.2.0

Place a file at `public/images/logo.svg`. Import asset from the same generated module as route. With /app as the effective base, asset("images/logo.svg") returns /app/images/logo.svg. CDN settings are independent of router navigation.

## Without base path

Public file URL: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## With base path

Public file URL: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Localized links

Topic: `astro-i18n` · Named Routes v2.2.0

Configure locales and matching pathname rules in named-routes.config. Your framework still owns locale selection and routing. Use route.url with locale for a complete public URL; when using a locale-aware native link, do not apply the same prefix twice.

**i18n.** Astro's physical locale folders (src/pages/pt/about.astro) merge into the same named route as src/pages/about.astro when the locale is listed in i18n.locales. prefixDefaultLocale: false matches localePrefix as-needed and true matches always.

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

Topic: `astro-endpoints` · Named Routes v2.2.0

Enable includeApi: true in named-routes.config and create `src/pages/api/admin.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
