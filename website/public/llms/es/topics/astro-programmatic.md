# Navegación — Astro.redirect()

Topic: `astro-programmatic` · Named Routes v2.2.0

En el frontmatter SSR de Astro devuelve Astro.redirect con la URL pública. La salida estática tiene otra semántica.

## Sin base path

URL en el navegador: `/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## Con base path

URL en el navegador: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

Related topic IDs: astro-navigation, astro-deployment, public-url
