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
