# File conventions & discovery

Topic: `tanstack-router-conventions` · Named Routes v2.2.0

Create `src/routes/users/$id.tsx` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** __root is skipped; index and route.tsx are the folder's route; flat (posts.$postId.tsx) and directory files mix; $param; {-$locale} is optional ([[locale]]); prefix{$id}suffix becomes a mixed segment; a lone $ is a splat named _splat ([[..._splat]]); _layout is pathless; posts_ opts out of nesting; -prefixed files and (group) folders are ignored; .lazy files belong to the same route.

**Verified.** Names come from the routeTree.gen.ts the TanStack Router plugin or CLI generates (its navigable paths); before it exists, the files are scanned. Convention tests plus examples/tanstack-router, which builds and runs with the TanStack router plugin.

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
