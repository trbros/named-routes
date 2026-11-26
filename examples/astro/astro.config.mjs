import namedRoutes from "@triooo/named-routes/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
	// Inherits Astro base after all integrations resolve their config.
	integrations: [namedRoutes()],
});
