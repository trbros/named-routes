# Navegação — Astro.redirect()

Topic: `astro-programmatic` · Named Routes v2.2.0

No frontmatter de uma página Astro renderizada no servidor, retorne Astro.redirect com a URL pública. O framework controla a resposta; a saída estática tem semântica diferente.

## Sem base path

URL no navegador: `/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## Com base path

URL no navegador: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

Related topic IDs: astro-navigation, astro-deployment, public-url
