import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [namedRoutes(), tanstackRouter({ target: "react" }), react()],
});
