# このパッケージでできること

Topic: `overview` · Named Routes v2.2.0

Named Routes はフレームワークのルートから型付き URL ヘルパーを生成します。パスを組み立て直さず名前で指定できます。ルーターの置き換え、画面遷移、HTTP 通信は行いません。インストール後、フレームワークを選んでください。

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

Related topic IDs: installation, frameworks, naming, stable-names, helper-route, mcp-installation
