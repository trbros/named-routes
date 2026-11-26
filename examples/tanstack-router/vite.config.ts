import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
		}),
		namedRoutes(),
		react(),
	],

	server: {
		watch: {
			// Ignore temporary files created by TanStack's generator.
			ignored: ["**/.tanstack/**"],
		},
	},
});