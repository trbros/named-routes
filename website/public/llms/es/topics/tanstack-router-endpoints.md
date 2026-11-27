# Límites de HTTP

Topic: `tanstack-router-endpoints` · Named Routes v2.2.0

Las rutas cliente de TanStack Router no establecen contratos HTTP. Usa tu API o cliente OpenAPI; route.url() genera URL conocidas.

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
