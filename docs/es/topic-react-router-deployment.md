# Base path y despliegue

[Documentación](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-deployment.md) · [Português](../pt/topic-react-router-deployment.md) · [Español](../es/topic-react-router-deployment.md) · [日本語](../ja/topic-react-router-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-deployment"></a>

Configura `basename` en React Router / Remix. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

Configura el mismo prefijo en namedRoutes({ routerBase: "/app" }). La base de Vite no es automáticamente la del router; inheritViteBase: true es una alternativa si coinciden.

En react-router.config.ts define basename: "/app". En Remix usa la opción equivalente.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

## Temas relacionados

- [Base path — URL interna y pública](topic-base-path.md)
- [route.url() — URL públicas](topic-public-url.md)
- [assetBase y CDN](topic-asset-base.md)

---

← Anterior: [Navegación — useNavigate()](topic-react-router-programmatic.md) · [Todos los temas](framework-react-router.md) · Siguiente: [Archivos públicos](topic-react-router-assets.md) →
