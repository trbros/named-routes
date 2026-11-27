# Required parameters & encoding

Topic: `parameters` · Named Routes v2.2.0

A [user] parameter accepts a nonempty string or finite number. Values are encoded as one URL segment: a slash inside a value is not a path separator. Missing, extra or invalid parameters are rejected. The helper validates URL construction, not resource existence.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

Related topic IDs: optional-parameters, catch-all-parameters, mixed-parameters, helper-route
