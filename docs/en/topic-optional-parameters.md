# Optional route parameters

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-optional-parameters.md) · [Português](../pt/topic-optional-parameters.md) · [Español](../es/topic-optional-parameters.md) · [日本語](../ja/topic-optional-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="optional-parameters"></a>

Use [[id]] for an optional scalar. Omit the value to omit its segment. In a generated application, use the framework’s equivalent convention; support differs by router.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

## Related topics

- [Required parameters & encoding](topic-parameters.md)
- [Catch-all parameters](topic-catch-all-parameters.md)
- [Automatic naming rules](topic-naming.md)

---

← Previous: [Required parameters & encoding](topic-parameters.md) · [All topics](build-with-routes.md) · Next: [Catch-all parameters](topic-catch-all-parameters.md) →
