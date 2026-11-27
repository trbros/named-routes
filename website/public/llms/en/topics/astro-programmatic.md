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
