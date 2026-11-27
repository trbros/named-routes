# React Router / Remix

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
---

# File conventions & discovery

Topic: `react-router-conventions` · Named Routes v2.2.0

Create `app/routes/users.$id.tsx` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** Dots nest (concerts.$city.tsx is /concerts/[city]); _index is the index; $param; ($lang) is optional ([[lang]]); a lone $ is a splat named splat ([[...splat]]); _auth leading underscores are pathless layouts; concerts_ opts out of nesting; [.] escapes keep characters; a folder with route.tsx is one route and deeper folders are ignored. A layout and its _index share a URL and merge.

**Limits and verification.** Without @react-router/dev installed, or when the command fails, the flat-route files above are scanned and the CLI reports why. Optional static segments such as (beta) cannot be named; the generator stops with a clear error so you can exclude the file. Verified by convention tests and examples/react-router, which builds and runs with React Router 8, including a route declared with route() in app/routes.ts.

```text
app/routes/users.$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links & navigation

Topic: `react-router-navigation` · Named Routes v2.2.0

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

## Without base path

Browser URL: `/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

## With base path

Browser URL: `/app/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, react-router-programmatic
---

# Navigation — useNavigate()

Topic: `react-router-programmatic` · Named Routes v2.2.0

Use this inside the framework-supported component/setup or event handler, not at module initialization. Named Routes builds the path; the native navigation function performs the transition. Configure the router base as in the deployment guide.

## Without base path

Browser URL: `/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

## With base path

Browser URL: `/app/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

Related topic IDs: react-router-navigation, react-router-deployment, public-url
---

# Base path & deployment

Topic: `react-router-deployment` · Named Routes v2.2.0

Set `basename` in React Router / Remix. The generated route() returns an internal path; route.url() gives the public path /app/users/42.

Configure the same navigation prefix in namedRoutes({ routerBase: "/app" }); Vite base is not automatically the router base. If you deliberately use the same Vite base, inheritViteBase: true is an alternative. The framework itself must also serve the subpath.

In react-router.config.ts set basename: "/app". For Remix use its matching basename setting.

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

Topic: `react-router-assets` · Named Routes v2.2.0

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

Topic: `react-router-i18n` · Named Routes v2.2.0

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

Topic: `react-router-endpoints` · Named Routes v2.2.0

React Router / Remix client routes do not establish HTTP method contracts. Named Routes does not infer verbs from client components, loaders, actions or server functions. Use your server API or generated OpenAPI client; for a known named URL use route.url().

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
