# Navigation — useNavigate()

[Documentation](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-programmatic.md) · [Português](../pt/topic-react-router-programmatic.md) · [Español](../es/topic-react-router-programmatic.md) · [日本語](../ja/topic-react-router-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-programmatic"></a>

Use this inside the framework-supported component/setup or event handler, not at module initialization. Named Routes builds the path; the native navigation function performs the transition. Configure the router base as in the deployment guide.

<a id="without-base"></a>
## Without base path

Browser URL: `/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

## Related topics

- [Links & navigation](topic-react-router-navigation.md)
- [Base path & deployment](topic-react-router-deployment.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Links & navigation](topic-react-router-navigation.md) · [All topics](framework-react-router.md) · Next: [Base path & deployment](topic-react-router-deployment.md) →
