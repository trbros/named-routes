# File conventions & discovery

Topic: `sveltekit-conventions` · Named Routes v2.2.0

Create `src/routes/users/[id]/+page.svelte` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** src/routes with +page.svelte, +page.ts or +page.server.ts (they merge into one route); (group) folders are omitted; [id=matcher] keeps the parameter and drops the matcher; [[lang]] is optional; [...rest] matches zero or more segments ([[...rest]]) and may sit before static segments; +page@ layout resets are normal pages; [x+2f] and [u+0041] escapes are decoded. +server endpoints are opt-in with includeApi.

**Verification.** Convention tests and the examples/sveltekit integration cover file discovery and navigation; the current example uses SvelteKit 3 with Svelte 5.

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
