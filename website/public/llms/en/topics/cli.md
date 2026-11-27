# CLI and CI

Topic: `cli` · Named Routes v2.2.0

The binary is named-routes. generate (default) writes the manifest. list prints discovered entries as JSON. check compares without writing and exits with code 1 when stale. watch generates initially and keeps the module current until SIGINT/SIGTERM (file events with a rescan, or polling with --watch-mode poll). init writes named-routes.config.mjs for the detected framework and never overwrites an existing config. doctor diagnoses the project without writing (see Diagnostics).

Flags: --root <directory>, --config <file>, --framework <name>, --output <file>, --routes-dir <dir>, --router <auto|app|pages>, --api, --watch-interval <ms>, --watch-mode <auto|native|poll>, --json, --strict, --no-color and --v2 (doctor), --to and --write (migrate), --version (-v), --help (-h). Run commands from the consumer with the local package installed. Errors print their code and, when known, the file, route, option and a fix.

If you commit the generated file, run check before the build. The integrations regenerate at build time, so a check run after that build cannot detect a previously stale committed file. Generation is deterministic, atomic and timestamp-free. Existing files without the generator signature are never overwritten.

migrate --to 2 prepares a 1.x project for 2.0: it pins hrefs: "string" and, when the framework's routes differ from the file scan, discovery: "files" in the named-routes config (creating named-routes.config.mjs when there is none), so the generated module stays the same until you remove the pins. It is a dry run unless you pass --write, and it never edits framework configs or application code. doctor --v2 lists the rest (Node.js, TypeScript, moduleResolution, error codes).

Use npx @triooo/named-routes generate for a standalone invocation or npm exec -- named-routes generate with the package installed. The unscoped named-routes package is unrelated. --base-path /docs overrides the router base for this invocation; --base-path / clears it.

**Base override.** --base-path <path> is supported by generation/check/watch and doctor. It overrides cached framework base and the shared default for that invocation; / clears the base. Framework integration snapshots are generated metadata, not source files.

For a locally installed package, use pnpm exec named-routes list (pnpm) or npm exec --package=@triooo/named-routes -- named-routes list (npm). If Windows reports MODULE_NOT_FOUND before the CLI starts, inspect the generated command shim and reinstall with the original package manager. A shim pointing outside node_modules cannot be repaired by CLI code that never runs. The package bin metadata points to bin/named-routes.js; the launcher loads dist/cli.js relative to itself, preserving the project working directory.

```sh
npx @triooo/named-routes --help
```

Related topic IDs: cli-init, cli-generate, cli-list, cli-check, cli-watch, doctor, audit, cli-migrate
