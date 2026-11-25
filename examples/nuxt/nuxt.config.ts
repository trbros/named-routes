export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	// Names the routes Nuxt resolves (including definePageMeta path/alias)
	// and keeps app/routes.generated.ts current in `nuxt dev`. Options live in
	// named-routes.config.json, shared with the named-routes CLI.
	modules: ["@triooo/named-routes/nuxt"],
});
