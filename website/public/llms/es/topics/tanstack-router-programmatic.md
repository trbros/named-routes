# Navegación — window.location.assign()

Topic: `tanstack-router-programmatic` · Named Routes v2.2.0

Úsalo para navegar el documento completo. Para SPA usa navigate/Link nativo con ID y params.

## Sin base path

URL en el navegador: `/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

Related topic IDs: tanstack-router-navigation, tanstack-router-deployment, public-url
