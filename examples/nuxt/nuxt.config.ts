import { namedRoutes } from "@triooo/named-routes/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	// Generates app/routes.generated.ts and keeps it current in `nuxt dev`.
	vite: { plugins: [namedRoutes({ output: "app/routes.generated.ts" })] },
});
