import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});
