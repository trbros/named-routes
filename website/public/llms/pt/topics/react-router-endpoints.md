# Limites de HTTP

Topic: `react-router-endpoints` · Named Routes v2.2.0

Rotas cliente do React Router / Remix não estabelecem contratos de métodos HTTP. O Named Routes não infere verbos de componentes, loaders, actions ou server functions. Use sua API de servidor ou cliente OpenAPI; para uma URL nomeada conhecida use route.url().

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
