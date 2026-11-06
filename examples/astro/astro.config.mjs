import { defineConfig } from "astro/config";
import { namedRoutes } from "@triooo/next-named-routes/vite";

export default defineConfig({
  vite: { plugins: [namedRoutes()] },
});
