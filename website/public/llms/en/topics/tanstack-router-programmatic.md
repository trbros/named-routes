# Navigation — window.location.assign()

Topic: `tanstack-router-programmatic` · Named Routes v2.2.0

Use this only for full-document navigation in the browser. For SPA navigation, use TanStack Router’s own typed navigate/Link with its native route ID and params; a generated public URL is not a TanStack route ID.

## Without base path

Browser URL: `/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## With base path

Browser URL: `/app/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

Related topic IDs: tanstack-router-navigation, tanstack-router-deployment, public-url
