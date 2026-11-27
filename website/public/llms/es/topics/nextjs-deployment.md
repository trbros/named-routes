# Base path y despliegue

Topic: `nextjs-deployment` · Named Routes v2.2.0

Configura `basePath` en Next.js. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
