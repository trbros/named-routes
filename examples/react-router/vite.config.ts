import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});
