# Contributing

Thanks for helping! The full step-by-step guide (English and Portuguese) lives in
the documentation: **Contribute step by step** (`/docs/contributing` on the
website, or the "Contribute step by step" section of [README.md](README.md) /
[README.pt-BR.md](README.pt-BR.md)).

Quick version:

```sh
corepack enable                 # pnpm 12.16.1 is pinned in package.json
pnpm install && pnpm build
pnpm check                      # build + tests + TypeScript contracts
pnpm docs                       # after editing docs/content.json
pnpm docs:check
```

- `docs/content.json` is the single source for the website, every README and the topic
  pages in `docs/<code>/*.md`; `docs/groups.json` decides which page each section lands on.
  Edit every language together and never edit the generated Markdown by hand.
- Add regression tests for discovery or URL changes and a CHANGELOG entry.
- Do not commit generated files (`dist/`, `routes.generated.ts`, `.next/`, demo builds).
