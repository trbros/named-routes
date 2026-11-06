import { namedRoutes } from "@triooo/named-routes/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	vite: { plugins: [namedRoutes()] },
});
