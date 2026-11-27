# HTTP boundaries

Topic: `vue-endpoints` · Named Routes v2.2.0

Vue Router client routes do not establish HTTP method contracts. Named Routes does not infer verbs from client components, loaders, actions or server functions. Use your server API or generated OpenAPI client; for a known named URL use route.url().

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
