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

- `docs/content.json` is the single source for the website and both README files.
  Edit English and Portuguese together and never edit the README files by hand.
- Add regression tests for discovery or URL changes and a CHANGELOG entry.
- Do not commit generated files (`dist/`, `routes.generated.ts`, `.next/`, demo builds).
