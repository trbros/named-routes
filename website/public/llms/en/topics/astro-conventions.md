# File conventions & discovery

Topic: `astro-conventions` · Named Routes v2.2.0

Create `src/pages/users/[id].astro` in your project. This produces the name `users.$id` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** src/pages with .astro, .md, .mdx, .markdown and .html pages; files and folders starting with _ are private; [id]; [...slug] matches zero or more segments ([[...slug]]); mixed segments such as [lang]-[version]. .ts/.js endpoints are opt-in with includeApi and keep their inner extension (api/data.json.ts is /api/data.json).

**Limits and verification.** Static builds still need getStaticPaths in dynamic pages: the package builds URLs, it does not enumerate parameters. Verified by convention tests and examples/astro, which builds and runs with Astro 5.

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
