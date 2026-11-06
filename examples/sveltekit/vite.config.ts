import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		namedRoutes({ output: "src/lib/routes.generated.ts" }),
		// SvelteKit 3 reads its configuration here (svelte.config.js is no longer used).
		sveltekit({ adapter: adapter({ fallback: "index.html" }) }),
	],
});
