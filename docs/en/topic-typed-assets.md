# Typed assets

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-typed-assets.md) · [Português](../pt/topic-typed-assets.md) · [Español](../es/topic-typed-assets.md) · [日本語](../ja/topic-typed-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typed-assets"></a>

Enable `assets` in named-routes.config. The generator scans public/ (static/ in SvelteKit), ignores hidden files and symlinks, supports *, ** and ? exclude globs, and writes an encoded relative path manifest with SHA-256 hashes. Set strict: true for literal path checking on the generated asset export; route.asset() checks the manifest at runtime. Remote HTTP(S) URLs remain allowed. No files are uploaded. Change assets.directory for a custom public directory. Build/check regenerate the manifest; the CLI watch watches it recursively.

## Example

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```

---

← Previous: [Absolute asset URLs](topic-asset-absolute.md) · [All topics](public-assets.md) · Next: [asset.has() / paths() / info()](topic-asset-metadata.md) →
