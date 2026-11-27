# 必須パラメータとエンコード

Topic: `parameters` · Named Routes v2.2.0

[user] は空でない文字列または有限の数値です。値は単一セグメントとしてエンコードされます。リソースの存在確認は行いません。

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

Related topic IDs: optional-parameters, catch-all-parameters, mixed-parameters, helper-route
