# Required parameters & encoding

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-parameters.md) · [Português](../pt/topic-parameters.md) · [Español](../es/topic-parameters.md) · [日本語](../ja/topic-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="parameters"></a>

A [user] parameter accepts a nonempty string or finite number. Values are encoded as one URL segment: a slash inside a value is not a path separator. Missing, extra or invalid parameters are rejected. The helper validates URL construction, not resource existence.

## Example

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

## Related topics

- [Optional route parameters](topic-optional-parameters.md)
- [Catch-all parameters](topic-catch-all-parameters.md)
- [Mixed route segments](topic-mixed-parameters.md)
- [route()](topic-helper-route.md)

---

← Previous: [route.url() — public URLs](topic-public-url.md) · [All topics](build-with-routes.md) · Next: [Optional route parameters](topic-optional-parameters.md) →
