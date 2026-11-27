# Typed assets

Topic: `typed-assets` · Named Routes v2.2.0

Enable `assets` in named-routes.config. The generator scans public/ (static/ in SvelteKit), ignores hidden files and symlinks, supports *, ** and ? exclude globs, and writes an encoded relative path manifest with SHA-256 hashes. Set strict: true for literal path checking on the generated asset export; route.asset() checks the manifest at runtime. Remote HTTP(S) URLs remain allowed. No files are uploaded. Change assets.directory for a custom public directory. Build/check regenerate the manifest; the CLI watch watches it recursively.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```
