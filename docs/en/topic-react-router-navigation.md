# Links & navigation

[Documentation](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-navigation.md) · [Português](../pt/topic-react-router-navigation.md) · [Español](../es/topic-react-router-navigation.md) · [日本語](../ja/topic-react-router-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-navigation"></a>

Import the generated route helper in a component outside the destination page. The example assumes the file in the conventions guide exists and uses path naming mode. Adjust the import alias to your project.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

## Related topics

- [route()](topic-helper-route.md)
- [Required parameters & encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — public URLs](topic-public-url.md)
- [Navigation — useNavigate()](topic-react-router-programmatic.md)

---

← Previous: [File conventions & discovery](topic-react-router-conventions.md) · [All topics](framework-react-router.md) · Next: [Navigation — useNavigate()](topic-react-router-programmatic.md) →
