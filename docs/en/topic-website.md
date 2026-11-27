# Documentation website

[Documentation](index.md) / [Project & releases](project.md)

[English](../en/topic-website.md) · [Português](../pt/topic-website.md) · [Español](../es/topic-website.md) · [日本語](../ja/topic-website.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="website"></a>

This documentation is a Next.js app in website/. It is the project's public site, built with the package itself: every internal link uses route(), the playground and destination pages are real App Router routes, and the English, Portuguese, Spanish and Japanese content comes from the same docs/content.json that renders the README files.

The landing page shows each supported framework as a line on a transit map, a departure board fed with real generator output, a compatibility table and an install journey. Motion is finite or user-driven, pauses off screen, and is disabled by prefers-reduced-motion.

To deploy on Vercel, create a project with Root Directory set to website and keep "Include files outside the root directory" enabled. website/vercel.json installs the repository, builds the package and then builds the site. No environment variables are required.

## Example

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```

---

[All topics](project.md) · Next: [Try it: framework demos](topic-demos.md) →
