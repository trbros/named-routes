# File conventions & discovery

[Documentation](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-conventions.md) · [Português](../pt/topic-react-router-conventions.md) · [Español](../es/topic-react-router-conventions.md) · [日本語](../ja/topic-react-router-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-conventions"></a>

Create `app/routes/users.$id.tsx` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** Dots nest (concerts.$city.tsx is /concerts/[city]); _index is the index; $param; ($lang) is optional ([[lang]]); a lone $ is a splat named splat ([[...splat]]); _auth leading underscores are pathless layouts; concerts_ opts out of nesting; [.] escapes keep characters; a folder with route.tsx is one route and deeper folders are ignored. A layout and its _index share a URL and merge.

**Limits and verification.** Without @react-router/dev installed, or when the command fails, the flat-route files above are scanned and the CLI reports why. Optional static segments such as (beta) cannot be named; the generator stops with a clear error so you can exclude the file. Verified by convention tests and examples/react-router, which builds and runs with React Router 8, including a route declared with route() in app/routes.ts.

## Example

```text
app/routes/users.$id.tsx
  → users.$id
  → /users/[id]
```

## Related topics

- [Automatic naming rules](topic-naming.md)
- [Semantic route names and groups](topic-semantic-names.md)
- [Discovery edge cases](topic-discovery.md)

---

← Previous: [React Router / Remix: setup](topic-react-router.md) · [All topics](framework-react-router.md) · Next: [Links & navigation](topic-react-router-navigation.md) →
