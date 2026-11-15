# Contributing

Thanks for helping! The full step-by-step guide (English and Portuguese) lives in
the documentation: **Contribute step by step** (`/docs/contributing` on the
website, or the "Contribute step by step" section of [README.md](README.md) /
[README.pt-BR.md](README.pt-BR.md)).

Quick version:

```sh
corepack enable                 # pnpm 12.18.0 is pinned in package.json
pnpm install && pnpm build
pnpm format                     # Biome: format, organize imports, safe fixes
pnpm check                      # Biome lint + build + tests + TypeScript contracts
pnpm test:next && pnpm test:vite  # real Next.js and Vite
pnpm test:e2e [example...]      # every example from the packed tarball, in Chromium
                                # (once: pnpm exec playwright install chromium-headless-shell)
pnpm docs                       # after editing docs/content.json
pnpm docs:check
```

- `docs/content.json` is the single source for the website, every README and the topic
  pages in `docs/<code>/*.md`; `docs/groups.json` decides which page each section lands on.
  Edit every language together and never edit the generated Markdown by hand.
- Add regression tests for discovery or URL changes and a CHANGELOG entry under "Unreleased".
- Follow Biome (`biome.json`). A `biome-ignore` comment needs a reason, as in the
  control-character checks of `src/generator.ts`.
- Do not commit generated files (`dist/`, `routes.generated.ts`, `.next/`, demo builds).
