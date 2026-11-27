# HTTP の境界

Topic: `react-router-endpoints` · Named Routes v2.2.0

React Router / Remix のクライアントルートは HTTP メソッドの契約ではありません。API または OpenAPI クライアントを利用し、既知の URL には route.url() を使います。

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
