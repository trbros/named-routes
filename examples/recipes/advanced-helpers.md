# Advanced URL helpers

The eight generated framework examples opt into `assets: { enabled: true, strict: true }`. Their existing public SVG keeps its filename and original contents; the browser probe also exposes a cache-busting URL. The React manual-manifest example continues to work without discovery. See `url-helpers.ts.example` for a manual configuration.

## Configuration (all generated frameworks)

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", origin: "https://example.com", assetBase: "https://cdn.example.com/public" },
});
```

The asset directory defaults to `public`, except SvelteKit (`static`). Override with `assets.directory` if necessary. Keep it limited to files intended to be public. Do not include `.env`, credentials, source or private storage.

```ts
import { route, asset } from "./routes.generated";
asset("images/logo.svg", { version: true }); // assuming public/images/logo.svg exists
asset.has("images/logo.svg");
asset.paths();
asset.info("images/logo.svg");
```

## SEO: Next.js metadata

```ts
export function generateMetadata() {
  return { alternates: { canonical: route.canonical("about", {}, { locale: "pt" }), languages: route.alternates("about") } };
}
```

Supply dynamic parameters, configure the origin/domain, and use the actual routes of your project. For Nuxt use the resulting URLs with `useHead`; for Astro use link elements in the head; for SvelteKit use `<svelte:head>`. Named Routes does not infer canonical content, translate dynamic values, or enumerate records for sitemaps.

## Typed query updates

Configure runtime Standard Schema validators as described in `/docs/typed-query`. Then:

```ts
const href = route.withQuery("/products?page=1&category=books", { page: 2 }, { name: "products" });
```

The named overload checks the patch's schema input type. The final merged query is validated if the runtime schema is present. Type-only schemas are not runtime validation. Pass `basePath: true` when explicitly matching a public prefixed URL.

## CI

```sh
npx @triooo/named-routes generate
npx @triooo/named-routes check
npx @triooo/named-routes audit --json --strict
```

Review lexical audit diagnostics; it is not a full compiler or HTTP crawler and cannot prove that every dynamic URL exists in production.
