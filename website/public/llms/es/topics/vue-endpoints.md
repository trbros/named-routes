# Límites de HTTP

Topic: `vue-endpoints` · Named Routes v2.2.0

Las rutas cliente de Vue Router no establecen contratos HTTP. Usa tu API o cliente OpenAPI; route.url() genera URL conocidas.

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
