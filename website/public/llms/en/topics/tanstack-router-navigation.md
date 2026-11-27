# Links & navigation

Topic: `tanstack-router-navigation` · Named Routes v2.2.0

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

**When to use it.** TanStack Router already types its own <Link to> by route id. Use route() where a plain string is needed: <a href>, redirects to other apps, emails, sitemaps, analytics, locale-prefixed URLs and names shared with other frameworks in a monorepo.

## Without base path

Browser URL: `/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## With base path

Browser URL: `/app/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, tanstack-router-programmatic
