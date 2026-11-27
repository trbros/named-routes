# File conventions & discovery

Topic: `nextjs-conventions` · Named Routes v2.2.0

Create `app/users/[user]/page.tsx` in your project. This produces the name `users.$user` in path naming mode. The framework is still responsible for rendering the page.

**Conventions.** app/ and pages/ (or src/app and src/pages) are scanned together. App Router: page files only; route groups and parallel slots are omitted, interceptions resolve to their canonical URL, _private folders are ignored and %5F becomes an underscore. Pages Router: index is removed and _app, _document and _error are skipped. Route Handlers and pages/api are opt-in with includeApi. appDir and pagesDir point to custom folders (or false to skip one).

**Verified.** Real Next 16 dev servers (App Router and Pages Router, with basePath and live page discovery) run in CI. Demos: examples/app-router and examples/pages-router. See also the App Router and Pages Router recipes.

```text
app/users/[user]/page.tsx
  → users.$user
  → /users/[user]
```

Related topic IDs: naming, semantic-names, discovery
