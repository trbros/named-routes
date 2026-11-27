# Enlaces y navegación

Topic: `tanstack-router-navigation` · Named Routes v2.2.0

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

**Cuándo usarlo.** TanStack Router ya tipa su propio <Link to> por id de ruta. Usa route() donde haga falta un string simple: <a href>, redirects a otras apps, emails, sitemaps, analítica, URLs con prefijo de idioma y nombres compartidos con otros frameworks en un monorepo.

## Sin base path

URL en el navegador: `/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## Con base path

URL en el navegador: `/app/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, tanstack-router-programmatic
